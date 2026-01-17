import { cookies, headers } from 'next/headers'
import { defaultLocale, normalizeLocale } from '@/lib/i18n'

const LOCALE_COOKIE = 'NEXT_LOCALE'

export function getLocale() {
  const headerLocale = headers().get('x-locale')
  const cookieLocale = cookies().get(LOCALE_COOKIE)?.value
  return normalizeLocale(
    headerLocale ||
      cookieLocale ||
      process.env.NEXT_PUBLIC_LOCALE ||
      process.env.LOCALE ||
      process.env.DEFAULT_LOCALE ||
      defaultLocale,
  )
}
