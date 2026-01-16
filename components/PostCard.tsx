import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import type { Post } from '@/lib/content'
import { formatDate } from '@/lib/utils'

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <Link href={`/blog/${post.slug}`} className="text-base font-semibold tracking-tight text-text hover:underline">
          {post.title}
        </Link>
        <div className="text-xs text-[rgba(11,15,20,0.55)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden> · </span>
          <span>{post.readingTime}</span>
        </div>
      </div>

      <p className="mt-2 text-sm text-[rgba(11,15,20,0.70)]">{post.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <Chip key={t} tone="neutral">
            {t}
          </Chip>
        ))}
      </div>
    </Card>
  )
}
