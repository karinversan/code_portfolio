"use client"

import { useMemo, useState } from "react"
import type { Post } from "@/lib/content"
import { PostCard } from "@/components/PostCard"
import { Chip } from "@/components/ui/Chip"
import { PixelLabel } from "@/components/ui/PixelLabel"

export function PostsExplorer({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sort, setSort] = useState<"newest" | "oldest">("newest")

  const tags = useMemo(() => {
    const set = new Set<string>()
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [posts])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()

    const filtered = posts.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)

      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((t) => p.tags.includes(t))

      return matchesQuery && matchesTags
    })

    const sorted = [...filtered].sort((a, b) => {
      const ta = Date.parse(a.date) || 0
      const tb = Date.parse(b.date) || 0

      if (ta !== tb) {
        return sort === "newest" ? tb - ta : ta - tb
      }

      return a.title.localeCompare(b.title)
    })

    return sorted
  }, [posts, query, selectedTags, sort])

  function toggleTag(t: string) {
    setSelectedTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    )
  }

  function clearTags() {
    setSelectedTags([])
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 md:items-end">
        <div className="space-y-2 md:col-span-2">
          <PixelLabel>SEARCH</PixelLabel>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or summary…"
            className="w-full rounded-xl border border-[rgba(11,15,20,0.14)] bg-white px-3 py-2 text-sm text-text placeholder:text-[rgba(11,15,20,0.45)] focus:outline-none focus:ring-2 focus:ring-ink/35"
          />
        </div>

        <div className="space-y-2">
          <PixelLabel>SORT</PixelLabel>

          {/* красивый select + кастомная стрелка */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="w-full appearance-none rounded-xl border border-[rgba(11,15,20,0.14)] bg-white px-3 py-2 pr-10 text-sm text-text shadow-sm focus:outline-none focus:ring-2 focus:ring-ink/35 hover:border-[rgba(11,15,20,0.20)] transition"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-[rgba(11,15,20,0.55)]"
            >
              ▾
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-end justify-between gap-3">
          <PixelLabel>TAGS</PixelLabel>

          {selectedTags.length > 0 ? (
            <button
              type="button"
              onClick={clearTags}
              className="text-xs text-ink hover:underline"
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={clearTags}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          >
            <Chip tone={selectedTags.length === 0 ? "ink" : "neutral"} className={selectedTags.length === 0 ? "bg-ink/10" : ""}>
              All
            </Chip>
          </button>

          {tags.map((t) => {
            const active = selectedTags.includes(t)
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              >
                <Chip tone={active ? "ink" : "neutral"} className={active ? "bg-ink/10" : ""}>
                  {t}
                </Chip>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-4">
        {results.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>

      {results.length === 0 ? (
        <p className="text-sm text-[rgba(11,15,20,0.65)]">No posts match your filters.</p>
      ) : null}
    </div>
  )
}
