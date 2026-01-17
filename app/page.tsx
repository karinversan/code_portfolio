import Link from 'next/link'

import { Blueprint } from '@/components/Blueprint'
import { PostCard } from '@/components/PostCard'
import { ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { Container } from '@/components/ui/Container'
import { Divider } from '@/components/ui/Divider'
import { PixelLabel } from '@/components/ui/PixelLabel'
import { ButtonLink } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Card } from '@/components/ui/Card'
import { getAllPosts, getAllProjects } from '@/lib/content'
import { marketing, site } from '@/lib/site'
import { getDictionary, localizePath } from '@/lib/i18n'
import { getLocale } from '@/lib/i18n.server'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const locale = getLocale()
  const dict = getDictionary(locale)
  const projects = getAllProjects({ locale })
  const featured = projects.filter((p) => p.featured).slice(0, 6)

  const posts = getAllPosts({ locale })
  const latestPosts = posts.slice(0, 5)

  const skills = dict.home.skills
  const process = dict.home.process

  return (
    <Blueprint className="pb-14">
      <Container className="pt-10">
        <Reveal>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <PixelLabel>{dict.home.sectionOverview}</PixelLabel>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {site.name}
                  <span className="text-[rgba(11,15,20,0.55)]"> · </span>
                  <span className="text-ink">{dict.site.title}</span>
                </h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={localizePath(marketing.ctas.projects, locale)}>{dict.buttons.viewProjects}</ButtonLink>
                <ButtonLink href={localizePath(marketing.ctas.blog, locale)} variant="secondary">
                  {dict.buttons.readBlog}
                </ButtonLink>
                <ButtonLink href={marketing.ctas.contact} variant="secondary">
                  {dict.buttons.contact}
                </ButtonLink>
                <ButtonLink href={marketing.ctas.cv} variant="secondary">
                  {dict.buttons.downloadCv}
                </ButtonLink>
              </div>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-[rgba(11,15,20,0.75)]">
              {dict.home.heroLine}
            </p>

            <div className="flex flex-wrap gap-2">
              {dict.home.chips.map((chip, idx) => (
                <Chip
                  key={chip}
                  tone={idx === 0 ? 'ink' : 'neutral'}
                  className={idx === 0 ? 'bg-ink/10' : undefined}
                >
                  {chip}
                </Chip>
              ))}
            </div>
          </div>
        </Reveal>

        <Divider />

        <Reveal delay={0.05}>
          <section aria-labelledby="featured-projects" className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <PixelLabel>{dict.home.sectionFeatured}</PixelLabel>
                <h2 id="featured-projects" className="text-xl font-semibold tracking-tight">
                  {dict.home.featuredTitle}
                </h2>
              </div>
              <Link href={localizePath('/projects', locale)} className="text-sm text-ink hover:underline">
                {dict.home.viewAll}
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {featured.map((p) => (
                <ProjectCard key={p.slug} project={p} locale={locale} />
              ))}
            </div>

            {featured.length === 0 ? (
              <p className="text-sm text-[rgba(11,15,20,0.65)]">
                {dict.home.addProjectsHint} <code className="font-mono">/content/projects</code>.
              </p>
            ) : null}
          </section>
        </Reveal>

        <Divider />

        <Reveal delay={0.08}>
          <section aria-labelledby="latest-articles" className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <PixelLabel>{dict.home.sectionArticles}</PixelLabel>
                <h2 id="latest-articles" className="text-xl font-semibold tracking-tight">
                  {dict.home.latestTitle}
                </h2>
              </div>
              <Link href={localizePath('/blog', locale)} className="text-sm text-ink hover:underline">
                {dict.home.viewAll}
              </Link>
            </div>

            <div className="grid gap-4">
              {latestPosts.map((p) => (
                <PostCard key={p.slug} post={p} locale={locale} />
              ))}
            </div>
          </section>
        </Reveal>

        <Divider />

        <Reveal delay={0.1}>
          <section aria-labelledby="skills" className="space-y-6">
            <div className="space-y-2">
              <PixelLabel>{dict.home.sectionSkills}</PixelLabel>
              <h2 id="skills" className="text-xl font-semibold tracking-tight">
                {dict.home.skillsTitle}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(skills).map(([group, items]) => (
                <Card key={group} className="p-5" hover={false}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold tracking-tight">{group}</p>
                    <PixelLabel className="text-[rgba(11,15,20,0.55)]">{dict.home.kitLabel}</PixelLabel>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </Reveal>

        <Divider />

        <Reveal delay={0.12}>
          <section aria-labelledby="process" className="space-y-6">
            <div className="space-y-2">
              <PixelLabel>{dict.home.sectionProcess}</PixelLabel>
              <h2 id="process" className="text-xl font-semibold tracking-tight">
                {dict.home.processTitle}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {process.map((step) => (
                <Card key={step.label} className="p-5" hover={false}>
                  <div className="flex items-center justify-between gap-4">
                    <PixelLabel>{step.label}</PixelLabel>
                    <span className="h-px flex-1 bg-[rgba(11,15,20,0.08)]" aria-hidden />
                  </div>
                  <p className="mt-3 text-sm font-semibold tracking-tight">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[rgba(11,15,20,0.70)]">{step.body}</p>
                </Card>
              ))}
            </div>
          </section>
        </Reveal>

        <Divider />

        <Reveal delay={0.14}>
          <section aria-labelledby="about" className="space-y-6">
            <div className="space-y-2">
              <PixelLabel>{dict.home.sectionAbout}</PixelLabel>
              <h2 id="about" className="text-xl font-semibold tracking-tight">
                {dict.home.aboutTitle}
              </h2>
            </div>

            <Card className="p-6" hover={false}>
              <p className="max-w-3xl text-sm leading-relaxed text-[rgba(11,15,20,0.75)]">
                {dict.home.aboutBody}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={localizePath('/about', locale)} className="text-sm text-ink hover:underline">
                  {dict.home.aboutLink}
                </Link>
                <span className="text-sm text-[rgba(11,15,20,0.35)]" aria-hidden>
                  ·
                </span>
                <Link href={localizePath('/projects', locale)} className="text-sm text-ink hover:underline">
                  {dict.home.caseStudiesLink}
                </Link>
              </div>
            </Card>
          </section>
        </Reveal>

        <Divider />

        <Reveal delay={0.16}>
          <section id="contact" aria-labelledby="contact-heading" className="space-y-6">
            <div className="space-y-2">
              <PixelLabel>{dict.home.sectionContact}</PixelLabel>
              <h2 id="contact-heading" className="text-xl font-semibold tracking-tight">
                {dict.home.contactTitle}
              </h2>
            </div>

            <Card className="p-6" hover={false}>
              <p className="text-sm leading-relaxed text-[rgba(11,15,20,0.70)]">
                {dict.home.contactBody}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <ButtonLink href={`mailto:${site.email}`}>
                  {dict.home.contactEmail}
                </ButtonLink>
                <ButtonLink href={site.links.linkedin} variant="secondary">
                  {dict.home.contactLinkedIn}
                </ButtonLink>
                <ButtonLink href={site.links.github} variant="secondary">
                  {dict.home.contactGitHub}
                </ButtonLink>
              </div>
              <p className="mt-4 text-xs text-[rgba(11,15,20,0.55)]">
                {dict.home.contactHint}
              </p>
            </Card>
          </section>
        </Reveal>
      </Container>
    </Blueprint>
  )
}
