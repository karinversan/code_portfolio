import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import readingTime from 'reading-time'

import { Blueprint } from '@/components/Blueprint'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Divider } from '@/components/ui/Divider'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { Chip } from '@/components/ui/Chip'
import { TableOfContents } from '@/components/TableOfContents'
import { ReadingProgressBar } from '@/components/ReadingProgressBar'
import { MobileToc } from '@/components/MobileToc'
import { PostCard } from '@/components/PostCard'
import { JsonLd } from '@/components/JsonLd'
import { mdxComponents } from '@/components/mdx/MdxComponents'
import { compileMdx, extractToc } from '@/lib/mdx'
import { getAllPosts, getPostBySlug, getPostSlugs } from '@/lib/content'
import { absoluteUrl, formatDate, formatReadingTime } from '@/lib/utils'
import { site } from '@/lib/site'
import { getDictionary, localizePath } from '@/lib/i18n'
import { getLocale } from '@/lib/i18n.server'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return getPostSlugs({ locale: 'en' }).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const locale = getLocale()
  const post = getPostBySlug(params.slug, { locale })
  if (!post) return {}

  const dict = getDictionary(locale)
  const title = post.frontmatter.title
  const description = post.frontmatter.summary
  const basePath = `/blog/${post.slug}`
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
      publishedTime: post.frontmatter.date,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(dict.blogPost.ogSubtitle)}&lang=${locale}`,
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
        `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(dict.blogPost.ogSubtitle)}&lang=${locale}`,
      ],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const locale = getLocale()
  const post = getPostBySlug(params.slug, { locale })
  if (!post) notFound()

  const dict = getDictionary(locale)
  const { frontmatter, content, slug } = post
  const toc = extractToc(content)
  const { content: mdx } = await compileMdx(content, mdxComponents(dict))
  const rt = formatReadingTime(readingTime(content).minutes, locale)

  const all = getAllPosts({ locale })
  const idx = all.findIndex((p) => p.slug === slug)
  const prev = idx >= 0 ? all[idx + 1] : null
  const next = idx >= 0 ? all[idx - 1] : null

  const related = all
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => frontmatter.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.post)

  const canonicalUrl = absoluteUrl(localizePath(`/blog/${slug}`, locale))
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.summary,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      '@type': 'Person',
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: frontmatter.tags,
  }

  return (
    <Blueprint className="pb-14">
      <ReadingProgressBar />
      <JsonLd data={jsonLd} />

      <Container className="pt-10">
        <div className="space-y-4">
          <Breadcrumbs
            ariaLabel={dict.breadcrumbs.ariaLabel}
            items={[
              { href: localizePath('/', locale), label: dict.breadcrumbs.home },
              { href: localizePath('/blog', locale), label: dict.breadcrumbs.blog },
              { href: localizePath(`/blog/${slug}`, locale), label: frontmatter.title },
            ]}
          />

          <div className="space-y-3">
            <PixelLabel>{dict.blogPost.articleLabel}</PixelLabel>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{frontmatter.title}</h1>
            <p className="max-w-3xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">{frontmatter.summary}</p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[rgba(11,15,20,0.55)]">
              <time dateTime={frontmatter.date}>{formatDate(frontmatter.date, locale)}</time>
              <span aria-hidden>·</span>
              <span>{rt}</span>
              <span aria-hidden>·</span>
              <Link href={localizePath('/blog', locale)} className="text-ink hover:underline">{dict.blogPost.allPosts}</Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((t) => (
                <Chip key={t} tone="ink" className="bg-ink/5">{t}</Chip>
              ))}
            </div>
          </div>

          <MobileToc items={toc} dict={dict} />
        </div>

        <Divider />

        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:items-start">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} dict={dict} />
            </div>
          </aside>

          <article className="min-w-0">
            <div className="prose prose-zinc max-w-none prose-headings:tracking-tight prose-a:text-ink prose-a:no-underline hover:prose-a:underline">
              {mdx}
            </div>

            <Divider />

            <nav className="grid gap-4 sm:grid-cols-2" aria-label={dict.blogPost.postNavigation}>
              <div className="rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white p-5">
                <PixelLabel className="text-[rgba(11,15,20,0.55)]">{dict.blogPost.previousLabel}</PixelLabel>
                {prev ? (
                  <Link href={localizePath(`/blog/${prev.slug}`, locale)} className="mt-2 block text-sm font-semibold tracking-tight text-text hover:underline">
                    {prev.title}
                  </Link>
                ) : (
                  <p className="mt-2 text-sm text-[rgba(11,15,20,0.60)]">{dict.blogPost.noPrevious}</p>
                )}
              </div>
              <div className="rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white p-5">
                <PixelLabel className="text-[rgba(11,15,20,0.55)]">{dict.blogPost.nextLabel}</PixelLabel>
                {next ? (
                  <Link href={localizePath(`/blog/${next.slug}`, locale)} className="mt-2 block text-sm font-semibold tracking-tight text-text hover:underline">
                    {next.title}
                  </Link>
                ) : (
                  <p className="mt-2 text-sm text-[rgba(11,15,20,0.60)]">{dict.blogPost.noNext}</p>
                )}
              </div>
            </nav>

            {related.length ? (
              <>
                <Divider />
                <section aria-labelledby="related-posts" className="space-y-5">
                  <div className="space-y-2">
                    <PixelLabel>{dict.blogPost.relatedLabel}</PixelLabel>
                    <h2 id="related-posts" className="text-xl font-semibold tracking-tight">{dict.blogPost.relatedTitle}</h2>
                  </div>
                  <div className="grid gap-4">
                    {related.map((p) => (
                      <PostCard key={p.slug} post={p} locale={locale} />
                    ))}
                  </div>
                </section>
              </>
            ) : null}
          </article>
        </div>
      </Container>
    </Blueprint>
  )
}
