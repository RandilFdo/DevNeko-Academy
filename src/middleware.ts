import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Routes that require authentication AND has_course_access = true
 */
const PROTECTED_ROUTES = [
  '/courses',
  '/dashboard',
  '/mentor',
  '/live',
  '/settings',
]

/**
 * Routes that are always public (no auth needed)
 */
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/auth',
  '/payment-pending',
  '/subscribe',
]

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route))
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'))
}

export async function middleware(request: NextRequest) {
  const { supabase, user, response } = await updateSession(request)
  const { pathname } = request.nextUrl

  // Always allow public routes through
  if (isPublicRoute(pathname)) {
    return response
  }

  // For API routes, let them handle their own auth
  if (pathname.startsWith('/api/')) {
    return response
  }

  // Protected routes: require authentication
  if (isProtectedRoute(pathname)) {
    // No session → send to login
    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Session exists → check access flag
    const { data: profile } = await supabase
      .from('profiles')
      .select('has_course_access')
      .eq('id', user.id)
      .single()

    // No profile found or access denied → payment pending
    if (!profile || !profile.has_course_access) {
      const pendingUrl = new URL('/payment-pending', request.url)
      return NextResponse.redirect(pendingUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
