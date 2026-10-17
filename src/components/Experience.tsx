import { roles } from '../site'
import { Mark } from './Marks'
import { Reveal } from './Reveal'

export function Experience() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-20" aria-labelledby="where">
      <Reveal>
        <h2 id="where" className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
          Where I’ve been
        </h2>
      </Reveal>
      <ol className="mt-8 border-l border-line">
        {roles.map((r, i) => (
          <li key={r.org + r.title} className="relative pb-10 pl-8 last:pb-0">
            <span className="absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full bg-line ring-4 ring-ink" />
            <Reveal delay={i * 100}>
              <div className="group flex gap-4 rounded-xl border border-transparent p-3 transition hover:border-line hover:bg-panel">
                <div className="shrink-0 transition group-hover:-rotate-3 group-hover:scale-105">
                  <Mark kind={r.mark} />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-medium">{r.org}</h3>
                    <span className="font-mono text-xs text-accent">{r.when}</span>
                  </div>
                  <p className="text-sm text-mute">{r.title}</p>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-fg/80">{r.note}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
