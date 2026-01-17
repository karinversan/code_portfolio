'use client'

import { useMemo, useState } from 'react'
import type { Project } from '@/lib/content'
import { ProjectCard } from '@/components/ProjectCard'
import { Chip } from '@/components/ui/Chip'
import { PixelLabel } from '@/components/ui/PixelLabel'
import type { Dictionary, Locale } from '@/lib/i18n'

export function ProjectsExplorer({
  projects,
  dict,
  locale,
}: {
  projects: Project[]
  dict: Dictionary
  locale: Locale
}) {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)

  const tags = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [projects])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      const matchesTag = !tag || p.tags.includes(tag)
      return matchesQuery && matchesTag
    })
  }, [projects, query, tag])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 md:items-end">
        <div className="space-y-2">
          <PixelLabel>{dict.projectsExplorer.searchLabel}</PixelLabel>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.projectsExplorer.searchPlaceholder}
            className="w-full rounded-xl border border-[rgba(11,15,20,0.14)] bg-white px-3 py-2 text-sm text-text placeholder:text-[rgba(11,15,20,0.45)] focus:outline-none focus:ring-2 focus:ring-ink/35"
          />
        </div>
        <div className="space-y-2">
          <PixelLabel>{dict.projectsExplorer.filterLabel}</PixelLabel>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTag(null)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            >
              <Chip tone={tag === null ? 'ink' : 'neutral'} className={tag === null ? 'bg-ink/10' : ''}>
                {dict.projectsExplorer.all}
              </Chip>
            </button>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(tag === t ? null : t)}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              >
                <Chip tone={tag === t ? 'ink' : 'neutral'} className={tag === t ? 'bg-ink/10' : ''}>
                  {t}
                </Chip>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {results.map((p) => (
          <ProjectCard key={p.slug} project={p} locale={locale} />
        ))}
      </div>

      {results.length === 0 ? (
        <p className="text-sm text-[rgba(11,15,20,0.65)]">{dict.projectsExplorer.empty}</p>
      ) : null}
    </div>
  )
}
