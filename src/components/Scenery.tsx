import { useEffect, useRef } from 'react'

// Deterministic randomness so the scene is identical on every load.
function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pine(x: number, base: number, h: number) {
  let d = ''
  for (let i = 0; i < 3; i++) {
    const ay = base - h + i * h * 0.24
    const by = ay + h * 0.42
    const hw = h * 0.16 * (1 + i * 0.55)
    d += `M${x} ${ay}L${x - hw} ${by}L${x + hw} ${by}Z`
  }
  const tw = Math.max(1, h * 0.018)
  return d + `M${x - tw} ${base - h * 0.12}h${tw * 2}V${base}h${-tw * 2}Z`
}

type Pt = [number, number]
const ridge = (pts: Pt[]) => `M${pts.map((p) => p.join(' ')).join('L')}V900H0Z`

// Snow cap: follow both slopes down from a peak, with a jagged lower edge.
function caps(pts: Pt[], peaks: number[], f = 0.28) {
  return peaks
    .map((i) => {
      const [px, py] = pts[i]
      const [lx, ly] = pts[i - 1]
      const [rx, ry] = pts[i + 1]
      const L: Pt = [px + (lx - px) * f, py + (ly - py) * f]
      const R: Pt = [px + (rx - px) * f, py + (ry - py) * f]
      const m1: Pt = [L[0] + (R[0] - L[0]) * 0.3, Math.max(L[1], R[1]) - 4]
      const m2: Pt = [L[0] + (R[0] - L[0]) * 0.55, Math.max(L[1], R[1]) + 3]
      const m3: Pt = [L[0] + (R[0] - L[0]) * 0.8, Math.max(L[1], R[1]) - 3]
      return `M${px} ${py}L${L.join(' ')}L${m1.join(' ')}L${m2.join(' ')}L${m3.join(' ')}L${R.join(' ')}Z`
    })
    .join('')
}

const FAR: Pt[] = [[0, 540], [50, 500], [100, 525], [160, 450], [210, 495], [262, 420], [320, 485], [370, 445], [430, 505], [490, 455], [545, 500], [600, 470]]
const MID: Pt[] = [[0, 615], [70, 565], [120, 592], [190, 525], [250, 585], [310, 540], [380, 605], [440, 558], [510, 592], [560, 548], [600, 578]]

const r = rng(718)
const stars = Array.from({ length: 90 }, () => ({ x: r() * 600, y: r() * 420, s: 0.4 + r() * 1.1, d: r() * 4 }))
const backPines = Array.from({ length: 40 }, (_, i) => ({ x: -6 + i * 15.6 + r() * 6, h: 30 + r() * 28 }))
const frontPines = Array.from({ length: 12 }, (_, i) => ({ x: -12 + i * 54 + r() * 18, h: 150 + r() * 120, d: r() * 3 }))
const leaves = Array.from({ length: 6 }, (_, i) => ({ left: 8 + r() * 84, dur: 14 + r() * 10, delay: i * -4 - r() * 3, size: 16 + r() * 10 }))

const LEAF =
  'M10 1L11.5 5L14 3.5L13.2 8L17 6.5L15.8 10L19 11L14.5 13.5L15.2 15.5L10.6 14.5L10.6 19L9.4 19L9.4 14.5L4.8 15.5L5.5 13.5L1 11L4.2 10L3 6.5L6.8 8L6 3.5L8.5 5Z'

export function Scenery({ style }: { style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => ref.current?.style.setProperty('--s', String(window.scrollY)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const layer = (k: number) => ({ transform: `translateY(calc(var(--s, 0) * ${k}px))` })

  return (
    <div ref={ref} aria-hidden className="scenery pointer-events-none fixed inset-y-0 right-0 hidden overflow-hidden lg:block" style={style}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(var(--sky-top), var(--sky-bottom))' }} />

      <svg viewBox="0 0 600 450" preserveAspectRatio="xMidYMin slice" className="absolute inset-x-0 top-0 h-[55%] w-full">
        <defs>
          <linearGradient id="aurora" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="0.4" stopColor="var(--color-accent)" stopOpacity="0.5" />
            <stop offset="0.7" stopColor="#2dd4bf" stopOpacity="0.45" />
            <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
          </linearGradient>
          <filter id="blur" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <g className="night">
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.s} className="star" style={{ animationDelay: `${s.d}s` }} />
          ))}
          <g filter="url(#blur)" className="aurora">
            <path d="M-40 200 C80 120 200 250 320 160 S520 90 640 170 L640 230 C520 160 420 260 300 220 S80 200 -40 270Z" fill="url(#aurora)" />
            <path d="M-40 130 C100 80 220 170 360 110 S540 60 640 110 L640 150 C540 110 400 180 280 150 S60 140 -40 180Z" fill="url(#aurora)" opacity="0.6" />
          </g>
        </g>
        <g className="day">
          <circle cx="360" cy="150" r="34" fill="#fff6d6" />
          <g className="cloud" fill="#fff" opacity="0.85">
            <ellipse cx="120" cy="140" rx="50" ry="14" />
            <ellipse cx="146" cy="129" rx="30" ry="14" />
          </g>
          <g className="cloud cloud-2" fill="#fff" opacity="0.7">
            <ellipse cx="300" cy="250" rx="42" ry="11" />
            <ellipse cx="322" cy="242" rx="24" ry="11" />
          </g>
        </g>
      </svg>

      <svg viewBox="0 400 600 500" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-[72%] w-full">
        <g style={layer(-0.04)}>
          <path d={ridge(FAR)} fill="var(--far)" />
          <path d={caps(FAR, [3, 5, 7, 9])} fill="var(--snow)" />
        </g>
        <g style={layer(-0.08)}>
          <path d={ridge(MID)} fill="var(--mid)" />
          <path d={caps(MID, [3, 5, 9], 0.22)} fill="var(--snow)" opacity="0.75" />
        </g>
        <g style={layer(-0.12)}>
          <path d={backPines.map((p) => pine(p.x, 694, p.h)).join('')} fill="var(--forest-back)" />
          <rect x="0" y="690" width="600" height="92" fill="var(--lake)" />
          <g className="ripples" stroke="var(--snow)" strokeOpacity="0.3" strokeWidth="1.2" strokeLinecap="round">
            <path d="M60 712h46M210 724h70M380 716h40M130 744h58M450 748h50M300 760h36M40 766h30" />
          </g>
          <rect x="0" y="780" width="600" height="120" fill="var(--forest-back)" />
        </g>
        <g style={layer(-0.18)}>
          {frontPines.map((p, i) => (
            <path key={i} d={pine(p.x, 905, p.h)} fill="var(--forest-front)" className="sway" style={{ transformOrigin: `${p.x}px 905px`, animationDelay: `${-p.d}s` }} />
          ))}
          <rect x="0" y="868" width="600" height="40" fill="var(--forest-front)" />
        </g>
      </svg>

      {leaves.map((l, i) => (
        <span key={i} className="leaf" style={{ left: `${l.left}%`, animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }}>
          <svg viewBox="0 0 20 20" width={l.size} height={l.size} className="leaf-spin" style={{ animationDuration: `${l.dur / 3}s` }}>
            <path d={LEAF} fill="#d52b1e" />
          </svg>
        </span>
      ))}
    </div>
  )
}
