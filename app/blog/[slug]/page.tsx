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
import { formatDate } from '@/lib/utils'
import { site } from '@/lib/site'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const title = post.frontmatter.title
  const description = post.frontmatter.summary
  const url = `${site.url}/blog/${post.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: post.frontmatter.date,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Blog post')}`,
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
      images: [`/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Blog post')}`],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const { frontmatter, content, slug } = post
  const toc = extractToc(content)
  const { content: mdx } = await compileMdx(content, mdxComponents)
  const rt = readingTime(content).text

  const all = getAllPosts()
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
      '@id': `${site.url}/blog/${slug}`,
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
            items={[
              { href: '/', label: 'Home' },
              { href: '/blog', label: 'Blog' },
              { href: `/blog/${slug}`, label: frontmatter.title },
            ]}
          />

          <div className="space-y-3">
            <PixelLabel>ARTICLE</PixelLabel>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{frontmatter.title}</h1>
            <p className="max-w-3xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">{frontmatter.summary}</p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[rgba(11,15,20,0.55)]">
              <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
              <span aria-hidden>·</span>
              <span>{rt}</span>
              <span aria-hidden>·</span>
              <Link href="/blog" className="text-ink hover:underline">All posts</Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((t) => (
                <Chip key={t} tone="ink" className="bg-ink/5">{t}</Chip>
              ))}
            </div>
          </div>

          <MobileToc items={toc} />
        </div>

        <Divider />

        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:items-start">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
            </div>
          </aside>

          <article className="min-w-0">
            <div className="prose prose-zinc max-w-none prose-headings:tracking-tight prose-a:text-ink prose-a:no-underline hover:prose-a:underline">
              {mdx}
            </div>

            <Divider />

            <nav className="grid gap-4 sm:grid-cols-2" aria-label="Post navigation">
              <div className="rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white p-5">
                <PixelLabel className="text-[rgba(11,15,20,0.55)]">PREVIOUS</PixelLabel>
                {prev ? (
                  <Link href={`/blog/${prev.slug}`} className="mt-2 block text-sm font-semibold tracking-tight text-text hover:underline">
                    {prev.title}
                  </Link>
                ) : (
                  <p className="mt-2 text-sm text-[rgba(11,15,20,0.60)]">No previous post</p>
                )}
              </div>
              <div className="rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white p-5">
                <PixelLabel className="text-[rgba(11,15,20,0.55)]">NEXT</PixelLabel>
                {next ? (
                  <Link href={`/blog/${next.slug}`} className="mt-2 block text-sm font-semibold tracking-tight text-text hover:underline">
                    {next.title}
                  </Link>
                ) : (
                  <p className="mt-2 text-sm text-[rgba(11,15,20,0.60)]">No next post</p>
                )}
              </div>
            </nav>

            {related.length ? (
              <>
                <Divider />
                <section aria-labelledby="related-posts" className="space-y-5">
                  <div className="space-y-2">
                    <PixelLabel>RELATED</PixelLabel>
                    <h2 id="related-posts" className="text-xl font-semibold tracking-tight">Related posts</h2>
                  </div>
                  <div className="grid gap-4">
                    {related.map((p) => (
                      <PostCard key={p.slug} post={p} />
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
