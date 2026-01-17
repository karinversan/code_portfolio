import type { Metadata } from 'next'

import { Blueprint } from '@/components/Blueprint'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { Divider } from '@/components/ui/Divider'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { getDictionary, localizePath } from '@/lib/i18n'
import { getLocale } from '@/lib/i18n.server'
import { absoluteUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale()
  const dict = getDictionary(locale)
  return {
    title: dict.about.metadata.title,
    description: dict.about.metadata.description,
    alternates: {
      canonical: absoluteUrl(localizePath('/about', locale)),
      languages: {
        en: absoluteUrl(localizePath('/about', 'en')),
        ru: absoluteUrl(localizePath('/about', 'ru')),
      },
    },
  }
}

export default function AboutPage() {
  const locale = getLocale()
  const dict = getDictionary(locale)
  const timeline = dict.about.timeline
  const optimizations = dict.about.optimize

  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <div className="space-y-3">
          <PixelLabel>{dict.about.sectionLabel}</PixelLabel>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{dict.about.title}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
            {dict.about.intro}
          </p>
        </div>

        <Divider />

        <div className="grid gap-4">
          {timeline.map((t) => (
            <Card key={t.title} className="p-6" hover={false}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-sm font-semibold tracking-tight">{t.title}</p>
                <PixelLabel className="text-[rgba(11,15,20,0.55)]">{t.period}</PixelLabel>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">{t.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.highlights.map((h) => (
                  <Chip key={h} tone="neutral">{h}</Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Divider />

        <Card className="p-6" hover={false}>
          <div className="space-y-2">
            <PixelLabel>{dict.about.selectedLabel}</PixelLabel>
            <h2 className="text-xl font-semibold tracking-tight">{dict.about.optimizeTitle}</h2>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {optimizations.map((item) => (
              <div key={item.title}>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-[rgba(11,15,20,0.70)]">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-[rgba(11,15,20,0.55)]">
            {dict.about.updateHint} <code className="font-mono">lib/site.ts</code>.
          </p>
        </Card>
      </Container>
    </Blueprint>
  )
}
