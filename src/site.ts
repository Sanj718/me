export const site = {
  name: 'Sanjar Sobirjonov',
  role: 'Senior Engineer · Shopify Polaris',
  location: 'Ottawa, Canada',
  avatar: 'https://github.com/Sanj718.png?size=160',
  links: {
    github: 'https://github.com/Sanj718',
    x: 'https://x.com/sobsanjar',
    email: 'mailto:ssobirjonov@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sanjarsob/',
  },
}

export type Position = {
  title: string
  start: string // 'YYYY-MM'
  end?: string // omitted = present
  location?: string
  summary?: string
  bullets?: string[]
}

export type Company = {
  name: string
  logo: 'shopify' | 'avex' | 'sab' | 'bigd'
  type: string
  location?: string
  positions: Position[] // newest first
}

// Source: LinkedIn experience, newest first.
export const experience: Company[] = [
  {
    name: 'Shopify',
    logo: 'shopify',
    type: 'Full-time',
    location: 'Ottawa, Ontario, Canada · Remote',
    positions: [
      { title: 'Senior Engineer – Polaris', start: '2026-09' },
      { title: 'Senior Solutions Engineer', start: '2024-10', end: '2026-09' },
    ],
  },
  {
    name: 'Avex E-commerce',
    logo: 'avex',
    type: 'Full-time',
    positions: [
      { title: 'Head of Development Department', start: '2022-01', end: '2024-10', location: 'New York, United States' },
      {
        title: 'Senior Frontend/Shopify Developer',
        start: '2019-12',
        end: '2021-12',
        location: 'New York City Metropolitan Area',
        summary:
          'Frontend web developer responsible for end-to-end web app development, React (Next.js or Gatsby) for frontend projects, and Contentful for content management.',
        bullets: [
          'Full JAMstack builds with Next.js/Gatsby and Contentful CMS',
          'Headless commerce with Shopify + Shogun + React',
          'Shopify theme development and WordPress projects',
          'Shopify app development',
        ],
      },
    ],
  },
  {
    name: 'SAB Games',
    logo: 'sab',
    type: 'Full-time',
    positions: [
      {
        title: 'Full Stack Developer',
        start: '2017-12',
        end: '2019-06',
        location: 'Tashkent',
        summary: 'End-to-end web app development: Yii2 PHP backend, Vue and React frontends, PostgreSQL.',
        bullets: [
          'API, backend, frontend and admin panel for an e-commerce web app',
          'Frontend work in Vue, Nuxt.js, React and Redux',
          'Built a crawler that assembled a database of 20,000+ offers',
        ],
      },
    ],
  },
  {
    name: 'Big D Creative',
    logo: 'bigd',
    type: 'Full-time',
    positions: [
      {
        title: 'Web Developer',
        start: '2016-05',
        end: '2017-11',
        location: 'Dallas-Fort Worth Metroplex',
        summary: 'Built reusable WordPress templates that doubled productivity, created an SEO plugin, and supported Drupal, Joomla and PHP projects.',
        bullets: [
          'Mobile-adaptive frontends in plain HTML/CSS/JS',
          'Integrated frontends with WordPress CMS',
          'Managed servers, domains and MySQL databases',
        ],
      },
    ],
  },
]

export type Project = { name: string; href: string; note: string; meta: string }

// Intentionally empty until real projects are provided; the section is hidden while empty.
export const projects: Project[] = []

export const thoughts = [
  'a component is a promise. the API is the contract, the pixels are the receipt.',
  'tokens are the only global state i trust.',
  'agents are great at the first draft. taste is still the last mile.',
  'ship the boring primitive; let the interesting UI compose on top.',
  'if the accessibility story needs a footnote, the component is not done.',
]
