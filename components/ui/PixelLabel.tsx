import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function PixelLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'font-pixel text-[10px] uppercase tracking-[0.16em] text-[rgba(11,15,20,0.70)]',
        className,
      )}
    >
      {children}
    </span>
  )
}
