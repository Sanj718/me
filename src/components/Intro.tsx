import { type ComponentType, type ReactNode } from 'react'
import { Heart, Mountain, Sparkles, Terminal, TreePine, Users } from 'lucide-react'
import { site } from '../site'

type IconType = ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>

// The Polaris star, from Shopify/polaris (polaris.shopify.com/src/components/WebComponentBanner/polaris-star.svg).
function PolarisStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={className} fill="currentColor">
      <path d="M71.57 38.61c.86 5.03 4.8 8.96 9.82 9.82l33.68 5.73c2.85.49 4.93 2.95 4.93 5.84s-2.08 5.35-4.93 5.84l-33.68 5.73c-5.02.86-8.96 4.8-9.82 9.82l-5.73 33.68c-.49 2.85-2.95 4.93-5.84 4.93s-5.35-2.08-5.84-4.93l-5.73-33.68c-.86-5.02-4.8-8.96-9.82-9.82L4.93 65.84C2.08 65.35 0 62.89 0 60s2.08-5.35 4.93-5.84l33.68-5.73c5.03-.86 8.96-4.8 9.82-9.82l5.73-33.68C54.65 2.08 57.11 0 60 0s5.35 2.08 5.84 4.93l5.73 33.68Z" />
    </svg>
  )
}

// A word with a small inline icon in front of it.
function I({ icon: Icon, children, accent }: { icon: IconType; children: ReactNode; accent?: boolean }) {
  return (
    <span className="whitespace-nowrap">
      <Icon aria-hidden strokeWidth={2} className={`mr-1 inline-block h-[1em] w-[1em] align-[-0.125em] ${accent ? 'text-accent' : 'text-mute'}`} />
      {children}
    </span>
  )
}

export function Intro() {
  return (
    <header>
      <div className="flex items-center gap-4">
        {/* Circle crop of the face; hover or tap smoothly expands to the full photo, floating over the page. */}
        <button type="button" className="avatar" aria-label="Show full photo">
          <span className="avatar-pop">
            <img src={site.photo} alt="Sanjar and his kids wearing witch hats" width={960} height={540} decoding="async" />
          </span>
        </button>
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
          Hi, I’m Sanjar. I’m an engineer on Shopify’s{' '}
          <I icon={PolarisStar}>
            <span className="text-fg">Polaris</span>
          </I>{' '}
          team, working on the design system that Shopify’s UI is built from.
        </p>
        <p>
          Lately I’m deep into{' '}
          <I icon={Sparkles} accent>
            <span className="text-accent">agentic development</span>
          </I>
          : local models, <I icon={Terminal}>CLI tooling</I>, and letting agents take the first draft so I can spend my
          time on the details.
        </p>
        <p>
          Away from the keyboard, I’m a husband and a dad, and I love spending <I icon={Users}>time with my family</I>.
          I’m happiest outdoors: <I icon={Mountain}>hiking</I>, <I icon={TreePine}>forests</I>, anywhere with trees and
          fresh air. <Heart aria-hidden className="inline-block h-[0.9em] w-[0.9em] align-[-0.1em] text-mute" />
        </p>
      </div>
    </header>
  )
}
