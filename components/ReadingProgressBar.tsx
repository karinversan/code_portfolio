'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    let raf = 0
    const handle = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const p = docHeight > 0 ? scrollTop / docHeight : 0
        setProgress(Math.min(1, Math.max(0, p)))
      })
    }

    handle()
    window.addEventListener('scroll', handle, { passive: true })
    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('scroll', handle)
      window.removeEventListener('resize', handle)
      cancelAnimationFrame(raf)
    }
  }, [reduce])

  return (
    <div aria-hidden className="fixed left-0 top-0 z-50 h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-ink"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
