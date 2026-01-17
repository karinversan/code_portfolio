import type { Metadata } from 'next'

import { Blueprint } from '@/components/Blueprint'
import { ProjectsExplorer } from '@/components/ProjectsExplorer'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { Divider } from '@/components/ui/Divider'
import { getAllProjects } from '@/lib/content'
import { getDictionary, localizePath } from '@/lib/i18n'
import { getLocale } from '@/lib/i18n.server'
import { absoluteUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale()
  const dict = getDictionary(locale)
  return {
    title: dict.projects.metadata.title,
    description: dict.projects.metadata.description,
    alternates: {
      canonical: absoluteUrl(localizePath('/projects', locale)),
      languages: {
        en: absoluteUrl(localizePath('/projects', 'en')),
        ru: absoluteUrl(localizePath('/projects', 'ru')),
      },
    },
  }
}

export default function ProjectsPage() {
  const locale = getLocale()
  const dict = getDictionary(locale)
  const projects = getAllProjects({ locale })

  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <div className="space-y-3">
          <PixelLabel>{dict.projects.sectionLabel}</PixelLabel>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{dict.projects.title}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
            {dict.projects.description}
          </p>
        </div>

        <Divider />

        <ProjectsExplorer projects={projects} dict={dict} locale={locale} />
      </Container>
    </Blueprint>
  )
}
