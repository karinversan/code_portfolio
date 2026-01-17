import Link from 'next/link'

import { Blueprint } from '@/components/Blueprint'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { getDictionary, localizePath } from '@/lib/i18n'
import { getLocale } from '@/lib/i18n.server'

export default function NotFound() {
  const locale = getLocale()
  const dict = getDictionary(locale)
  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <Card className="p-6" hover={false}>
          <div className="space-y-3">
            <PixelLabel>{dict.notFound.label}</PixelLabel>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{dict.notFound.title}</h1>
            <p className="max-w-xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
              {dict.notFound.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={localizePath('/', locale)}>{dict.buttons.home}</ButtonLink>
              <ButtonLink href={localizePath('/projects', locale)} variant="secondary">{dict.buttons.projects}</ButtonLink>
              <ButtonLink href={localizePath('/blog', locale)} variant="secondary">{dict.buttons.blog}</ButtonLink>
            </div>
            <p className="text-xs text-[rgba(11,15,20,0.55)]">
              {dict.notFound.backPrefix}{' '}
              <Link href={localizePath('/', locale)} className="text-ink hover:underline">{dict.notFound.backLink}</Link>.
            </p>
          </div>
        </Card>
      </Container>
    </Blueprint>
  )
}
