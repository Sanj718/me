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
  return (
    <Section id="experience" title="Experience">
      <ol className="-mx-3 space-y-1">
        {experience.filter((c) => !c.hidden).map((c) => (
          <li key={c.name}>
            <CompanyRow c={c} />
          </li>
        ))}
      </ol>
    </Section>
  )
}
