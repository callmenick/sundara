import type { NextAuthConfig } from 'next-auth'
import type { Role } from '@/types'

export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      const isPublicAdminRoute =
        nextUrl.pathname.startsWith('/admin/login') ||
        nextUrl.pathname.startsWith('/admin/setup-account')

      if (isOnAdmin && !isPublicAdminRoute && !isLoggedIn) {
        return false
      }

      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
