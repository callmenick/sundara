import NextAuth from 'next-auth'
import { type NextRequest, NextResponse } from 'next/server'
import { authConfig } from '@/auth.config'
import { updateSession } from '@/lib/supabase/middleware'

const { auth } = NextAuth(authConfig)

const publicAdminRoutes = ['/admin/login', '/admin/setup-account']

const mfaPendingRoutes = ['/admin/verify-mfa', '/admin/setup-mfa']

const roleRoutes: Record<string, string[]> = {
  checkin: ['/admin/checkin'],
  volunteer_lead: ['/admin/volunteers', '/admin/checkin'],
  admin: [
    '/admin',
    '/admin/content',
    '/admin/lineup',
    '/admin/workshops',
    '/admin/vendors',
    '/admin/volunteers',
    '/admin/sales',
    '/admin/orders',
    '/admin/checkin',
    '/admin/users',
  ],
  super_admin: ['/admin'],
}

export default auth(async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) {
    return await updateSession(request)
  }

  if (publicAdminRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const session = request.auth

  if (!session?.user) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const { role, mfaEnabled, mfaVerified } = session.user

  if (mfaPendingRoutes.some((route) => pathname.startsWith(route))) {
    if (!mfaVerified && mfaEnabled) {
      return NextResponse.next()
    }
    if (mfaVerified) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  if (mfaEnabled && !mfaVerified) {
    return NextResponse.redirect(new URL('/admin/verify-mfa', request.url))
  }

  if (role === 'super_admin') {
    return NextResponse.next()
  }

  const allowedRoutes = roleRoutes[role] || []
  const hasAccess = allowedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!hasAccess) {
    const defaultRoute = allowedRoutes[0] || '/admin/login'
    return NextResponse.redirect(new URL(defaultRoute, request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
