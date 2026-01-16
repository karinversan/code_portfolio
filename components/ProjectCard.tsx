import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import type { Project } from '@/lib/content'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Link
            href={`/projects/${project.slug}`}
            className="text-base font-semibold tracking-tight text-text hover:underline"
          >
            {project.title}
          </Link>
          <p className="text-sm text-[rgba(11,15,20,0.70)]">{project.summary}</p>
        </div>
        <div className="text-xs text-[rgba(11,15,20,0.55)]">
          {project.year}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>

      {project.metrics?.length ? (
        <ul className="mt-4 grid gap-2 text-sm">
          {project.metrics.slice(0, 3).map((m) => (
            <li key={m} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden />
              <span className="text-[rgba(11,15,20,0.78)]">{m}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((t) => (
          <Chip key={t} tone="ink" className="bg-ink/5">
            {t}
          </Chip>
        ))}
      </div>
    </Card>
  )
}
