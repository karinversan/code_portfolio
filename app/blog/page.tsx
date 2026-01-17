import type { Metadata } from 'next'
import Link from 'next/link'

import { Blueprint } from '@/components/Blueprint'
import { PostsExplorer } from '@/components/PostsExplorer'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { Divider } from '@/components/ui/Divider'
import { getAllPosts } from '@/lib/content'
import { getDictionary, localizePath } from '@/lib/i18n'
import { getLocale } from '@/lib/i18n.server'
import { absoluteUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale()
  const dict = getDictionary(locale)
  return {
    title: dict.blog.metadata.title,
    description: dict.blog.metadata.description,
    alternates: {
      canonical: absoluteUrl(localizePath('/blog', locale)),
      languages: {
        en: absoluteUrl(localizePath('/blog', 'en')),
        ru: absoluteUrl(localizePath('/blog', 'ru')),
      },
    },
  }
}

export default function BlogPage() {
  const locale = getLocale()
  const dict = getDictionary(locale)
  const posts = getAllPosts({ locale })

  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <PixelLabel>{dict.blog.sectionLabel}</PixelLabel>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{dict.blog.title}</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
              {dict.blog.description}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/rss.xml" className="text-ink hover:underline">
              {dict.blog.rssLabel}
            </Link>
          </div>
        </div>

        <Divider />

        <PostsExplorer posts={posts} locale={locale} dict={dict} />
      </Container>
    </Blueprint>
  )
}
