import type { Metadata, Viewport } from 'next'
import { Inter, Press_Start_2P } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SkipLink } from '@/components/ui/SkipLink'
import { site } from '@/lib/site'
import { getDictionary, getLocaleConfig, localizePath } from '@/lib/i18n'
import { getLocale } from '@/lib/i18n.server'
import { absoluteUrl } from '@/lib/utils'
import { AnalyticsProvider } from '@/components/Analytics'
import { JsonLd } from '@/components/JsonLd'
import './globals.css'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fontPixel = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#F7F8FA',
  colorScheme: 'light',
}

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale()
  const dict = getDictionary(locale)
  const localeConfig = getLocaleConfig(locale)

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${dict.site.title}`,
      template: `%s — ${site.name}`,
    },
    description: dict.site.description,
    alternates: {
      canonical: absoluteUrl(localizePath('/', locale)),
      languages: {
        en: absoluteUrl(localizePath('/', 'en')),
        ru: absoluteUrl(localizePath('/', 'ru')),
      },
    },
    openGraph: {
      type: 'website',
      title: `${site.name} — ${dict.site.title}`,
      description: dict.site.description,
      url: absoluteUrl(localizePath('/', locale)),
      siteName: `${site.name}`,
      locale: localeConfig.openGraphLocale,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(`${site.name}`)}&subtitle=${encodeURIComponent(dict.site.title)}&lang=${locale}`,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${dict.site.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — ${dict.site.title}`,
      description: dict.site.description,
      images: [
        `/api/og?title=${encodeURIComponent(`${site.name}`)}&subtitle=${encodeURIComponent(dict.site.title)}&lang=${locale}`,
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale()
  const dict = getDictionary(locale)
  const localeConfig = getLocaleConfig(locale)
  const localizedRoot = absoluteUrl(localizePath('/', locale))

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: dict.site.title,
    url: site.url,
    description: dict.site.description,
    sameAs: [site.links.github, site.links.linkedin, site.links.twitter].filter(Boolean),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${site.name} — ${dict.site.title}`,
    url: localizedRoot,
    description: dict.site.description,
    inLanguage: localeConfig.languageTag,
  }

  return (
    <html lang={localeConfig.languageTag} className={`${fontSans.variable} ${fontPixel.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        <SkipLink label={dict.skipLink} />
        <Header dict={dict} locale={locale} />
        <main id="main" className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <Footer dict={dict} locale={locale} />
        <AnalyticsProvider />
        <JsonLd data={person} />
        <JsonLd data={website} />
      </body>
    </html>
  )
}
