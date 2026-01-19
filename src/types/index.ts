export type Role = 'super_admin' | 'admin' | 'volunteer_lead' | 'checkin'

export type EditionStatus = 'upcoming' | 'active' | 'completed'

export interface Edition {
  id: string
  year: number
  name: string
  startDate: Date | null
  endDate: Date | null
  location: string | null
  status: EditionStatus
  isCurrent: boolean
  createdAt: Date
}

export interface EditionRow {
  id: string
  year: number
  name: string
  start_date: string | null
  end_date: string | null
  location: string | null
  status: EditionStatus
  is_current: boolean
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string | null
  role: Role
  mfaEnabled: boolean
  createdAt: Date
  lastLoginAt: Date | null
}

export interface AdminUserRow {
  id: string
  email: string
  name: string | null
  password_hash: string | null
  role: Role
  mfa_secret: string | null
  mfa_enabled: boolean
  invite_token: string | null
  invite_expires_at: string | null
  created_at: string
  last_login_at: string | null
}
