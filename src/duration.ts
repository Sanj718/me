const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const index = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}

const nowIndex = () => {
  const d = new Date()
  return d.getFullYear() * 12 + d.getMonth()
}

export const formatMonth = (ym: string) => {
  const i = index(ym)
  return `${MONTHS[i % 12]} ${Math.floor(i / 12)}`
}

// LinkedIn counts both the start and end month: Oct 2024 – Sep 2026 = 2 yrs.
export function duration(start: string, end?: string) {
  const total = (end ? index(end) : nowIndex()) - index(start) + 1
  const y = Math.floor(total / 12)
  const m = total % 12
  const parts = []
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`)
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`)
  return parts.join(' ') || '1 mo'
}
