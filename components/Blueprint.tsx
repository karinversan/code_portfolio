import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Blueprint({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('blueprint-grid', className)}>
      {children}
    </div>
  )
}
