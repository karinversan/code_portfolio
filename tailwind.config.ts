import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F7F8FA',
        text: '#0B0F14',
        ink: '#2F6BFF',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        pixel: ['var(--font-pixel)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 0 rgba(0,0,0,0.04), 0 12px 24px rgba(11, 15, 20, 0.06)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#0B0F14',
            a: {
              color: '#2F6BFF',
              textDecoration: 'none',
              fontWeight: '500',
            },
            'a:hover': {
              textDecoration: 'underline',
            },
            code: {
              color: '#0B0F14',
              backgroundColor: 'rgba(47,107,255,0.08)',
              paddingLeft: '0.3em',
              paddingRight: '0.3em',
              paddingTop: '0.15em',
              paddingBottom: '0.15em',
              borderRadius: '0.35em',
              fontWeight: '500',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: 'rgba(11,15,20,0.04)',
              border: '1px solid rgba(11,15,20,0.10)',
              borderRadius: '14px',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0',
              fontWeight: '400',
            },
            hr: {
              borderColor: 'rgba(11,15,20,0.10)',
            },
            blockquote: {
              borderLeftColor: 'rgba(47,107,255,0.35)',
              color: 'rgba(11,15,20,0.80)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
