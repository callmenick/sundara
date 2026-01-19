import { createAdminClient } from '@/lib/supabase/admin'
import type { AdminUser, AdminUserRow } from './types'

function mapRowToAdminUser(row: AdminUserRow): AdminUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    mfaEnabled: row.mfa_enabled,
    createdAt: new Date(row.created_at),
    lastLoginAt: row.last_login_at ? new Date(row.last_login_at) : null,
  }
}

export async function getAdminUserByEmail(email: string): Promise<AdminUserRow | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single()

  if (error || !data) return null
  return data as AdminUserRow
}

export async function getAdminUserById(id: string): Promise<AdminUserRow | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase.from('admin_users').select('*').eq('id', id).single()

  if (error || !data) return null
  return data as AdminUserRow
}

export async function getAdminUserByInviteToken(token: string): Promise<AdminUserRow | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('invite_token', token)
    .gt('invite_expires_at', new Date().toISOString())
    .single()

  if (error || !data) return null
  return data as AdminUserRow
}

export async function getAllAdminUsers(): Promise<AdminUser[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, email, name, role, mfa_enabled, created_at, last_login_at')
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data as AdminUserRow[]).map(mapRowToAdminUser)
}
