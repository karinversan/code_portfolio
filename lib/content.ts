import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Locale } from '@/lib/i18n'

export type PostFrontmatter = {
  title: string
  date: string
  summary: string
  tags: string[]
  draft: boolean
  lang?: Locale
  cover?: string
  slug?: string
}

export type ProjectFrontmatter = {
  title: string
  summary: string
  tags: string[]
  stack: string[]
  metrics: string[]
  role: string
  year: string | number
  links?: { github?: string; demo?: string; article?: string }
  featured: boolean
  slug?: string
  title_ru?: string
  summary_ru?: string
  role_ru?: string
  metrics_ru?: string[]
}

export type Post = PostFrontmatter & {
  slug: string
  readingTime: string
  readingTimeMinutes: number
}

export type Project = ProjectFrontmatter & {
  slug: string
}

const POSTS_DIR = path.join(process.cwd(), 'content/posts')
const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

function mdxFiles(dir: string) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
}

function resolveContentDir(baseDir: string, locale?: Locale) {
  if (!locale) return { dir: baseDir, localized: false }
  const localized = path.join(process.cwd(), 'content', locale, path.basename(baseDir))
  if (fs.existsSync(localized)) {
    return { dir: localized, localized: true }
  }
  return { dir: baseDir, localized: false }
}

function canIncludeDrafts(explicit?: boolean) {
  if (typeof explicit === 'boolean') return explicit
  return process.env.SHOW_DRAFTS === 'true'
}

export function getAllPosts(options?: { includeDrafts?: boolean; locale?: Locale }) {
  const includeDrafts = canIncludeDrafts(options?.includeDrafts)
  const { dir, localized } = resolveContentDir(POSTS_DIR, options?.locale)
  const files = mdxFiles(dir)

  const posts: Post[] = files
    .map((file) => {
      const filePath = path.join(dir, file)
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(raw)
      const fm = data as PostFrontmatter
      const slug = fm.slug || file.replace(/\.mdx$/, '')
      const rt = readingTime(content)
      return {
        ...fm,
        slug,
        readingTime: rt.text,
        readingTimeMinutes: rt.minutes,
      }
    })
    .filter((p) => (includeDrafts ? true : !p.draft))
    .filter((p) => {
      if (!options?.locale || localized) return true
      if (!p.lang) return options.locale === 'en'
      return p.lang === options.locale
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  return posts
}

export function getPostSlugs(options?: { includeDrafts?: boolean; locale?: Locale }) {
  return getAllPosts(options).map((p) => p.slug)
}

export function getPostBySlug(slug: string, options?: { includeDrafts?: boolean; locale?: Locale }) {
  const includeDrafts = canIncludeDrafts(options?.includeDrafts)
  const { dir, localized } = resolveContentDir(POSTS_DIR, options?.locale)
  const filePath = path.join(dir, `${slug}.mdx`)

  // Fallback: find by frontmatter.slug
  let chosenPath = filePath
  if (!fs.existsSync(chosenPath)) {
    const match = mdxFiles(dir)
      .map((file) => path.join(dir, file))
      .find((fp) => {
        const raw = fs.readFileSync(fp, 'utf8')
        const { data } = matter(raw)
        return (data as PostFrontmatter).slug === slug
      })
    if (match) chosenPath = match
  }

  if (!fs.existsSync(chosenPath)) return null

  const raw = fs.readFileSync(chosenPath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter
  if (fm.draft && !includeDrafts) return null
  if (options?.locale && !localized) {
    if (!fm.lang && options.locale !== 'en') return null
    if (fm.lang && fm.lang !== options.locale) return null
  }

  return {
    frontmatter: fm,
    content,
    slug: fm.slug || path.basename(chosenPath).replace(/\.mdx$/, ''),
  }
}

function localizeProjectFrontmatter(fm: ProjectFrontmatter, locale?: Locale): ProjectFrontmatter {
  if (locale !== 'ru') return fm
  return {
    ...fm,
    title: fm.title_ru || fm.title,
    summary: fm.summary_ru || fm.summary,
    role: fm.role_ru || fm.role,
    metrics: fm.metrics_ru || fm.metrics,
  }
}

export function getAllProjects(options?: { locale?: Locale }) {
  const { dir } = resolveContentDir(PROJECTS_DIR, options?.locale)
  const files = mdxFiles(dir)
  const projects: Project[] = files
    .map((file) => {
      const filePath = path.join(dir, file)
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(raw)
      const fm = localizeProjectFrontmatter(data as ProjectFrontmatter, options?.locale)
      const slug = fm.slug || file.replace(/\.mdx$/, '')
      return { ...fm, slug }
    })
    .sort((a, b) => String(b.year).localeCompare(String(a.year)))

  return projects
}

export function getProjectSlugs(options?: { locale?: Locale }) {
  return getAllProjects(options).map((p) => p.slug)
}

export function getProjectBySlug(slug: string, options?: { locale?: Locale }) {
  const { dir } = resolveContentDir(PROJECTS_DIR, options?.locale)
  const filePath = path.join(dir, `${slug}.mdx`)

  // Fallback: find by frontmatter.slug
  let chosenPath = filePath
  if (!fs.existsSync(chosenPath)) {
    const match = mdxFiles(dir)
      .map((file) => path.join(dir, file))
      .find((fp) => {
        const raw = fs.readFileSync(fp, 'utf8')
        const { data } = matter(raw)
        return (data as ProjectFrontmatter).slug === slug
      })
    if (match) chosenPath = match
  }

  if (!fs.existsSync(chosenPath)) return null

  const raw = fs.readFileSync(chosenPath, 'utf8')
  const { data, content } = matter(raw)
  const fm = localizeProjectFrontmatter(data as ProjectFrontmatter, options?.locale)

  return {
    frontmatter: fm,
    content,
    slug: fm.slug || path.basename(chosenPath).replace(/\.mdx$/, ''),
  }
}
