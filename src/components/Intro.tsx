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
          <h1 className="text-lg font-semibold tracking-tight">{site.shortName}</h1>
          <p className="text-sm text-mute">{site.role}</p>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-mute">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {site.location}
          </p>
        </div>
      </div>
      <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-fg/85">
        <p>
          Hi, I’m Sanjar. I’m an engineer on Shopify’s <span className="text-fg">Polaris</span> team, working on the
          design system that Shopify’s UI is built from.
        </p>
        <p>
          Lately I’m deep into <span className="text-accent">agentic development</span>: local models, CLI tooling, and
          letting agents take the first draft so I can spend my time on the details.
        </p>
        <p>
          Away from the keyboard I’m a husband and a dad, and my favorite time is time with my family. I’m happiest
          outdoors: hiking, forests, anywhere with trees and fresh air.
        </p>
      </div>
    </header>
  )
}
