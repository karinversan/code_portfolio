import Link from 'next/link'

import { Blueprint } from '@/components/Blueprint'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function NotFound() {
  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <Card className="p-6" hover={false}>
          <div className="space-y-3">
            <PixelLabel>ERROR 404</PixelLabel>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Page not found</h1>
            <p className="max-w-xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
              The blueprint doesn’t include this page. Try the main sections below.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/">Home</ButtonLink>
              <ButtonLink href="/projects" variant="secondary">Projects</ButtonLink>
              <ButtonLink href="/blog" variant="secondary">Blog</ButtonLink>
            </div>
            <p className="text-xs text-[rgba(11,15,20,0.55)]">
              Or go back to <Link href="/" className="text-ink hover:underline">the overview</Link>.
            </p>
          </div>
        </Card>
      </Container>
    </Blueprint>
  )
}
