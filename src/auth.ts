import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { getAdminUserByEmail, getAdminUserById } from '@/domains/admin-users/queries'
import { updateLastLogin } from '@/domains/admin-users/actions'
import { verifyPassword } from '@/lib/auth/password'
import { decryptSecret, verifyTotp, requiresMfa } from '@/lib/auth/mfa'
import type { Role } from '@/types'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const mfaSchema = z.object({
  userId: z.string().uuid(),
  token: z.string().length(6),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data
        const user = await getAdminUserByEmail(email)

        if (!user || !user.password_hash) return null

        const isValid = await verifyPassword(password, user.password_hash)
        if (!isValid) return null

        const role = user.role as Role
        const needsMfa = requiresMfa(role)

        if (!needsMfa) {
          await updateLastLogin(user.id)
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role,
          mfaEnabled: user.mfa_enabled,
          mfaVerified: !needsMfa || !user.mfa_enabled,
        }
      },
    }),
    Credentials({
      id: 'mfa',
      name: 'MFA Verification',
      credentials: {
        userId: { label: 'User ID', type: 'text' },
        token: { label: 'TOTP Code', type: 'text' },
      },
      async authorize(credentials) {
        const parsed = mfaSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { userId, token } = parsed.data
        const user = await getAdminUserById(userId)

        if (!user || !user.mfa_secret || !user.mfa_enabled) return null

        const secret = decryptSecret(user.mfa_secret)
        const isValid = await verifyTotp(secret, token)

        if (!isValid) return null

        await updateLastLogin(user.id)

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as Role,
          mfaEnabled: true,
          mfaVerified: true,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email as string
        token.name = user.name
        token.role = user.role
        token.mfaEnabled = user.mfaEnabled
        token.mfaVerified = user.mfaVerified
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.email = token.email as string
      session.user.name = token.name as string | null
      session.user.role = token.role as Role
      session.user.mfaEnabled = token.mfaEnabled as boolean
      session.user.mfaVerified = token.mfaVerified as boolean
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
})
