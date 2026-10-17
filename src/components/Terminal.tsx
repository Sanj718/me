import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { thoughts } from '../site'

type Line = { kind: 'in' | 'out'; text: string }

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const randomThought = () => thoughts[Math.floor(Math.random() * thoughts.length)]

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    'help              list commands',
    'whoami            who is this',
    'agent.status()    what the agent is up to',
    'polaris.tokens()  peek at some design tokens',
    'think             a fresh thought on frontend',
    'clear             wipe the screen',
  ],
  whoami: () => ['sanjar: senior engineer, Shopify Polaris team.', 'design systems by day, agentic workflows by night.'],
  'agent.status': () => ['{ state: "active", task: "wrangling design tokens", model: "local", review: "pending your taste" }'],
  'polaris.tokens': () => [
    '// illustrative, not the real thing',
    'color.text.primary    #ededee',
    'space.4               16px',
    'radius.lg             12px',
    'motion.duration.fast  120ms',
  ],
  think: () => [randomThought()],
}

const CHIPS = ['help', 'agent.status()', 'polaris.tokens()', 'think']

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([])
  const [busy, setBusy] = useState(false)
  const [value, setValue] = useState('')
  const [announce, setAnnounce] = useState('')
  const run = useRef(0)
  const body = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (body.current) body.current.scrollTop = body.current.scrollHeight
  }, [lines])

  const type = useCallback(async (kind: Line['kind'], text: string, id: number, speed: number) => {
    if (reduceMotion()) {
      setLines((p) => [...p, { kind, text }])
      return true
    }
    setLines((p) => [...p, { kind, text: '' }])
    for (let i = 1; i <= text.length; i++) {
      if (run.current !== id) return false
      const slice = text.slice(0, i)
      setLines((p) => [...p.slice(0, -1), { kind, text: slice }])
      await sleep(speed)
    }
    return true
  }, [])

  const exec = useCallback(
    async (raw: string, id: number, typedAlready = false) => {
      const cmd = raw.trim().toLowerCase().replace(/\(\)$/, '')
      if (!cmd) return
      if (cmd === 'clear') {
        setLines([])
        return ['screen cleared']
      }
      if (typedAlready) setLines((p) => [...p, { kind: 'in', text: raw.trim() }])
      else if (!(await type('in', raw.trim(), id, 35))) return
      const out = COMMANDS[cmd]?.() ?? [`command not found: ${cmd}. try "help".`]
      for (const l of out) if (!(await type('out', l, id, 12))) return
      return out
    },
    [type],
  )

  useEffect(() => {
    const id = ++run.current
    setLines([])
    setBusy(true)
    ;(async () => {
      await sleep(500)
      if (run.current !== id) return
      await exec('think', id)
      if (run.current === id) setBusy(false)
    })()
    return () => {
      run.current++
    }
  }, [exec])

  const submit = async (cmd: string, typedAlready: boolean) => {
    if (busy) return
    const id = ++run.current
    setBusy(true)
    const out = await exec(cmd, id, typedAlready)
    if (run.current !== id) return
    setBusy(false)
    // Announce the finished output once, not character by character.
    if (out) setAnnounce(out.join(' '))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const v = value
    setValue('')
    void submit(v, true)
  }

  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-panel font-mono text-[13px]"
      onClick={() => input.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-2 text-xs text-mute">agent@sanjar ~ %</span>
      </div>
      <div ref={body} className="h-40 overflow-y-auto px-4 py-3 leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className={l.kind === 'in' ? 'text-fg' : 'whitespace-pre-wrap text-mute'}>
            {l.kind === 'in' && <span className="mr-2 text-accent">$</span>}
            {l.text}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex items-center">
          <span className="mr-2 text-accent">$</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            // readOnly (not disabled) so keyboard focus stays in the input while the agent types
            readOnly={busy}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal command"
            placeholder={busy ? '' : 'type help'}
            className="w-full bg-transparent text-base text-fg caret-accent outline-none placeholder:text-mute/60 sm:text-sm"
          />
        </form>
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            aria-disabled={busy}
            onClick={(e) => {
              e.stopPropagation()
              void submit(c, false)
            }}
            className="rounded-md border border-line px-2.5 py-1 text-xs text-mute transition hover:border-accent hover:text-accent aria-disabled:opacity-40"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
