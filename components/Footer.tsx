import Link from 'next/link'
import { site } from '@/lib/site'
import type { Dictionary, Locale } from '@/lib/i18n'
import { localizePath } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="border-t border-[rgba(11,15,20,0.08)] bg-bg">
      <Container className="py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <PixelLabel>{dict.footer.sectionLabel}</PixelLabel>
            <p className="text-sm text-[rgba(11,15,20,0.66)]">
              © {new Date().getFullYear()} {site.name}. {dict.footer.builtWith}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link href={localizePath('/privacy', locale)} className="text-[rgba(11,15,20,0.66)] hover:text-text">
              {dict.footer.privacy}
            </Link>
            <Link
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-[rgba(11,15,20,0.66)] hover:text-text"
            >
              {dict.footer.github}
            </Link>
            <Link
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[rgba(11,15,20,0.66)] hover:text-text"
            >
              {dict.footer.linkedin}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
