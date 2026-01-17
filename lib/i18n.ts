export type Locale = 'en' | 'ru'

export const locales: Locale[] = ['en', 'ru']
export const defaultLocale: Locale = 'en'

export function normalizeLocale(input?: string | null): Locale {
  if (!input) return defaultLocale
  const value = input.toLowerCase()
  if (value.startsWith('ru')) return 'ru'
  return defaultLocale
}

export function getLocaleConfig(locale: Locale) {
  return {
    languageTag: locale === 'ru' ? 'ru-RU' : 'en-US',
    openGraphLocale: locale === 'ru' ? 'ru_RU' : 'en_US',
  }
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const [, segment] = pathname.split('/')
  return locales.includes(segment as Locale) ? (segment as Locale) : null
}

export function stripLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname)
  if (!locale) return pathname
  const stripped = pathname.replace(`/${locale}`, '')
  return stripped === '' ? '/' : stripped
}

export function localizePath(pathname: string, locale: Locale): string {
  if (!pathname.startsWith('/')) return pathname
  if (pathname === '/') return `/${locale}`
  if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) return pathname
  return `/${locale}${pathname}`
}

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends Array<infer U>
        ? Array<Widen<U>>
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T

const en = {
  site: {
    title: 'Machine Learning Engineer',
    description:
      'I build reliable ML systems that ship: from data to deployment, with measurable impact.',
  },
  nav: {
    home: 'Home',
    projects: 'Projects',
    blog: 'Blog',
    about: 'About',
  },
  header: {
    figureLabel: 'FIG 001',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  footer: {
    sectionLabel: 'SECTION 09 — END',
    builtWith: 'Built with Next.js, TypeScript, and MDX.',
    privacy: 'Privacy',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  skipLink: 'Skip to content',
  buttons: {
    viewProjects: 'View Projects',
    readBlog: 'Read Blog',
    contact: 'Contact',
    downloadCv: 'Download CV',
    home: 'Home',
    projects: 'Projects',
    blog: 'Blog',
  },
  home: {
    sectionOverview: 'SECTION 01 — OVERVIEW',
    heroLine:
      'Production ML from idea to impact — modeling, evaluation, and MLOps that stays fast in the real world.',
    chips: ['Production ML', 'Offline + online evaluation', 'Fast inference', 'Observability'],
    sectionFeatured: 'SECTION 02',
    featuredTitle: 'Featured Projects',
    viewAll: 'View all',
    addProjectsHint: 'Add projects in',
    sectionArticles: 'SECTION 03',
    latestTitle: 'Latest Articles',
    sectionSkills: 'SECTION 04',
    skillsTitle: 'Skills / Stack',
    kitLabel: 'KIT',
    sectionProcess: 'PROCESS',
    processTitle: 'How I work',
    sectionAbout: 'SECTION 06',
    aboutTitle: 'About',
    aboutBody:
      'I focus on ML that holds up in production: strong baselines, clean evaluation, and a deployment story that survives real traffic. I like problems where the outcome is measurable — quality, latency, cost, and the human experience of the product.',
    aboutLink: 'More about me',
    caseStudiesLink: 'Case studies',
    sectionContact: 'SECTION 07',
    contactTitle: 'Contact',
    contactBody: 'Want to collaborate, hire, or chat ML systems? Email is best.',
    contactEmail: 'Email me',
    contactLinkedIn: 'LinkedIn',
    contactGitHub: 'GitHub',
    contactHint:
      'Prefer a quick intro? Include context, constraints, and what success looks like.',
    skills: {
      ML: ['PyTorch', 'Transformers', 'Evaluation', 'Experiment tracking'],
      MLOps: ['Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
      Data: ['SQL', 'Spark', 'Feature stores', 'Data quality'],
      Backend: ['TypeScript', 'Python', 'FastAPI', 'Postgres'],
    },
    process: [
      {
        label: '01 — Brief',
        title: 'Define the success metric',
        body: 'Clarify constraints (latency, cost, risk) and create an evaluation plan that matches the real user journey.',
      },
      {
        label: '02 — Modeling',
        title: 'Build the simplest reliable baseline',
        body: 'Start with strong baselines and clean data contracts; iterate only where the metric is sensitive.',
      },
      {
        label: '03 — Iteration',
        title: 'Ship improvements with guardrails',
        body: 'A/B tests, offline/online parity checks, and monitoring to catch drift and regressions.',
      },
      {
        label: '04 — Delivery',
        title: 'Productionize and document',
        body: 'Make it maintainable: observability, runbooks, dashboards, and a clear ownership story.',
      },
    ],
  },
  about: {
    metadata: {
      title: 'About',
      description:
        'Background, experience, and how I approach machine learning engineering.',
    },
    sectionLabel: 'SECTION 04 — ABOUT',
    title: 'About',
    intro:
      'I build ML systems with a strong product loop: define success, measure honestly, ship iteratively, and keep it healthy in production.',
    timeline: [
      {
        period: '2025 — Present',
        title: 'Machine Learning Engineer',
        body: 'Focused on recommendation quality, evaluation systems, and production inference performance. Built tooling to reduce iteration time while improving reliability.',
        highlights: ['Offline/online parity', 'Latency + cost budgets', 'Monitoring + drift alerts'],
      },
      {
        period: '2023 — 2025',
        title: 'Applied Scientist / ML Engineer',
        body: 'Shipped NLP systems and retrieval pipelines. Partnered with product and data teams to turn research prototypes into stable services.',
        highlights: ['RAG + re-ranking', 'Human-in-the-loop labeling', 'Experiment design'],
      },
      {
        period: 'Earlier',
        title: 'Data + Systems foundation',
        body: 'Built data products and backend services. This is where my obsession with reliability and observability started.',
        highlights: ['Data contracts', 'CI/CD', 'Service ownership'],
      },
    ],
    selectedLabel: 'SELECTED',
    optimizeTitle: 'What I optimize for',
    optimize: [
      {
        title: 'Impact',
        body: 'Measurable improvements: quality, conversion, time saved, or risk reduced.',
      },
      {
        title: 'Reliability',
        body: 'Monitoring, drift detection, and graceful degradation paths.',
      },
      {
        title: 'Performance',
        body: 'Latency and cost budgets so the system scales with real traffic.',
      },
      {
        title: 'DX',
        body: 'Tooling that makes iteration faster without breaking reproducibility.',
      },
    ],
    updateHint: 'Update your profile details in',
  },
  blog: {
    metadata: {
      title: 'Blog',
      description:
        'Notes on ML engineering: evaluation, LLM systems, and shipping models to production.',
    },
    sectionLabel: 'SECTION 03 — BLOG',
    title: 'Blog',
    description:
      'Practical write-ups on ML systems, modeling trade-offs, and performance constraints.',
    rssLabel: 'RSS',
  },
  projects: {
    metadata: {
      title: 'Projects',
      description:
        'Selected machine learning case studies: problem, approach, and measured results.',
    },
    sectionLabel: 'SECTION 02 — PROJECTS',
    title: 'Projects',
    description:
      'Case studies focused on measurable outcomes: quality, latency, reliability, and cost.',
  },
  postsExplorer: {
    searchLabel: 'SEARCH',
    searchPlaceholder: 'Search title or summary…',
    sortLabel: 'SORT',
    sortNewest: 'Newest',
    sortOldest: 'Oldest',
    tagsLabel: 'TAGS',
    clear: 'Clear',
    all: 'All',
    empty: 'No posts match your filters.',
  },
  projectsExplorer: {
    searchLabel: 'SEARCH',
    searchPlaceholder: 'Search title or summary…',
    filterLabel: 'FILTER',
    all: 'All',
    empty: 'No projects match your filters.',
  },
  toc: {
    contents: 'CONTENTS',
    current: 'CURRENT',
    jumpToSection: 'Jump to section',
  },
  blogPost: {
    articleLabel: 'ARTICLE',
    allPosts: 'All posts',
    previousLabel: 'PREVIOUS',
    nextLabel: 'NEXT',
    noPrevious: 'No previous post',
    noNext: 'No next post',
    relatedLabel: 'RELATED',
    relatedTitle: 'Related posts',
    postNavigation: 'Post navigation',
    ogSubtitle: 'Blog post',
  },
  projectDetail: {
    caseStudyLabel: 'CASE STUDY',
    keyMetrics: 'KEY METRICS',
    links: {
      github: 'GitHub',
      demo: 'Demo',
      writeUp: 'Write-up',
    },
    moreLinks: 'MORE LINKS',
    canonical: 'Canonical',
    allProjects: 'All projects',
    sectionLabel: 'SECTION',
    moreProjects: 'More projects',
    ogSubtitle: 'Project case study',
  },
  breadcrumbs: {
    ariaLabel: 'Breadcrumb',
    home: 'Home',
    blog: 'Blog',
    projects: 'Projects',
  },
  notFound: {
    label: 'ERROR 404',
    title: 'Page not found',
    description: 'The blueprint doesn’t include this page. Try the main sections below.',
    backPrefix: 'Or go back to',
    backLink: 'the overview',
  },
  privacy: {
    metadata: {
      title: 'Privacy',
      description: 'Privacy policy placeholder for this portfolio site.',
    },
    sectionLabel: 'SECTION — PRIVACY',
    title: 'Privacy',
    intro:
      'This is a simple placeholder. Customize it based on your analytics and cookie usage.',
    body: [
      'By default, this site does not use cookies. If you enable optional analytics (Vercel Analytics / Speed Insights), data collection follows Vercel’s policies and is limited to aggregated performance metrics.',
      'If you add third-party scripts, update this page with the exact services used and how visitors can opt out.',
    ],
  },
  mdx: {
    figureLabel: 'FIG',
    noteLabel: 'NOTE',
  },
  og: {
    defaultTitle: 'Portfolio',
    defaultSubtitle: 'Machine Learning Engineer',
    figureLabel: 'FIG 001',
    footer: 'ink blue • blueprint notes • production ML',
  },
} as const

export type Dictionary = Widen<typeof en>

const ru: Dictionary = {
  site: {
    title: 'Инженер по машинному обучению',
    description:
      'Я создаю надежные ML-системы, которые доходят до продакшена: от данных до деплоя, с измеримым эффектом.',
  },
  nav: {
    home: 'Главная',
    projects: 'Проекты',
    blog: 'Блог',
    about: 'Обо мне',
  },
  header: {
    figureLabel: 'FIG 001',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  footer: {
    sectionLabel: 'РАЗДЕЛ 09 — КОНЕЦ',
    builtWith: 'Сделано на Next.js, TypeScript и MDX.',
    privacy: 'Конфиденциальность',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  skipLink: 'Перейти к содержимому',
  buttons: {
    viewProjects: 'Проекты',
    readBlog: 'Читать блог',
    contact: 'Связаться',
    downloadCv: 'Скачать CV',
    home: 'Главная',
    projects: 'Проекты',
    blog: 'Блог',
  },
  home: {
    sectionOverview: 'РАЗДЕЛ 01 — ОБЗОР',
    heroLine:
      'Production ML от идеи до эффекта — моделирование, оценка и MLOps, которые остаются быстрыми в реальном мире.',
    chips: ['Production ML', 'Офлайн + онлайн оценка', 'Быстрый инференс', 'Наблюдаемость'],
    sectionFeatured: 'РАЗДЕЛ 02',
    featuredTitle: 'Избранные проекты',
    viewAll: 'Смотреть все',
    addProjectsHint: 'Добавьте проекты в',
    sectionArticles: 'РАЗДЕЛ 03',
    latestTitle: 'Свежие статьи',
    sectionSkills: 'РАЗДЕЛ 04',
    skillsTitle: 'Навыки / стек',
    kitLabel: 'НАБОР',
    sectionProcess: 'ПРОЦЕСС',
    processTitle: 'Как я работаю',
    sectionAbout: 'РАЗДЕЛ 06',
    aboutTitle: 'Обо мне',
    aboutBody:
      'Я фокусируюсь на ML, который выдерживает продакшен: сильные бейзлайны, чистая оценка и история деплоя, переживающая реальный трафик. Мне нравятся задачи с измеримым результатом — качество, задержка, стоимость и опыт пользователя.',
    aboutLink: 'Подробнее обо мне',
    caseStudiesLink: 'Кейсы',
    sectionContact: 'РАЗДЕЛ 07',
    contactTitle: 'Контакты',
    contactBody: 'Хотите сотрудничать, нанять или обсудить ML-системы? Лучше всего по почте.',
    contactEmail: 'Написать письмо',
    contactLinkedIn: 'LinkedIn',
    contactGitHub: 'GitHub',
    contactHint:
      'Нужен короткий интро? Укажите контекст, ограничения и как выглядит успех.',
    skills: {
      ML: ['PyTorch', 'Transformers', 'Оценка', 'Отслеживание экспериментов'],
      MLOps: ['Docker', 'Kubernetes', 'CI/CD', 'Мониторинг'],
      Data: ['SQL', 'Spark', 'Хранилища фичей', 'Качество данных'],
      Backend: ['TypeScript', 'Python', 'FastAPI', 'Postgres'],
    },
    process: [
      {
        label: '01 — Бриф',
        title: 'Определить метрику успеха',
        body: 'Прояснить ограничения (задержка, стоимость, риск) и составить план оценки, соответствующий реальному пути пользователя.',
      },
      {
        label: '02 — Моделирование',
        title: 'Собрать самый простой надежный бейзлайн',
        body: 'Начать с сильных бейзлайнов и чистых контрактов данных; улучшать только там, где метрика чувствительна.',
      },
      {
        label: '03 — Итерации',
        title: 'Выкатывать улучшения с ограничителями',
        body: 'A/B-тесты, проверки офлайн/онлайн паритета и мониторинг для выявления дрейфа и регрессий.',
      },
      {
        label: '04 — Продакшн',
        title: 'Довести до продакшена и документировать',
        body: 'Сделать поддерживаемым: наблюдаемость, runbooks, дашборды и понятная ответственность.',
      },
    ],
  },
  about: {
    metadata: {
      title: 'Обо мне',
      description: 'Опыт, бэкграунд и подход к инженерии машинного обучения.',
    },
    sectionLabel: 'РАЗДЕЛ 04 — ОБО МНЕ',
    title: 'Обо мне',
    intro:
      'Я строю ML-системы с сильной продуктовой петлей: определить успех, честно измерить, итеративно улучшать и держать здоровыми в продакшене.',
    timeline: [
      {
        period: '2025 — Present',
        title: 'Инженер по машинному обучению',
        body: 'Фокус на качестве рекомендаций, системах оценки и производительности инференса. Построил инструменты, сокращающие время итераций при росте надежности.',
        highlights: ['Офлайн/онлайн паритет', 'Бюджеты по задержке и стоимости', 'Мониторинг и алерты дрейфа'],
      },
      {
        period: '2023 — 2025',
        title: 'Прикладной исследователь / ML инженер',
        body: 'Запустил NLP-системы и пайплайны извлечения. Вместе с продуктом и данными превращал прототипы в стабильные сервисы.',
        highlights: ['RAG и переранжирование', 'Разметка с участием человека', 'Дизайн экспериментов'],
      },
      {
        period: 'Earlier',
        title: 'Фундамент в данных и системах',
        body: 'Создавал дата-продукты и бэкенд-сервисы. Здесь началась моя одержимость надежностью и наблюдаемостью.',
        highlights: ['Контракты данных', 'CI/CD', 'Ответственность за сервис'],
      },
    ],
    selectedLabel: 'ВЫБОРКА',
    optimizeTitle: 'Что я оптимизирую',
    optimize: [
      {
        title: 'Влияние',
        body: 'Измеримые улучшения: качество, конверсия, экономия времени или снижение риска.',
      },
      {
        title: 'Надежность',
        body: 'Мониторинг, детекция дрейфа и сценарии деградации.',
      },
      {
        title: 'Производительность',
        body: 'Бюджеты по задержке и стоимости, чтобы система масштабировалась на реальном трафике.',
      },
      {
        title: 'DX',
        body: 'Инструменты, которые ускоряют итерации без потери воспроизводимости.',
      },
    ],
    updateHint: 'Обновите данные профиля в',
  },
  blog: {
    metadata: {
      title: 'Блог',
      description:
        'Заметки об ML-инженерии: оценка, LLM-системы и вывод моделей в продакшен.',
    },
    sectionLabel: 'РАЗДЕЛ 03 — БЛОГ',
    title: 'Блог',
    description:
      'Практические заметки о ML-системах, компромиссах в моделировании и ограничениях производительности.',
    rssLabel: 'RSS',
  },
  projects: {
    metadata: {
      title: 'Проекты',
      description:
        'Избранные ML-кейсы: задача, подход и измеримые результаты.',
    },
    sectionLabel: 'РАЗДЕЛ 02 — ПРОЕКТЫ',
    title: 'Проекты',
    description:
      'Кейсы с фокусом на измеримые результаты: качество, задержка, надежность и стоимость.',
  },
  postsExplorer: {
    searchLabel: 'ПОИСК',
    searchPlaceholder: 'Поиск по заголовку или описанию…',
    sortLabel: 'СОРТИРОВКА',
    sortNewest: 'Сначала новые',
    sortOldest: 'Сначала старые',
    tagsLabel: 'ТЕГИ',
    clear: 'Сбросить',
    all: 'Все',
    empty: 'Нет постов, соответствующих фильтрам.',
  },
  projectsExplorer: {
    searchLabel: 'ПОИСК',
    searchPlaceholder: 'Поиск по заголовку или описанию…',
    filterLabel: 'ФИЛЬТР',
    all: 'Все',
    empty: 'Нет проектов, соответствующих фильтрам.',
  },
  toc: {
    contents: 'СОДЕРЖАНИЕ',
    current: 'ТЕКУЩЕЕ',
    jumpToSection: 'Перейти к разделу',
  },
  blogPost: {
    articleLabel: 'СТАТЬЯ',
    allPosts: 'Все посты',
    previousLabel: 'ПРЕДЫДУЩИЙ',
    nextLabel: 'СЛЕДУЮЩИЙ',
    noPrevious: 'Нет предыдущего поста',
    noNext: 'Нет следующего поста',
    relatedLabel: 'ПОХОЖИЕ',
    relatedTitle: 'Похожие посты',
    postNavigation: 'Навигация по постам',
    ogSubtitle: 'Пост блога',
  },
  projectDetail: {
    caseStudyLabel: 'КЕЙС',
    keyMetrics: 'КЛЮЧЕВЫЕ МЕТРИКИ',
    links: {
      github: 'GitHub',
      demo: 'Демо',
      writeUp: 'Описание',
    },
    moreLinks: 'ДОП. ССЫЛКИ',
    canonical: 'Канонический URL',
    allProjects: 'Все проекты',
    sectionLabel: 'РАЗДЕЛ',
    moreProjects: 'Еще проекты',
    ogSubtitle: 'Кейс проекта',
  },
  breadcrumbs: {
    ariaLabel: 'Навигация по хлебным крошкам',
    home: 'Главная',
    blog: 'Блог',
    projects: 'Проекты',
  },
  notFound: {
    label: 'ОШИБКА 404',
    title: 'Страница не найдена',
    description: 'Этого раздела нет в чертежах. Попробуйте основные разделы ниже.',
    backPrefix: 'Или вернитесь на',
    backLink: 'обзор',
  },
  privacy: {
    metadata: {
      title: 'Конфиденциальность',
      description: 'Заглушка политики конфиденциальности для этого портфолио.',
    },
    sectionLabel: 'РАЗДЕЛ — КОНФИДЕНЦИАЛЬНОСТЬ',
    title: 'Конфиденциальность',
    intro:
      'Это простая заглушка. Настройте ее под ваши аналитические и cookie-настройки.',
    body: [
      'По умолчанию сайт не использует cookies. Если включить опциональную аналитику (Vercel Analytics / Speed Insights), сбор данных следует политике Vercel и ограничивается агрегированными метриками производительности.',
      'Если вы добавите сторонние скрипты, обновите эту страницу, указав точные сервисы и способы отказа от сбора данных.',
    ],
  },
  mdx: {
    figureLabel: 'РИС',
    noteLabel: 'ПРИМЕЧАНИЕ',
  },
  og: {
    defaultTitle: 'Портфолио',
    defaultSubtitle: 'Инженер по машинному обучению',
    figureLabel: 'РИС 001',
    footer: 'ink blue • blueprint notes • production ML',
  },
}

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  ru,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
