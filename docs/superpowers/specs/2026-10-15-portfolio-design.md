# Portfolio site — design (v2, supersedes the Polaris-component design)

Single-page, dark-by-default personal site for Sanjar Sobirjonov (frontend engineer, Shopify Polaris team).
No Polaris library or web components.

- **Stack:** Vite + React + TypeScript + Tailwind v4; no routing; CSS-only motion.
- **Build:** `base: './'` + `vite-plugin-singlefile` → `dist/index.html` works on GitHub Pages and from disk.
- **Sections:** Hero (headline + scripted terminal: help, whoami, agent.status(), polaris.tokens(), think, clear),
  Where I've been (inline SVG monograms, short notes), Craft meets agents, Footer (GitHub, LinkedIn if set, X, Email, live-style status).
- **Content lives in `src/site.ts`** (links, roles, thoughts). LinkedIn link appears when `site.links.linkedin` is set.
- **Accessibility:** reduced-motion respected, aria-live terminal output, keyboard-usable, focus-visible.
- **Deploy:** `npm run deploy` (gh-pages → `Sanj718/me`), custom domain `sanjar.dev` via `public/CNAME`.
  Every outward step (push, Pages, moving the domain off `my-glsl`) needs owner confirmation.
