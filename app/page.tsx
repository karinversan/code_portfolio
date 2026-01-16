import Link from 'next/link'

import { Blueprint } from '@/components/Blueprint'
import { PostCard } from '@/components/PostCard'
import { ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/ui/Container'
import { Divider } from '@/components/ui/Divider'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { ButtonLink } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Card } from '@/components/ui/Card'
import { getAllPosts, getAllProjects } from '@/lib/content'
import { marketing, site } from '@/lib/site'

export default function HomePage() {
  const projects = getAllProjects()
  const featured = projects.filter((p) => p.featured).slice(0, 6)

  const posts = getAllPosts()
  const latestPosts = posts.slice(0, 5)

  const skills = {
    ML: ['PyTorch', 'Transformers', 'Evaluation', 'Experiment tracking'],
    MLOps: ['Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
    Data: ['SQL', 'Spark', 'Feature stores', 'Data quality'],
    Backend: ['TypeScript', 'Python', 'FastAPI', 'Postgres'],
  } as const

  const process = [
    {
      label: '01 — Brief',
      title: 'Define the success metric',
      body: 'Clarify constraints (latency, cost, risk) and create an evaluation plan that matches the real user journey.',
    },
    {
      label: '02 — Modeling',
      title: 'Build the simplest reliable baseline',
      body: 'Start with strong baselines and clean data contracts; iterate only where the metric is sensitive.',
    },
    {
      label: '03 — Iteration',
      title: 'Ship improvements with guardrails',
      body: 'A/B tests, offline/online parity checks, and monitoring to catch drift and regressions.',
    },
    {
      label: '04 — Delivery',
      title: 'Productionize and document',
      body: 'Make it maintainable: observability, runbooks, dashboards, and a clear ownership story.',
    },
  ]

  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <Reveal>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <PixelLabel>SECTION 01 — OVERVIEW</PixelLabel>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {site.name}
                  <span className="text-[rgba(11,15,20,0.55)]"> · </span>
                  <span className="text-ink">{site.title}</span>
                </h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={marketing.ctas.projects}>View Projects</ButtonLink>
                <ButtonLink href={marketing.ctas.blog} variant="secondary">
                  Read Blog
                </ButtonLink>
                <ButtonLink href={marketing.ctas.contact} variant="secondary">
                  Contact
                </ButtonLink>
                <ButtonLink href={marketing.ctas.cv} variant="secondary">
                  Download CV
                </ButtonLink>
              </div>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-[rgba(11,15,20,0.75)]">
              {marketing.heroLine}
            </p>

            <div className="flex flex-wrap gap-2">
              <Chip tone="ink" className="bg-ink/10">Production ML</Chip>
              <Chip>Offline + online evaluation</Chip>
              <Chip>Fast inference</Chip>
              <Chip>Observability</Chip>
            </div>
          </div>
        </Reveal>

        <Divider />

        <Reveal delay={0.05}>
          <section aria-labelledby="featured-projects" className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <PixelLabel>SECTION 02</PixelLabel>
                <h2 id="featured-projects" className="text-xl font-semibold tracking-tight">
                  Featured Projects
                </h2>
              </div>
              <Link href="/projects" className="text-sm text-ink hover:underline">
                View all
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {featured.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>

            {featured.length === 0 ? (
              <p className="text-sm text-[rgba(11,15,20,0.65)]">
                Add projects in <code className="font-mono">/content/projects</code>.
              </p>
            ) : null}
          </section>
        </Reveal>

        <Divider />

        <Reveal delay={0.08}>
          <section aria-labelledby="latest-articles" className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <PixelLabel>SECTION 03</PixelLabel>
                <h2 id="latest-articles" className="text-xl font-semibold tracking-tight">
                  Latest Articles
                </h2>
              </div>
              <Link href="/blog" className="text-sm text-ink hover:underline">
                View all
              </Link>
            </div>

            <div className="grid gap-4">
              {latestPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        </Reveal>

        <Divider />

        <Reveal delay={0.1}>
          <section aria-labelledby="skills" className="space-y-6">
            <div className="space-y-2">
              <PixelLabel>SECTION 04</PixelLabel>
              <h2 id="skills" className="text-xl font-semibold tracking-tight">
                Skills / Stack
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(skills).map(([group, items]) => (
                <Card key={group} className="p-5" hover={false}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold tracking-tight">{group}</p>
                    <PixelLabel className="text-[rgba(11,15,20,0.55)]">KIT</PixelLabel>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </Reveal>

        <Divider />

        <Reveal delay={0.12}>
          <section aria-labelledby="process" className="space-y-6">
            <div className="space-y-2">
              <PixelLabel>PROCESS</PixelLabel>
              <h2 id="process" className="text-xl font-semibold tracking-tight">
                How I work
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {process.map((step) => (
                <Card key={step.label} className="p-5" hover={false}>
                  <div className="flex items-center justify-between gap-4">
                    <PixelLabel>{step.label}</PixelLabel>
                    <span className="h-px flex-1 bg-[rgba(11,15,20,0.08)]" aria-hidden />
                  </div>
                  <p className="mt-3 text-sm font-semibold tracking-tight">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[rgba(11,15,20,0.70)]">{step.body}</p>
                </Card>
              ))}
            </div>
          </section>
        </Reveal>

        <Divider />

        <Reveal delay={0.14}>
          <section aria-labelledby="about" className="space-y-6">
            <div className="space-y-2">
              <PixelLabel>SECTION 06</PixelLabel>
              <h2 id="about" className="text-xl font-semibold tracking-tight">
                About
              </h2>
            </div>

            <Card className="p-6" hover={false}>
              <p className="max-w-3xl text-sm leading-relaxed text-[rgba(11,15,20,0.75)]">
                I focus on ML that holds up in production: strong baselines, clean evaluation, and a deployment story that
                survives real traffic. I like problems where the outcome is measurable — quality, latency, cost, and the
                human experience of the product.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/about" className="text-sm text-ink hover:underline">
                  More about me
                </Link>
                <span className="text-sm text-[rgba(11,15,20,0.35)]" aria-hidden>
                  ·
                </span>
                <Link href="/projects" className="text-sm text-ink hover:underline">
                  Case studies
                </Link>
              </div>
            </Card>
          </section>
        </Reveal>

        <Divider />

        <Reveal delay={0.16}>
          <section id="contact" aria-labelledby="contact-heading" className="space-y-6">
            <div className="space-y-2">
              <PixelLabel>SECTION 07</PixelLabel>
              <h2 id="contact-heading" className="text-xl font-semibold tracking-tight">
                Contact
              </h2>
            </div>

            <Card className="p-6" hover={false}>
              <p className="text-sm leading-relaxed text-[rgba(11,15,20,0.70)]">
                Want to collaborate, hire, or chat ML systems? Email is best.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <ButtonLink href={`mailto:${site.email}`}>
                  Email me
                </ButtonLink>
                <ButtonLink href={site.links.linkedin} variant="secondary">
                  LinkedIn
                </ButtonLink>
                <ButtonLink href={site.links.github} variant="secondary">
                  GitHub
                </ButtonLink>
              </div>
              <p className="mt-4 text-xs text-[rgba(11,15,20,0.55)]">
                Prefer a quick intro? Include context, constraints, and what success looks like.
              </p>
            </Card>
          </section>
        </Reveal>
      </Container>
    </Blueprint>
  )
}
