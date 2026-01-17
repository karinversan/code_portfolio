import type { Metadata } from 'next'

import { Blueprint } from '@/components/Blueprint'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { Divider } from '@/components/ui/Divider'
import { Card } from '@/components/ui/Card'
import { getDictionary, localizePath } from '@/lib/i18n'
import { getLocale } from '@/lib/i18n.server'
import { absoluteUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale()
  const dict = getDictionary(locale)
  return {
    title: dict.privacy.metadata.title,
    description: dict.privacy.metadata.description,
    alternates: {
      canonical: absoluteUrl(localizePath('/privacy', locale)),
      languages: {
        en: absoluteUrl(localizePath('/privacy', 'en')),
        ru: absoluteUrl(localizePath('/privacy', 'ru')),
      },
    },
  }
}

export default function PrivacyPage() {
  const locale = getLocale()
  const dict = getDictionary(locale)
  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <div className="space-y-3">
          <PixelLabel>{dict.privacy.sectionLabel}</PixelLabel>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{dict.privacy.title}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
            {dict.privacy.intro}
          </p>
        </div>

        <Divider />

        <Card className="p-6" hover={false}>
          <p className="text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
            {dict.privacy.body[0]}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
            {dict.privacy.body[1]}
          </p>
        </Card>
      </Container>
    </Blueprint>
  )
}
