import { site } from '@/lib/site'
import type { Locale } from '@/lib/i18n'

export function cn(...values: Array<string | undefined | null | false>) {
  return values.filter(Boolean).join(' ')
}

export function formatDate(iso: string, locale: Locale = 'en') {
  const date = new Date(iso)
  const language = locale === 'ru' ? 'ru-RU' : 'en-US'
  return date.toLocaleDateString(language, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

export function formatReadingTime(minutes: number, locale: Locale = 'en') {
  const rounded = Math.max(1, Math.round(minutes))
  if (locale === 'ru') {
    return `${rounded} мин чтения`
  }
  return `${rounded} min read`
}

export function absoluteUrl(pathname: string) {
  const base = site.url.replace(/\/$/, '')
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${path}`
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
