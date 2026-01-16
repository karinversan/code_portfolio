import type { ComponentProps, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { PixelLabel } from '@/components/ui/PixelLabel'

export const mdxComponents = {
  a: ({ href, children, ...props }: ComponentProps<'a'>) => {
    if (!href) return <a {...props}>{children}</a>
    const isExternal = href.startsWith('http') || href.startsWith('mailto:')
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} {...(props as any)}>
        {children}
      </Link>
    )
  },
  img: (props: ComponentProps<'img'>) => (
    // For best perf, prefer the <Figure /> component (next/image) in MDX.
    <img
      {...props}
      loading="lazy"
      decoding="async"
      className={cn('rounded-2xl border border-[rgba(11,15,20,0.10)]', props.className)}
    />
  ),
  Figure: ({
    src,
    alt,
    caption,
    width = 1200,
    height = 675,
    priority,
  }: {
    src: string
    alt: string
    caption?: string
    width?: number
    height?: number
    priority?: boolean
  }) => (
    <figure className="my-8">
      <div className="overflow-hidden rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 flex items-baseline gap-3 text-xs text-[rgba(11,15,20,0.60)]">
          <PixelLabel className="text-[rgba(11,15,20,0.55)]">FIG</PixelLabel>
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  ),
  Callout: ({ title, children }: { title: string; children: ReactNode }) => (
    <Card className="my-8 p-5" hover={false}>
      <div className="mb-3 flex items-center gap-3">
        <PixelLabel>NOTE</PixelLabel>
        <span className="h-px flex-1 bg-[rgba(11,15,20,0.08)]" />
      </div>
      <p className="mb-2 text-sm font-semibold text-text">{title}</p>
      <div className="prose prose-sm max-w-none">{children}</div>
    </Card>
  ),
} as const
