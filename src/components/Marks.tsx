import { type Company } from '../site'

// Real logos live in src/assets/logos/<kind>.jpg and get inlined into the build.
// Any missing file falls back to the drawn mark below.
const files = import.meta.glob<string>('../assets/logos/*.{jpg,png,svg}', { eager: true, query: '?url', import: 'default' })
const real = (kind: string) => Object.entries(files).find(([path]) => path.includes(`/${kind}.`))?.[1]

export function Logo({ kind }: { kind: Company['logo'] }) {
  const box = 'h-10 w-10 shrink-0 rounded-md'
  const src = real(kind)
  if (src) return <img src={src} alt="" width={48} height={48} className={`${box} border border-line object-cover`} />
  switch (kind) {
    case 'shopify':
      return (
        <svg viewBox="0 0 48 48" className={box} aria-hidden>
          <rect width="48" height="48" rx="6" fill="#95bf47" />
          <path d="M15 17h18l-1.6 19.5H16.6z" fill="#fff" />
          <path d="M19.5 18.5c0-4 2-6.5 4.5-6.5s4.5 2.5 4.5 6.5" fill="none" stroke="#fff" strokeWidth="2" />
          <path d="M27 23.6c-.6-1-1.7-1.6-3-1.6-1.8 0-3 1-3 2.3 0 3.2 6.2 1.9 6.2 5.2 0 1.4-1.3 2.5-3.3 2.5-1.6 0-2.9-.7-3.4-2" fill="none" stroke="#5e8e3e" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'avex':
      return (
        <svg viewBox="0 0 48 48" className={box} aria-hidden>
          <rect x="0.5" y="0.5" width="47" height="47" rx="5.5" fill="#0a0a0a" className="stroke-line" />
          <text x="24" y="27.5" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600" letterSpacing="1.5" fontFamily="ui-sans-serif, system-ui">AVEX</text>
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 48 48" className={box} aria-hidden>
          <rect width="48" height="48" rx="6" className="fill-panel stroke-line" />
          <text x="24" y="29" textAnchor="middle" className="fill-mute" fontSize="13" fontWeight="600" fontFamily="ui-monospace, monospace">
            {kind === 'sab' ? 'SG' : 'BD'}
          </text>
        </svg>
      )
  }
}
