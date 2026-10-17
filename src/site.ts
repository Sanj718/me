export const site = {
  name: 'Sanjar Sobirjonov',
  role: 'Frontend engineer · Shopify Polaris',
  location: 'Ottawa, Canada',
  avatar: 'https://github.com/Sanj718.png?size=160',
  links: {
    github: 'https://github.com/Sanj718',
    x: 'https://x.com/sobsanjar',
    email: 'mailto:ssobirjonov@gmail.com',
    // Add your LinkedIn URL here and it appears in the footer automatically.
    linkedin: '',
  },
}

export type Role = {
  mark: 'polaris' | 'shopify'
  org: string
  title: string
  when: string
  note: string
}

// Newest first.
export const roles: Role[] = [
  {
    mark: 'polaris',
    org: 'Shopify',
    title: 'Polaris design system',
    when: 'Now',
    note: 'Tokens, components and the kind of API nobody has to think about.',
  },
  {
    mark: 'shopify',
    org: 'Shopify',
    title: 'Enterprise Solutions Engineering',
    when: 'Before',
    note: 'Where real requirements bend clean abstractions. Great training for design systems.',
  },
]

export type Project = { name: string; href: string; note: string; meta: string }

// Public repos only: private ones would 404 for visitors.
export const projects: Project[] = [
  {
    name: 'Claude Uz Slang',
    href: 'https://github.com/Sanj718/claude-uz-slang',
    note: 'A Claude Code output style that turns your agent into a senior dev from the streets of Tashkent.',
    meta: 'Claude Code · Shell',
  },
  {
    name: 'Shopify MiniCart JS',
    href: 'https://sanj718.github.io/Shopify-MinicartJS/',
    note: 'Drop-in slide-out mini cart for Shopify themes. Quantity indicator, custom endpoints, fully customizable.',
    meta: 'JavaScript · ★ 3',
  },
  {
    name: 'GLSL sketches',
    href: 'https://github.com/Sanj718/my-glsl',
    note: 'A playground of shader experiments. My previous site, kept for the pixels.',
    meta: 'GLSL',
  },
]

export const thoughts = [
  'a component is a promise. the API is the contract, the pixels are the receipt.',
  'tokens are the only global state i trust.',
  'agents are great at the first draft. taste is still the last mile.',
  'ship the boring primitive; let the interesting UI compose on top.',
  'if the accessibility story needs a footnote, the component is not done.',
]
