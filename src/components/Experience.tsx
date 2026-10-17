import { useLayoutEffect, useRef, useState } from 'react'
import { duration, formatMonth } from '../duration'
import { experience, type Company, type Position } from '../site'
import { Logo } from './Marks'
import { Section } from './Section'

function Details({ p }: { p: Position }) {
  return (
    <>
      <p className="text-sm text-mute">
        {formatMonth(p.start)} – {p.end ? formatMonth(p.end) : 'Present'} · {duration(p.start, p.end)}
      </p>
      {p.location && <p className="text-sm text-mute">{p.location}</p>}
      {p.summary && <p className="mt-2 text-sm leading-relaxed text-fg/80">{p.summary}</p>}
      {p.bullets && (
        <ul className="mt-2 space-y-1 text-sm leading-relaxed text-fg/80">
          {p.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-mute">•</span>
              {b}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

function CompanyEntry({ c }: { c: Company }) {
  // Single role: title leads, company underneath (LinkedIn style).
  if (c.positions.length === 1) {
    const p = c.positions[0]
    return (
      <div className="flex gap-4">
        <Logo kind={c.logo} name={c.name} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm">
            {c.name} · {c.type}
          </p>
          <Details p={p} />
        </div>
      </div>
    )
  }

  // Several roles: company leads with total tenure, roles on a connected timeline.
  const first = c.positions[c.positions.length - 1]
  const last = c.positions[0]
  return (
    <div>
      <div className="flex gap-4">
        <Logo kind={c.logo} name={c.name} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">{c.name}</h3>
          <p className="text-sm">
            {c.type} · {duration(first.start, last.end)}
          </p>
          {c.location && <p className="text-sm text-mute">{c.location}</p>}
        </div>
      </div>
      <ol className="mt-3">
        {c.positions.map((p, i) => (
          <li key={p.title} className="relative flex gap-4">
            <div className="relative flex w-12 shrink-0 justify-center">
              <span className="mt-2 h-2 w-2 rounded-full bg-mute/60" />
              {i < c.positions.length - 1 && <span className="absolute bottom-0 top-5 w-px bg-line" />}
            </div>
            <div className="min-w-0 flex-1 pb-5">
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="font-semibold">{p.title}</h4>
                {!p.end && (
                  <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[11px] text-accent">Present</span>
                )}
              </div>
              <Details p={p} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function Experience() {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState<number | null>(null)
  const [full, setFull] = useState(0)
  const list = useRef<HTMLOListElement>(null)
  const teaser = useRef<HTMLLIElement>(null)

  // Collapsed view: first company fully, plus the top half of the second.
  useLayoutEffect(() => {
    const el = list.current
    const t = teaser.current
    if (!el || !t) return
    const measure = () => {
      setCollapsed(t.offsetTop + t.offsetHeight / 2)
      setFull(el.scrollHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const hidden = experience.length - 1
  return (
    <Section id="experience" title="Experience">
      <div className="relative">
        <ol
          ref={list}
          className="overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
          style={{ maxHeight: open || collapsed === null ? full || undefined : collapsed }}
        >
          {experience.map((c, i) => (
            <li
              key={c.name}
              ref={i === 1 ? teaser : undefined}
              inert={!open && i > 0}
              className={i > 0 ? 'mt-2 border-t border-line pt-6' : ''}
            >
              <CompanyEntry c={c} />
            </li>
          ))}
        </ol>
        {!open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
        )}
      </div>
      {hidden > 0 && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="mt-3 w-full rounded-lg border border-line py-2.5 text-sm font-medium text-mute transition hover:border-accent hover:text-accent"
        >
          {open ? 'Show less' : `Show all experience (${experience.length})`}
          <span aria-hidden className={`ml-1.5 inline-block transition ${open ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </button>
      )}
    </Section>
  )
}
