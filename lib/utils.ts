import { site } from '@/lib/site'

export function cn(...values: Array<string | undefined | null | false>) {
  return values.filter(Boolean).join(' ')
}

export function formatDate(iso: string) {
  const date = new Date(iso)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
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
