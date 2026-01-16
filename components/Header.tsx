import Link from 'next/link'
import { site } from '@/lib/site'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(11,15,20,0.08)] bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/65">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group inline-flex items-baseline gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
          <PixelLabel className="text-[rgba(11,15,20,0.65)]">FIG 001</PixelLabel>
          <span className="text-sm font-semibold tracking-tight text-text">
            {site.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[rgba(11,15,20,0.72)] hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[rgba(11,15,20,0.62)] hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            GitHub
          </Link>
          <span className="h-4 w-px bg-[rgba(11,15,20,0.12)]" />
          <Link
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[rgba(11,15,20,0.62)] hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            LinkedIn
          </Link>
        </div>
      </Container>

      <nav className="border-t border-[rgba(11,15,20,0.06)] md:hidden">
        <Container className="flex items-center justify-between gap-3 py-3">
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[rgba(11,15,20,0.72)] hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  )
}
