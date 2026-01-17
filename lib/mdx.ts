import type { ComponentType, ReactNode } from 'react'
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
import type { Element, Text } from 'hast'
import type { Heading, Root } from 'mdast'
type MDXComponents = Record<string, ComponentType<Record<string, unknown>>>

export type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

type MdxNode = {
  type?: string
  value?: string
  children?: MdxNode[]
}

function isMdxNode(value: unknown): value is MdxNode {
  return typeof value === 'object' && value !== null && 'type' in value
}

function nodeToText(node: unknown): string {
  if (!isMdxNode(node)) return ''
  if (node.type === 'text' || node.type === 'inlineCode') {
    return typeof node.value === 'string' ? node.value : ''
  }
  if (Array.isArray(node.children)) return node.children.map(nodeToText).join('')
  return ''
}

export function extractToc(source: string): TocItem[] {
  const slugger = new GithubSlugger()
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source) as Root

  const items: TocItem[] = []
  visit(tree, 'heading', (node: Heading) => {
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
  onVisitLine(node: Element) {
    // Ensure empty lines in code blocks are preserved
    if (node.children.length === 0) {
      const emptyText: Text = { type: 'text', value: ' ' }
      node.children = [emptyText]
    }
  },
  onVisitHighlightedLine(node: Element) {
    const properties = node.properties ?? {}
    const className = Array.isArray(properties.className)
      ? properties.className
      : typeof properties.className === 'string'
        ? [properties.className]
        : []
    node.properties = { ...properties, className: [...className, 'line--highlighted'] }
  },
  onVisitHighlightedWord(node: Element) {
    const properties = node.properties ?? {}
    const className = Array.isArray(properties.className)
      ? properties.className
      : typeof properties.className === 'string'
        ? [properties.className]
        : []
    node.properties = { ...properties, className: [...className, 'word--highlighted'] }
  },
}

export async function compileMdx(
  source: string,
  components: MDXComponents = {},
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
