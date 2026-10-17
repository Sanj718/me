import { type ReactNode } from 'react'
import { Reveal } from './Reveal'

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-16">
      <Reveal>
        <h2 id={id} className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-mute">
          {title}
        </h2>
        {children}
      </Reveal>
    </section>
  )
}
