// Injects server-rendered markup into the built page so crawlers and link previews see real content.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'

const { render } = await import('../dist-ssr/entry-server.js')
const file = new URL('../dist/index.html', import.meta.url)
const html = readFileSync(file, 'utf8')
const empty = '<div id="root"></div>'
if (!html.includes(empty)) throw new Error('prerender: empty #root not found in dist/index.html')
writeFileSync(file, html.replace(empty, `<div id="root">${render()}</div>`))
rmSync(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true })
console.log('prerendered dist/index.html')
