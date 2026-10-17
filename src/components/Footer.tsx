import { site } from '../site'

export function Footer() {
  const links = [
    { label: 'GitHub', href: site.links.github },
    { label: 'LinkedIn', href: site.links.linkedin },
    { label: 'X', href: site.links.x },
    { label: 'Email', href: site.links.email },
  ].filter((l) => l.href)
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Social links" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="link pb-0.5">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="flex items-center gap-2 font-mono text-xs text-mute">
          <span className="pulse h-2 w-2 rounded-full bg-accent" aria-hidden />
          Active: wrangling design tokens &amp; local agentic workflows
        </p>
      </div>
      <p className="mx-auto max-w-5xl px-5 pb-8 text-xs text-mute/70">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  )
}
