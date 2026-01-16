import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Blueprint } from '@/components/Blueprint'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Divider } from '@/components/ui/Divider'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { Chip } from '@/components/ui/Chip'
import { Card } from '@/components/ui/Card'
import { TableOfContents } from '@/components/TableOfContents'
import { ProjectCard } from '@/components/ProjectCard'
import { mdxComponents } from '@/components/mdx/MdxComponents'
import { compileMdx, extractToc } from '@/lib/mdx'
import { getAllProjects, getProjectBySlug, getProjectSlugs } from '@/lib/content'
import { site } from '@/lib/site'

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}

  const title = project.frontmatter.title
  const description = project.frontmatter.summary
  const url = `${site.url}/projects/${project.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Project case study')}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Project case study')}`],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const { frontmatter, content, slug } = project
  const toc = extractToc(content)
  const { content: mdx } = await compileMdx(content, mdxComponents)

  const more = getAllProjects().filter((p) => p.slug !== slug).slice(0, 2)

  const links = frontmatter.links || {}

  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <div className="space-y-4">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Home' },
              { href: '/projects', label: 'Projects' },
              { href: `/projects/${slug}`, label: frontmatter.title },
            ]}
          />

          <div className="space-y-2">
            <PixelLabel>CASE STUDY</PixelLabel>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{frontmatter.title}</h1>
            <p className="max-w-3xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">{frontmatter.summary}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="ink" className="bg-ink/10">{frontmatter.year}</Chip>
            <Chip>{frontmatter.role}</Chip>
            {frontmatter.tags.map((t) => (
              <Chip key={t} tone="neutral">{t}</Chip>
            ))}
          </div>

          {frontmatter.metrics?.length ? (
            <Card className="p-5" hover={false}>
              <div className="flex items-center justify-between gap-4">
                <PixelLabel>KEY METRICS</PixelLabel>
                <span className="h-px flex-1 bg-[rgba(11,15,20,0.08)]" aria-hidden />
              </div>
              <ul className="mt-4 grid gap-2 text-sm">
                {frontmatter.metrics.map((m) => (
                  <li key={m} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden />
                    <span className="text-[rgba(11,15,20,0.80)]">{m}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {frontmatter.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              {(links.github || links.demo || links.article) ? (
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  {links.github ? (
                    <Link className="text-ink hover:underline" href={links.github} target="_blank" rel="noreferrer">
                      GitHub
                    </Link>
                  ) : null}
                  {links.demo ? (
                    <Link className="text-ink hover:underline" href={links.demo} target="_blank" rel="noreferrer">
                      Demo
                    </Link>
                  ) : null}
                  {links.article ? (
                    <Link className="text-ink hover:underline" href={links.article} target="_blank" rel="noreferrer">
                      Write-up
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </Card>
          ) : null}
        </div>

        <Divider />

        <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
          <article className="prose prose-zinc max-w-none prose-headings:tracking-tight prose-a:text-ink prose-a:no-underline hover:prose-a:underline">
            {mdx}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
              <div className="mt-6 rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white p-4">
                <PixelLabel className="text-[rgba(11,15,20,0.55)]">MORE LINKS</PixelLabel>
                <div className="mt-3 space-y-2 text-sm">
                  <Link className="block text-ink hover:underline" href={`${site.url}/projects/${slug}`}>Canonical</Link>
                  <Link className="block text-ink hover:underline" href="/projects">All projects</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {more.length ? (
          <>
            <Divider />
            <section aria-labelledby="more-projects" className="space-y-5">
              <div className="space-y-2">
                <PixelLabel>SECTION</PixelLabel>
                <h2 id="more-projects" className="text-xl font-semibold tracking-tight">More projects</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {more.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </section>
          </>
        ) : null}
      </Container>
    </Blueprint>
  )
}
