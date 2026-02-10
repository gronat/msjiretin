import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // NextAuth v5 uses "authjs" cookie prefix instead of "next-auth"
  const hasSession =
    request.cookies.has('__Secure-authjs.session-token') ||
    request.cookies.has('authjs.session-token')

  if (!hasSession && request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

