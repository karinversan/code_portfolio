import Link from 'next/link'
import { site } from '@/lib/site'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'

export function Footer() {
  return (
    <footer className="border-t border-[rgba(11,15,20,0.08)] bg-bg">
      <Container className="py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <PixelLabel>SECTION 09 — END</PixelLabel>
            <p className="text-sm text-[rgba(11,15,20,0.66)]">
              © {new Date().getFullYear()} {site.name}. Built with Next.js, TypeScript, and MDX.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/privacy" className="text-[rgba(11,15,20,0.66)] hover:text-text">
              Privacy
            </Link>
            <Link
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-[rgba(11,15,20,0.66)] hover:text-text"
            >
              GitHub
            </Link>
            <Link
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[rgba(11,15,20,0.66)] hover:text-text"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
