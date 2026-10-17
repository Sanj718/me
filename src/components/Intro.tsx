import { useState } from 'react'
import { site } from '../site'

export function Intro() {
  const [avatarOk, setAvatarOk] = useState(true)
  return (
    <header>
      <div className="flex items-center gap-4">
        {avatarOk ? (
          <img
            src={site.avatar}
            alt=""
            width={56}
            height={56}
            onError={() => setAvatarOk(false)}
            className="h-14 w-14 rounded-full border border-line object-cover"
          />
        ) : (
          <div className="grid h-14 w-14 place-items-center rounded-full border border-line bg-panel font-mono text-sm">SS</div>
        )}
        <div>
          <h1 className="text-lg font-semibold tracking-tight">{site.name}</h1>
          <p className="text-sm text-mute">{site.role}</p>
        </div>
      </div>
      <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-fg/85">
        <p>
          Hi, I’m Sanjar. I’m a senior engineer on Shopify’s <span className="text-fg">Polaris</span> team, working on
          the design system that Shopify’s UI is built from. Before that I was a Solutions Engineer at Shopify, and
          before that I led development at Avex E-commerce.
        </p>
        <p>
          Lately I’m deep into <span className="text-accent">agentic development</span>: local models, CLI tooling, and
          letting agents take the first draft so I can spend my time on the details. Based in {site.location}.
        </p>
      </div>
    </header>
  )
}
