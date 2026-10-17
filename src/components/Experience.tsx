import { useState } from 'react'
import { duration } from '../duration'
import { experience, type Company } from '../site'
import { Logo } from './Marks'
import { Section } from './Section'

const year = (ym: string) => ym.slice(0, 4)

// One row per company: latest role and total time there.
function CompanyRow({ c }: { c: Company }) {
  const latest = c.positions[0]
  const first = c.positions[c.positions.length - 1]
  return (
    <div className="flex items-center gap-4 rounded-lg p-3 transition hover:bg-panel">
      <Logo kind={c.logo} name={c.name} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">{c.name}</h3>
        <p className="truncate text-sm text-mute">{latest.title}</p>
      </div>
      <div className="shrink-0 text-right font-mono text-xs text-mute">
        <p>
          {year(first.start)} — {latest.end ? year(latest.end) : 'Now'}
        </p>
        <p className="mt-0.5">{duration(first.start, latest.end)}</p>
      </div>
    </div>
  )
}

export function Experience() {
  const [open, setOpen] = useState(false)
  const shown = experience.filter((c) => !c.hidden)
  const earlier = experience.filter((c) => c.hidden)
  return (
    <Section id="experience" title="Experience">
      <ol className="-mx-3 space-y-1">
        {shown.map((c) => (
          <li key={c.name}>
            <CompanyRow c={c} />
          </li>
        ))}
      </ol>
      {earlier.length > 0 && (
        <>
          {/* grid-rows 0fr -> 1fr animates to the content's natural height */}
          <div
            id="earlier-experience"
            inert={!open}
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
              open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <ol className="-mx-3 space-y-1 overflow-hidden">
              {earlier.map((c, i) => (
                <li key={c.name} className={i === 0 ? 'pt-1' : ''}>
                  <CompanyRow c={c} />
                </li>
              ))}
            </ol>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="earlier-experience"
            onClick={() => setOpen((o) => !o)}
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-mute transition hover:text-accent"
          >
            {open ? 'Show less' : `Show earlier experience (${earlier.length})`}
            <span aria-hidden className={`inline-block transition ${open ? 'rotate-180' : ''}`}>
              ↓
            </span>
          </button>
        </>
      )}
    </Section>
  )
}
