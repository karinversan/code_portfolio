'use client'

import { useState } from 'react'

import type { TocItem } from '@/lib/mdx'
import { TableOfContents } from '@/components/TableOfContents'
import { PixelLabel } from '@/components/ui/PixelLabel'

export function MobileToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false)

  if (items.length === 0) return null

  return (
    <div className="rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white p-4 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-[rgba(11,15,20,0.10)] bg-[rgba(11,15,20,0.02)] px-3 py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <PixelLabel>CONTENTS</PixelLabel>
          <span className="text-sm text-[rgba(11,15,20,0.70)]">Jump to section</span>
        </div>
        <span aria-hidden className="text-[rgba(11,15,20,0.55)]">{open ? '–' : '+'}</span>
      </button>

      {open ? (
        <div className="mt-4">
          <TableOfContents
            items={items}
            onNavigate={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  )
}
