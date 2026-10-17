# Portfolio site — design (v2, supersedes the Polaris-component design)

Single-page, dark-by-default personal site for Sanjar Sobirjonov (frontend engineer, Shopify Polaris team).
No Polaris library or web components.

- **Stack:** Vite + React + TypeScript + Tailwind v4; no routing; CSS-only motion.
- **Build:** `base: './'` + `vite-plugin-singlefile` → `dist/index.html` works on GitHub Pages and from disk.
- **Layout:** single personal column (max-w-2xl). Intro (avatar, name, first-person bio), Experience (LinkedIn-style: grouped roles, computed durations;
  collapsed to Shopify + half of Avex with a "Show all" expander), Things I've made (hidden while empty), Talk to my agent (scripted terminal: help, whoami, agent.status(), polaris.tokens(), think, clear),
  Footer (GitHub, LinkedIn if set, X, Email, live-style status). Dark default with a persistent light toggle.
- **Content lives in `src/site.ts`** (links, roles, projects, thoughts). LinkedIn link appears when `site.links.linkedin` is set.
- **Accessibility:** reduced-motion respected, aria-live terminal output, keyboard-usable, focus-visible.
- **Deploy:** `npm run deploy` (gh-pages → `Sanj718/me`), custom domain `sanjar.dev` via `public/CNAME`.
  Every outward step (push, Pages, moving the domain off `my-glsl`) needs owner confirmation.
