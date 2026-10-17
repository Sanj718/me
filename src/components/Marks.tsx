// Original inline SVG monograms (not official logos). Inline so they never break on any base path.
export function Mark({ kind }: { kind: 'polaris' | 'shopify' }) {
  if (kind === 'polaris') {
    return (
      <svg viewBox="0 0 32 32" className="h-9 w-9" role="img" aria-label="Polaris">
        <rect width="32" height="32" rx="8" className="fill-panel stroke-line" />
        <rect x="8" y="8" width="7" height="7" rx="2" className="fill-accent" />
        <rect x="17" y="8" width="7" height="7" rx="2" className="fill-fg" />
        <rect x="8" y="17" width="7" height="7" rx="2" className="fill-fg" />
        <rect x="17" y="17" width="7" height="7" rx="2" className="fill-fg" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 32 32" className="h-9 w-9" role="img" aria-label="Shopify">
      <rect width="32" height="32" rx="8" className="fill-panel stroke-line" />
      <path d="M20.5 11.5c-.6-2.4-2.3-3.5-4.5-3.5-2.6 0-4.3 1.4-4.3 3.4 0 4.6 8.8 2.8 8.8 7.6 0 2.1-1.8 3.5-4.6 3.5-2.4 0-4.2-1.1-4.9-3.5"
        fill="none" strokeWidth="2.2" strokeLinecap="round" className="stroke-fg" />
    </svg>
  )
}
