export const site = {
  name: 'Sanjar Sobirjonov',
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

// Newest first. To add an earlier chapter: add an object (mark can be 'shopify' or 'polaris';
// extend Marks.tsx for a new monogram).
export const roles: Role[] = [
  {
    mark: 'polaris',
    org: 'Shopify · Polaris',
    title: 'Design systems engineer',
    when: 'Now',
    note: 'Building the system Shopify’s UI is made of: tokens, components, and the kind of API nobody has to think about.',
  },
  {
    mark: 'shopify',
    org: 'Shopify',
    title: 'Enterprise Solutions Engineering',
    when: 'Before',
    note: 'The messy, high-stakes end of the platform. Learned how real requirements bend clean abstractions, which turns out to be great design-system training.',
  },
]

export const thoughts = [
  'a component is a promise. the API is the contract, the pixels are the receipt.',
  'tokens are the only global state i trust.',
  'agents are great at the first draft. taste is still the last mile.',
  'ship the boring primitive; let the interesting UI compose on top.',
  'if the accessibility story needs a footnote, the component is not done.',
]
