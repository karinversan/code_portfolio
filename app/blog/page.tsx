import type { Metadata } from 'next'
import Link from 'next/link'

import { Blueprint } from '@/components/Blueprint'
import { PostsExplorer } from '@/components/PostsExplorer'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { Divider } from '@/components/ui/Divider'
import { getAllPosts } from '@/lib/content'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on ML engineering: evaluation, LLM systems, and shipping models to production.',
  alternates: { canonical: `${site.url}/blog` },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <PixelLabel>SECTION 03 — BLOG</PixelLabel>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Blog</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
              Practical write-ups on ML systems, modeling trade-offs, and performance constraints.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/rss.xml" className="text-ink hover:underline">
              RSS
            </Link>
          </div>
        </div>

        <Divider />

        <PostsExplorer posts={posts} />
      </Container>
    </Blueprint>
  )
}
