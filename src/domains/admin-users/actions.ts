'use server'

import { z } from 'zod'
import crypto from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { hashPassword, validatePassword } from '@/lib/auth/password'
import {
  encryptSecret,
  generateMfaSecret,
  verifyTotp,
  generateQrCodeUri,
  requiresMfa,
} from '@/lib/auth/mfa'
import { getAdminUserByInviteToken, getAdminUserById } from './queries'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import type { Role } from '@/types'

const inviteAdminSchema = z.object({
  email: z.string().email(),
  role: z.enum(['super_admin', 'admin', 'volunteer_lead', 'checkin']),
})

export async function inviteAdmin(formData: FormData) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'super_admin') {
    return { error: 'Unauthorized' }
  }

  const parsed = inviteAdminSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: 'Invalid data', details: parsed.error.flatten() }
  }

  const { email, role } = parsed.data
  const inviteToken = crypto.randomBytes(32).toString('hex')
  const inviteExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const supabase = createAdminClient()
  const { error } = await supabase.from('admin_users').insert({
    email: email.toLowerCase(),
    role,
    invite_token: inviteToken,
    invite_expires_at: inviteExpiresAt.toISOString(),
  })

  if (error) {
    if (error.code === '23505') {
      return { error: 'An admin with this email already exists' }
    }
    return { error: error.message }
  }

  revalidatePath('/admin/users')
  return { success: true, inviteToken }
}

const setupAccountSchema = z.object({
  token: z.string().min(1),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(12),
})

export async function setupAccount(formData: FormData) {
  const parsed = setupAccountSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: 'Invalid data', details: parsed.error.flatten() }
  }

  const { token, name, password } = parsed.data

  const passwordValidation = validatePassword(password)
  if (!passwordValidation.valid) {
    return { error: 'Password too weak', details: passwordValidation.errors }
  }

  const user = await getAdminUserByInviteToken(token)
  if (!user) {
    return { error: 'Invalid or expired invitation' }
  }

  const passwordHash = await hashPassword(password)

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('admin_users')
    .update({
      name,
      password_hash: passwordHash,
      invite_token: null,
      invite_expires_at: null,
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  const needsMfa = requiresMfa(user.role as Role)

  return {
    success: true,
    userId: user.id,
    email: user.email,
    needsMfa,
    redirectTo: needsMfa ? '/admin/setup-mfa' : '/admin',
  }
}

export async function generateMfaSetup(userId: string) {
  const user = await getAdminUserById(userId)

  if (!user) {
    return { error: 'User not found' }
  }

  if (user.mfa_enabled) {
    return { error: 'MFA is already enabled' }
  }

  if (!requiresMfa(user.role as Role)) {
    return { error: 'MFA is not required for this role' }
  }

  const secret = generateMfaSecret()
  const qrCodeUri = generateQrCodeUri(user.email, secret)

  return {
    success: true,
    secret,
    qrCodeUri,
    email: user.email,
  }
}

const verifyMfaSetupSchema = z.object({
  userId: z.string().uuid(),
  secret: z.string().min(16),
  token: z.string().length(6),
})

export async function verifyMfaSetup(formData: FormData) {
  const parsed = verifyMfaSetupSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: 'Invalid data' }
  }

  const { userId, secret, token } = parsed.data

  const isValid = await verifyTotp(secret, token)
  if (!isValid) {
    return { error: 'Invalid verification code. Please try again.' }
  }

  const encryptedSecret = encryptSecret(secret)

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('admin_users')
    .update({
      mfa_secret: encryptedSecret,
      mfa_enabled: true,
    })
    .eq('id', userId)

  if (error) {
    return { error: error.message }
  }

  return { success: true, redirectTo: '/admin' }
}

export async function updateLastLogin(userId: string) {
  const supabase = createAdminClient()
  await supabase
    .from('admin_users')
    .update({ last_login_at: new Date().toISOString() })
    .eq('id', userId)
}
