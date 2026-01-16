'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function AnalyticsProvider() {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
  if (!enabled) return null
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
