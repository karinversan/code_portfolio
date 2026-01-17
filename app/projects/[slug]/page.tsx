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
import { absoluteUrl } from '@/lib/utils'
import { getDictionary, localizePath } from '@/lib/i18n'
import { getLocale } from '@/lib/i18n.server'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return getProjectSlugs({ locale: 'en' }).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const locale = getLocale()
  const project = getProjectBySlug(params.slug, { locale })
  if (!project) return {}

  const dict = getDictionary(locale)
  const title = project.frontmatter.title
  const description = project.frontmatter.summary
  const basePath = `/projects/${project.slug}`
  const url = absoluteUrl(localizePath(basePath, locale))

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(localizePath(basePath, 'en')),
        ru: absoluteUrl(localizePath(basePath, 'ru')),
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(dict.projectDetail.ogSubtitle)}&lang=${locale}`,
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
      images: [
        `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(dict.projectDetail.ogSubtitle)}&lang=${locale}`,
      ],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const locale = getLocale()
  const project = getProjectBySlug(params.slug, { locale })
  if (!project) notFound()

  const dict = getDictionary(locale)
  const { frontmatter, content, slug } = project
  const toc = extractToc(content)
  const { content: mdx } = await compileMdx(content, mdxComponents(dict))

  const more = getAllProjects({ locale }).filter((p) => p.slug !== slug).slice(0, 2)

  const links = frontmatter.links || {}

  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <div className="space-y-4">
          <Breadcrumbs
            ariaLabel={dict.breadcrumbs.ariaLabel}
            items={[
              { href: localizePath('/', locale), label: dict.breadcrumbs.home },
              { href: localizePath('/projects', locale), label: dict.breadcrumbs.projects },
              { href: localizePath(`/projects/${slug}`, locale), label: frontmatter.title },
            ]}
          />

          <div className="space-y-2">
            <PixelLabel>{dict.projectDetail.caseStudyLabel}</PixelLabel>
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
                <PixelLabel>{dict.projectDetail.keyMetrics}</PixelLabel>
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
                      {dict.projectDetail.links.github}
                    </Link>
                  ) : null}
                  {links.demo ? (
                    <Link className="text-ink hover:underline" href={links.demo} target="_blank" rel="noreferrer">
                      {dict.projectDetail.links.demo}
                    </Link>
                  ) : null}
                  {links.article ? (
                    <Link className="text-ink hover:underline" href={links.article} target="_blank" rel="noreferrer">
                      {dict.projectDetail.links.writeUp}
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
              <TableOfContents items={toc} dict={dict} />
              <div className="mt-6 rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white p-4">
                <PixelLabel className="text-[rgba(11,15,20,0.55)]">{dict.projectDetail.moreLinks}</PixelLabel>
                <div className="mt-3 space-y-2 text-sm">
                  <Link className="block text-ink hover:underline" href={absoluteUrl(localizePath(`/projects/${slug}`, locale))}>{dict.projectDetail.canonical}</Link>
                  <Link className="block text-ink hover:underline" href={localizePath('/projects', locale)}>{dict.projectDetail.allProjects}</Link>
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
                <PixelLabel>{dict.projectDetail.sectionLabel}</PixelLabel>
                <h2 id="more-projects" className="text-xl font-semibold tracking-tight">{dict.projectDetail.moreProjects}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {more.map((p) => (
                  <ProjectCard key={p.slug} project={p} locale={locale} />
                ))}
              </div>
            </section>
          </>
        ) : null}
      </Container>
    </Blueprint>
  )
}
