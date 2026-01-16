import type { Metadata } from 'next'

import { Blueprint } from '@/components/Blueprint'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { Divider } from '@/components/ui/Divider'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, experience, and how I approach machine learning engineering.',
  alternates: { canonical: `${site.url}/about` },
}

const timeline = [
  {
    period: '2025 — Present',
    title: 'Machine Learning Engineer',
    body: 'Focused on recommendation quality, evaluation systems, and production inference performance. Built tooling to reduce iteration time while improving reliability.',
    highlights: ['Offline/online parity', 'Latency + cost budgets', 'Monitoring + drift alerts'],
  },
  {
    period: '2023 — 2025',
    title: 'Applied Scientist / ML Engineer',
    body: 'Shipped NLP systems and retrieval pipelines. Partnered with product and data teams to turn research prototypes into stable services.',
    highlights: ['RAG + re-ranking', 'Human-in-the-loop labeling', 'Experiment design'],
  },
  {
    period: 'Earlier',
    title: 'Data + Systems foundation',
    body: 'Built data products and backend services. This is where my obsession with reliability and observability started.',
    highlights: ['Data contracts', 'CI/CD', 'Service ownership'],
  },
] as const

export default function AboutPage() {
  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <div className="space-y-3">
          <PixelLabel>SECTION 04 — ABOUT</PixelLabel>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">About</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
            I build ML systems with a strong product loop: define success, measure honestly, ship iteratively, and keep it healthy in production.
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
            <PixelLabel>SELECTED</PixelLabel>
            <h2 className="text-xl font-semibold tracking-tight">What I optimize for</h2>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Impact</p>
              <p className="mt-1 text-sm text-[rgba(11,15,20,0.70)]">Measurable improvements: quality, conversion, time saved, or risk reduced.</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Reliability</p>
              <p className="mt-1 text-sm text-[rgba(11,15,20,0.70)]">Monitoring, drift detection, and graceful degradation paths.</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Performance</p>
              <p className="mt-1 text-sm text-[rgba(11,15,20,0.70)]">Latency and cost budgets so the system scales with real traffic.</p>
            </div>
            <div>
              <p className="text-sm font-semibold">DX</p>
              <p className="mt-1 text-sm text-[rgba(11,15,20,0.70)]">Tooling that makes iteration faster without breaking reproducibility.</p>
            </div>
          </div>
          <p className="mt-5 text-xs text-[rgba(11,15,20,0.55)]">Update your profile details in <code className="font-mono">lib/site.ts</code>.</p>
        </Card>
      </Container>
    </Blueprint>
  )
}
