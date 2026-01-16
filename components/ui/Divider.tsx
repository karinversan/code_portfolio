import { cn } from '@/lib/utils'

export function Divider({ className }: { className?: string }) {
  return (
    <hr
      className={cn('my-8 border-0 border-t border-[rgba(11,15,20,0.10)]', className)}
    />
  )
}
