import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

function clamp(input: string | null, max = 120): string {
  if (!input) return ''
  const s = input.trim()
  return s.length > max ? `${s.slice(0, max - 1)}…` : s
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = clamp(searchParams.get('title'), 80) || 'Portfolio'
  const subtitle = clamp(searchParams.get('subtitle'), 100) || 'Machine Learning Engineer'

  // Minimal blueprint/editorial vibe: subtle grid + ink accent.
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#F7F8FA',
          color: '#0B0F14',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          backgroundImage:
            'linear-gradient(to right, rgba(11,15,20,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,15,20,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(11,15,20,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,15,20,0.03) 1px, transparent 1px)',
          backgroundSize: '96px 96px, 96px 96px, 24px 24px, 24px 24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: 'rgba(11,15,20,0.65)',
            }}
          >
            FIG 001
          </div>
          <div style={{ width: 180, height: 2, background: 'rgba(11,15,20,0.12)' }} />
        </div>

        <div style={{ maxWidth: 980 }}>
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            {title}
          </div>
          <div style={{ marginTop: 18, fontSize: 26, color: 'rgba(11,15,20,0.75)', lineHeight: 1.3 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: '#2F6BFF' }} />
          <div style={{ fontSize: 18, color: 'rgba(11,15,20,0.70)' }}>ink blue • blueprint notes • production ML</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
