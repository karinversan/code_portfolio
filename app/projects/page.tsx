import type { Metadata } from 'next'

import { Blueprint } from '@/components/Blueprint'
import { ProjectsExplorer } from '@/components/ProjectsExplorer'
import { Container } from '@/components/ui/Container'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { Divider } from '@/components/ui/Divider'
import { getAllProjects } from '@/lib/content'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected machine learning case studies: problem, approach, and measured results.',
  alternates: { canonical: `${site.url}/projects` },
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <div className="space-y-3">
          <PixelLabel>SECTION 02 — PROJECTS</PixelLabel>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Projects</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[rgba(11,15,20,0.72)]">
            Case studies focused on measurable outcomes: quality, latency, reliability, and cost.
          </p>
        </div>

        <Divider />

        <ProjectsExplorer projects={projects} />
      </Container>
    </Blueprint>
  )
}
