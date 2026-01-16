import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export type PostFrontmatter = {
  title: string
  date: string
  summary: string
  tags: string[]
  draft: boolean
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
}

export type Post = PostFrontmatter & {
  slug: string
  readingTime: string
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

function canIncludeDrafts(explicit?: boolean) {
  if (typeof explicit === 'boolean') return explicit
  return process.env.SHOW_DRAFTS === 'true'
}

export function getAllPosts(options?: { includeDrafts?: boolean }) {
  const includeDrafts = canIncludeDrafts(options?.includeDrafts)
  const files = mdxFiles(POSTS_DIR)

  const posts: Post[] = files
    .map((file) => {
      const filePath = path.join(POSTS_DIR, file)
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(raw)
      const fm = data as PostFrontmatter
      const slug = fm.slug || file.replace(/\.mdx$/, '')
      const rt = readingTime(content)
      return {
        ...fm,
        slug,
        readingTime: rt.text,
      }
    })
    .filter((p) => (includeDrafts ? true : !p.draft))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  return posts
}

export function getPostSlugs(options?: { includeDrafts?: boolean }) {
  return getAllPosts(options).map((p) => p.slug)
}

export function getPostBySlug(slug: string, options?: { includeDrafts?: boolean }) {
  const includeDrafts = canIncludeDrafts(options?.includeDrafts)
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)

  // Fallback: find by frontmatter.slug
  let chosenPath = filePath
  if (!fs.existsSync(chosenPath)) {
    const match = mdxFiles(POSTS_DIR)
      .map((file) => path.join(POSTS_DIR, file))
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

  return {
    frontmatter: fm,
    content,
    slug: fm.slug || path.basename(chosenPath).replace(/\.mdx$/, ''),
  }
}

export function getAllProjects() {
  const files = mdxFiles(PROJECTS_DIR)
  const projects: Project[] = files
    .map((file) => {
      const filePath = path.join(PROJECTS_DIR, file)
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(raw)
      const fm = data as ProjectFrontmatter
      const slug = fm.slug || file.replace(/\.mdx$/, '')
      return { ...fm, slug }
    })
    .sort((a, b) => String(b.year).localeCompare(String(a.year)))

  return projects
}

export function getProjectSlugs() {
  return getAllProjects().map((p) => p.slug)
}

export function getProjectBySlug(slug: string) {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)

  // Fallback: find by frontmatter.slug
  let chosenPath = filePath
  if (!fs.existsSync(chosenPath)) {
    const match = mdxFiles(PROJECTS_DIR)
      .map((file) => path.join(PROJECTS_DIR, file))
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
  const fm = data as ProjectFrontmatter

  return {
    frontmatter: fm,
    content,
    slug: fm.slug || path.basename(chosenPath).replace(/\.mdx$/, ''),
  }
}
