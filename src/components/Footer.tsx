import { site } from '../site'

export function Footer() {
  const links = [
    { label: 'GitHub', href: site.links.github },
    { label: 'LinkedIn', href: site.links.linkedin },
    { label: 'X', href: site.links.x },
    { label: 'Email', href: site.links.email },
  ].filter((l) => l.href)
  return (
    <footer className="mt-16 border-t border-line pt-8">
      <nav aria-label="Social links" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {links.map((l) => (
          <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="link pb-0.5">
            {l.label}
          </a>
        ))}
      </nav>
      <p className="mt-6 flex items-center gap-2 font-mono text-xs text-mute">
        <span className="pulse h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
        Active: wrangling design tokens &amp; local agentic workflows
      </p>
      <p className="mt-3 text-xs text-mute">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  )
}
