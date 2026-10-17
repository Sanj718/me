import { roles } from '../site'
import { Mark } from './Marks'
import { Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ul className="-mx-3">
        {roles.map((r) => (
          <li key={r.title} className="flex gap-4 rounded-lg p-3 transition hover:bg-panel">
            <Mark kind={r.mark} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium">
                  {r.title} <span className="text-mute">· {r.org}</span>
                </p>
                <span className="shrink-0 font-mono text-xs text-mute">{r.when}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-mute">{r.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
