import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const locales = ['ru']
const contentRoots = ['posts', 'projects']

function mdxFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

for (const locale of locales) {
  for (const section of contentRoots) {
    const sourceDir = path.join(root, 'content', section)
    const targetDir = path.join(root, 'content', locale, section)
    ensureDir(targetDir)

    for (const file of mdxFiles(sourceDir)) {
      const sourcePath = path.join(sourceDir, file)
      const targetPath = path.join(targetDir, file)
      if (fs.existsSync(targetPath)) continue

      const raw = fs.readFileSync(sourcePath, 'utf8')
      const { data, content } = matter(raw)
      const draftData = {
        ...data,
        draft: true,
        lang: locale,
        title: data.title ? `[RU draft] ${data.title}` : data.title,
        summary: data.summary ? `[RU draft] ${data.summary}` : data.summary,
      }

      const draftBody = [
        '> TODO: translate this content into Russian and remove this note.',
        '',
        content,
      ].join('\n')

      const out = matter.stringify(draftBody, draftData)
      fs.writeFileSync(targetPath, out, 'utf8')
      console.log(`[ru-draft] created ${path.relative(root, targetPath)}`)
    }
  }
}
