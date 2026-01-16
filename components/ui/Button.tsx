import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  prefetch?: boolean
}

export function ButtonLink({
  href,
  children,
  className,
  variant = 'primary',
  prefetch,
}: Props) {
  const base =
    'inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
  const variants = {
    primary: 'border-ink bg-ink text-white hover:bg-ink/90',
    secondary:
      'border-[rgba(11,15,20,0.14)] bg-white text-text hover:border-ink/50',
  } as const

  return (
    <Link href={href} prefetch={prefetch} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  )
}
