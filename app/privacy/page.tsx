import type { Metadata } from 'next'

import { Blueprint } from '@/components/Blueprint'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { Divider } from '@/components/ui/Divider'
import { Card } from '@/components/ui/Card'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy policy placeholder for this portfolio site.',
  alternates: { canonical: `${site.url}/privacy` },
}

export default function PrivacyPage() {
  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <div className="space-y-3">
          <PixelLabel>SECTION — PRIVACY</PixelLabel>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Privacy</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
            This is a simple placeholder. Customize it based on your analytics and cookie usage.
          </p>
        </div>

        <Divider />

        <Card className="p-6" hover={false}>
          <p className="text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
            By default, this site does not use cookies. If you enable optional analytics (Vercel Analytics / Speed Insights),
            data collection follows Vercel’s policies and is limited to aggregated performance metrics.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
            If you add third-party scripts, update this page with the exact services used and how visitors can opt out.
          </p>
        </Card>
      </Container>
    </Blueprint>
  )
}
