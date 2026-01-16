import type { Metadata, Viewport } from 'next'
import { Inter, Press_Start_2P } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SkipLink } from '@/components/ui/SkipLink'
import { site } from '@/lib/site'
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: 'website',
    title: `${site.name} — ${site.title}`,
    description: site.description,
    url: site.url,
    siteName: `${site.name}`,
    locale: site.locale,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(`${site.name}`)}&subtitle=${encodeURIComponent(site.title)}`,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.title}`,
    description: site.description,
    images: [`/api/og?title=${encodeURIComponent(`${site.name}`)}&subtitle=${encodeURIComponent(site.title)}`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.title,
    url: site.url,
    description: site.description,
    sameAs: [site.links.github, site.links.linkedin, site.links.twitter].filter(Boolean),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${site.name} — ${site.title}`,
    url: site.url,
    description: site.description,
    inLanguage: 'en',
  }

  return (
    <html lang="en" className={`${fontSans.variable} ${fontPixel.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        <SkipLink />
        <Header />
        <main id="main" className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <Footer />
        <AnalyticsProvider />
        <JsonLd data={person} />
        <JsonLd data={website} />
      </body>
    </html>
  )
}
