import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { ROUTES } from './lib/routes'

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })
  console.log(token)
  const isLoggedIn = !!token
  const { pathname } = req.nextUrl

  if (
    isLoggedIn &&
    (pathname === '/' || pathname === '/sign-in' || pathname === '/sign-up')
  ) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url))
  }

  if (!isLoggedIn && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
