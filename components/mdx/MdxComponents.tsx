import type { ComponentProps, ComponentType, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { PixelLabel } from '@/components/ui/PixelLabel'
import type { Dictionary } from '@/lib/i18n'

function parseDimension(value?: string | number) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
  if (typeof value === 'string') {
    const num = Number(value)
    return Number.isFinite(num) ? num : undefined
  }
  return undefined
}

type MdxComponent = ComponentType<Record<string, unknown>>

export function mdxComponents(dict: Dictionary): Record<string, MdxComponent> {
  const Anchor: MdxComponent = (props) => {
    const { href, children, ...rest } = props as ComponentProps<'a'>
    if (!href) return <a {...rest}>{children}</a>
    const isExternal = href.startsWith('http') || href.startsWith('mailto:')
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noreferrer" {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  const Img: MdxComponent = (props) => {
    const imgProps = props as ComponentProps<'img'>
    // For best perf, prefer the <Figure /> component (next/image) in MDX.
    const src = imgProps.src
    if (!src) return null
    const alt = typeof imgProps.alt === 'string' ? imgProps.alt : ''
    const width = parseDimension(imgProps.width)
    const height = parseDimension(imgProps.height)
    const sizes = imgProps.sizes || '(min-width: 1024px) 800px, 100vw'

    if (width && height) {
      return (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={cn('rounded-2xl border border-[rgba(11,15,20,0.10)]', imgProps.className)}
        />
      )
    }

    return (
      <span
        className={cn(
          'relative block w-full overflow-hidden rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white',
          imgProps.className,
        )}
        style={{ aspectRatio: '16 / 9' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </span>
    )
  }

  const Figure: MdxComponent = (props) => {
    const {
      src,
      alt,
      caption,
      width = 1200,
      height = 675,
      priority,
    } = props as {
      src: string
      alt: string
      caption?: string
      width?: number
      height?: number
      priority?: boolean
    }

    if (!src) return null

    return (
      <figure className="my-8">
        <div className="overflow-hidden rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white">
          <Image
            src={src}
            alt={alt ?? ''}
            width={width}
            height={height}
            priority={priority}
            className="h-auto w-full"
          />
        </div>
        {caption ? (
          <figcaption className="mt-3 flex items-baseline gap-3 text-xs text-[rgba(11,15,20,0.60)]">
            <PixelLabel className="text-[rgba(11,15,20,0.55)]">{dict.mdx.figureLabel}</PixelLabel>
            <span>{caption}</span>
          </figcaption>
        ) : null}
      </figure>
    )
  }

  const Callout: MdxComponent = (props) => {
    const { title, children } = props as { title: string; children: ReactNode }
    return (
      <Card className="my-8 p-5" hover={false}>
        <div className="mb-3 flex items-center gap-3">
          <PixelLabel>{dict.mdx.noteLabel}</PixelLabel>
          <span className="h-px flex-1 bg-[rgba(11,15,20,0.08)]" />
        </div>
        <p className="mb-2 text-sm font-semibold text-text">{title}</p>
        <div className="prose prose-sm max-w-none">{children}</div>
      </Card>
    )
  }

  return {
    a: Anchor,
    img: Img,
    Figure,
    Callout,
  }
}
