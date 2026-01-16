import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Chip({
  children,
  className,
  tone = 'neutral',
}: {
  children: ReactNode
  className?: string
  tone?: 'neutral' | 'ink'
}) {
  const base =
    'inline-flex items-center rounded-full border px-3 py-1 text-xs leading-none'
  const tones = {
    neutral: 'border-[rgba(11,15,20,0.12)] bg-[rgba(11,15,20,0.02)] text-[rgba(11,15,20,0.80)]',
    ink: 'border-ink/25 bg-ink/10 text-ink',
  } as const

  return <span className={cn(base, tones[tone], className)}>{children}</span>
}
