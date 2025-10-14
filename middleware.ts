// middleware.ts (as earlier)
import { NextResponse, type NextRequest } from 'next/server'
const COOKIE_NAME = 'admin_access'

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  const isAccessPage = pathname.startsWith('/admin/access')
  if (isAccessPage) return NextResponse.next()

  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get(COOKIE_NAME)?.value
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/admin/access'
      url.search = `?next=${encodeURIComponent(pathname + (search || ''))}`
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
