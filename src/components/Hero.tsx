import { type PointerEvent } from 'react'
import { site } from '../site'
import { Terminal } from './Terminal'

export function Hero() {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <header
      onPointerMove={onMove}
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(500px circle at var(--x, 70%) var(--y, 20%), color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 60%)',
      }}
    >
      <div className="mx-auto max-w-5xl px-5 pb-20 pt-20 sm:pt-28">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-mute">
          <span className="text-accent">●</span> {site.name}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Design systems by day.
          <br />
          <span className="text-accent">Agentic workflows</span> by night
          <span className="caret text-accent">_</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-mute">
          Frontend engineer on Shopify’s Polaris team. I sweat the tokens, the APIs and the easing curves, then hand the
          boring parts to agents.
        </p>
        <div className="mt-12 max-w-2xl">
          <Terminal />
        </div>
      </div>
    </header>
  )
}
