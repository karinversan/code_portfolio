'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { defaultLocale, getLocaleFromPathname, localizePath, locales, normalizeLocale, stripLocaleFromPathname } from '@/lib/i18n'

const LOCALE_COOKIE = 'NEXT_LOCALE'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [cookieLocale, setCookieLocale] = useState<string | null>(null)

  useEffect(() => {
    const value = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${LOCALE_COOKIE}=`))
      ?.split('=')[1]
    setCookieLocale(value ?? null)
  }, [])

  const currentLocale =
    getLocaleFromPathname(pathname) ?? normalizeLocale(cookieLocale) ?? defaultLocale
  const basePath = stripLocaleFromPathname(pathname)
  const query = searchParams.toString()

  const links = useMemo(
    () =>
      locales.map((locale) => {
        const nextPath = localizePath(basePath, locale)
        const href = query ? `${nextPath}?${query}` : nextPath
        return { locale, href }
      }),
    [basePath, query],
  )

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Language switcher">
      {links.map(({ locale, href }) => {
        const isActive = locale === currentLocale
        return (
          <Link
            key={locale}
            href={href}
            onClick={(event) => {
              event.preventDefault()
              document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`
              window.location.href = href
            }}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
              isActive
                ? 'border-ink/40 bg-ink/10 text-ink'
                : 'border-[rgba(11,15,20,0.12)] text-[rgba(11,15,20,0.65)] hover:border-ink/40 hover:text-text'
            }`}
            aria-label={locale === 'ru' ? 'Switch language to Russian' : 'Switch language to English'}
          >
            {locale}
          </Link>
        )
      })}
    </div>
  )
}
