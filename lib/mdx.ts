import type { ReactNode } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import GithubSlugger from 'github-slugger'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

export type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

function nodeToText(node: any): string {
  if (!node) return ''
  if (node.type === 'text') return node.value
  if (node.type === 'inlineCode') return node.value
  if (Array.isArray(node.children)) return node.children.map(nodeToText).join('')
  return ''
}

export function extractToc(source: string): TocItem[] {
  const slugger = new GithubSlugger()
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source)

  const items: TocItem[] = []
  visit(tree, 'heading', (node: any) => {
    const depth = node.depth
    if (depth !== 2 && depth !== 3) return
    const text = nodeToText(node)
    const id = slugger.slug(text)
    items.push({ id, text, level: depth })
  })

  return items
}

const prettyCodeOptions = {
  theme: 'github-light',
  keepBackground: false,
  defaultLang: 'text',
  onVisitLine(node: any) {
    // Ensure empty lines in code blocks are preserved
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className = [...(node.properties.className || []), 'line--highlighted']
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = [...(node.properties.className || []), 'word--highlighted']
  },
}

export async function compileMdx(
  source: string,
  components: Record<string, any> = {},
): Promise<{ content: ReactNode }> {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-anchor'] } }],
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  })

  return { content }
}
