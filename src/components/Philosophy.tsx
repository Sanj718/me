import { Reveal } from './Reveal'

const items = [
  { k: 'Craft', t: 'Details compound. Focus rings, easing curves, token names: the things users feel without noticing.' },
  { k: 'Agents', t: 'Agentic development changed my loop. I describe intent, review diffs, and spend my taste where it matters.' },
  { k: 'Local + CLI', t: 'Local models and terminal tooling keep the loop fast, private and scriptable.' },
]

export function Philosophy() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-20" aria-labelledby="craft">
      <Reveal>
        <h2 id="craft" className="font-mono text-xs uppercase tracking-[0.2em] text-mute">
          Craft meets agents
        </h2>
        <p className="mt-6 max-w-2xl text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
          High-craft UI is a design problem. Agents make it an <span className="text-accent">iteration-speed</span> problem.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.k} delay={i * 100}>
            <div className="h-full rounded-xl border border-line bg-panel p-5 transition hover:-translate-y-0.5 hover:border-accent/60">
              <h3 className="font-mono text-sm text-accent">{it.k}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg/80">{it.t}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
