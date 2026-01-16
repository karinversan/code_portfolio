import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Feed } from 'feed'

const root = process.cwd()
const postsDir = path.join(root, 'content', 'posts')
const outPath = path.join(root, 'public', 'rss.xml')

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Karin Ndzi'
const authorEmail = process.env.NEXT_PUBLIC_AUTHOR_EMAIL || 'you@example.com'
const title = process.env.NEXT_PUBLIC_SITE_TITLE || `${authorName} — Blog`
const description = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Notes on ML engineering, evaluation, and production systems.'

function mdxFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
}

const files = mdxFiles(postsDir)

const posts = files
  .map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const { data } = matter(raw)
    const slug = data.slug || file.replace(/\.mdx$/, '')
    return {
      ...data,
      slug,
    }
  })
  .filter((p) => !p.draft)
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))

const feed = new Feed({
  title,
  description,
  id: siteUrl,
  link: siteUrl,
  language: 'en',
  image: `${siteUrl}/api/og?title=${encodeURIComponent(authorName)}&subtitle=${encodeURIComponent('Blog')}`,
  favicon: `${siteUrl}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, ${authorName}`,
  updated: posts.length ? new Date(posts[0].date) : new Date(),
  generator: 'Next.js + feed',
  feedLinks: {
    rss2: `${siteUrl}/rss.xml`,
  },
  author: {
    name: authorName,
    email: authorEmail,
    link: siteUrl,
  },
})

for (const post of posts) {
  const url = `${siteUrl}/blog/${post.slug}`
  feed.addItem({
    title: post.title,
    id: url,
    link: url,
    description: post.summary,
    date: new Date(post.date),
    category: Array.isArray(post.tags) ? post.tags.map((t) => ({ name: t })) : [],
  })
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, feed.rss2(), 'utf8')

console.log(`[rss] wrote ${outPath} (${posts.length} items)`) 
