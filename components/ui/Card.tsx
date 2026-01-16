import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[rgba(11,15,20,0.10)] bg-white shadow-soft',
        hover &&
          'transition-transform duration-200 will-change-transform hover:-translate-y-[2px] hover:border-ink/50',
        className,
      )}
    >
      {children}
    </div>
  )
}
