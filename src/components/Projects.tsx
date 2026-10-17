import { projects } from '../site'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="made" title="Things I’ve made">
      <ul className="-mx-3">
        {projects.map((p) => (
          <li key={p.name}>
            <a href={p.href} target="_blank" rel="noreferrer" className="group block rounded-lg p-3 transition hover:bg-panel">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-medium transition group-hover:text-accent">
                  {p.name}
                  <span aria-hidden className="ml-1 inline-block transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
                <span className="shrink-0 font-mono text-xs text-mute">{p.meta}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-mute">{p.note}</p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
