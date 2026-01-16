'use client'

import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { TocItem } from '@/lib/mdx'
import { cn } from '@/lib/utils'
import { PixelLabel } from '@/components/ui/PixelLabel'

type Props = {
  items: TocItem[]
  className?: string
  onNavigate?: () => void
}

export function TableOfContents({ items, className, onNavigate }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const reduce = useReducedMotion()

  const ids = useMemo(() => items.map((i) => i.id), [items])

  useEffect(() => {
    if (ids.length === 0) return

    const headings = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the heading closest to the top (within the observer window)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1))

        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 1],
      },
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [ids])

  if (items.length === 0) return null

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <PixelLabel>CONTENTS</PixelLabel>
        {activeId ? (
          <PixelLabel className="text-[rgba(11,15,20,0.55)]">CURRENT</PixelLabel>
        ) : null}
      </div>
      <ul className="space-y-1 text-sm">
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id} className={cn(item.level === 3 && 'pl-3')}>
              <a
                href={`#${item.id}`}
                onClick={() => {
                  if (onNavigate) onNavigate()
                }}
                className={cn(
                  'block rounded-md border border-transparent px-2 py-1 text-[rgba(11,15,20,0.70)] hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40',
                  isActive && 'border-ink/25 bg-ink/10 text-ink',
                )}
                style={reduce ? undefined : { scrollBehavior: 'smooth' }}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
