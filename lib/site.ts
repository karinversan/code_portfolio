export const site = {
  name: 'Your Name',
  title: 'Machine Learning Engineer',
  description:
    'I build reliable ML systems that ship: from data to deployment, with measurable impact.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  locale: 'en_US',
  email: 'you@example.com',
  links: {
    github: 'https://github.com/your-handle',
    linkedin: 'https://www.linkedin.com/in/your-handle',
    twitter: 'https://x.com/your-handle',
  },
} as const

export const marketing = {
  heroLine:
    'Production ML from idea to impact — modeling, evaluation, and MLOps that stays fast in the real world.',
  ctas: {
    projects: '/projects',
    blog: '/blog',
    contact: '#contact',
    cv: '/cv.pdf',
  },
} as const
