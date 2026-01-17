import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLocaleFromPathname, stripLocaleFromPathname } from '@/lib/i18n'

const LOCALE_COOKIE = 'NEXT_LOCALE'

export function middleware(request: NextRequest) {
  const locale = getLocaleFromPathname(request.nextUrl.pathname)
  if (!locale) return NextResponse.next()

  const strippedPath = stripLocaleFromPathname(request.nextUrl.pathname)
  const url = request.nextUrl.clone()
  url.pathname = strippedPath

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)
  const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
  return response
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|robots.txt|sitemap.xml|sitemap-0.xml|rss.xml).*)'],
}
