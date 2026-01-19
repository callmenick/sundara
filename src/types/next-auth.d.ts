import type { Role } from '@/types'
import type { DefaultSession, Session } from 'next-auth'
import type { NextRequest } from 'next/server'

declare module 'next/server' {
  interface NextRequest {
    auth: Session | null
  }
}

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string | null
    role: Role
    mfaEnabled: boolean
    mfaVerified: boolean
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string | null
      role: Role
      mfaEnabled: boolean
      mfaVerified: boolean
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string | null
    role: Role
    mfaEnabled: boolean
    mfaVerified: boolean
  }
}
