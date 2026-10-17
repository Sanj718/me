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
  return d
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
const backPines = Array.from({ length: 40 }, (_, i) => ({ x: -6 + i * 15.6 + r() * 6, h: 30 + r() * 28 }))
const frontPines = [
  { x: 470, h: 230 },
  { x: 530, h: 280 },
  { x: 585, h: 200 },
]

// Barely-there landscape behind the page, bottom-right, large screens only.
export function Scenery() {
  const gutter = { width: 'calc((100vw - 42rem) / 2)' }
  return (
    <>
      <div aria-hidden className="sky pointer-events-none fixed right-0 top-0 -z-10 hidden h-[60vh] lg:block" style={gutter}>
        <svg viewBox="0 0 600 450" preserveAspectRatio="xMidYMin slice" className="h-full w-full">
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
            <radialGradient id="sun">
              <stop offset="0.45" stopColor="#ffe9a8" />
              <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="aurora" filter="url(#blur)">
            <path d="M-40 200 C80 120 200 250 320 160 S520 90 640 170 L640 230 C520 160 420 260 300 220 S80 200 -40 270Z" fill="url(#aurora)" />
            <path d="M-40 130 C100 80 220 170 360 110 S540 60 640 110 L640 150 C540 110 400 180 280 150 S60 140 -40 180Z" fill="url(#aurora)" opacity="0.6" />
          </g>
          <circle className="sun" cx="360" cy="160" r="70" fill="url(#sun)" />
        </svg>
      </div>
      <div aria-hidden className="scenery pointer-events-none fixed bottom-0 right-0 -z-10 hidden h-[75vh] lg:block"
      // Only the empty gutter right of the centered 42rem column, so it never sits under text.
      style={gutter}
    >
      <svg viewBox="0 380 600 520" preserveAspectRatio="xMaxYMax slice" className="h-full w-full">
        {/* Opacity is set per layer (group), so overlapping shapes never double up or leave seams. */}
        <g className="fill-fg" opacity="0.025">
          <path d={ridge(FAR)} />
        </g>
        <g className="fill-fg" opacity="0.035">
          <path d={caps(FAR, [3, 5, 7, 9])} />
        </g>
        <g className="fill-fg" opacity="0.035">
          <path d={ridge(MID)} />
        </g>
        <g className="fill-fg" opacity="0.045">
          {backPines.map((p, i) => (
            <path key={i} d={pine(p.x, 696, p.h)} />
          ))}
          <rect x="0" y="690" width="600" height="210" />
        </g>
        <g className="fill-fg" opacity="0.055">
          {frontPines.map((p, i) => (
            <path key={i} d={pine(p.x, 930, p.h)} />
          ))}
        </g>
      </svg>
      </div>
    </>
  )
}
