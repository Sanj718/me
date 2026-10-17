import { renderToString } from 'react-dom/server'
import App from './App'

// Used at build time to prerender the page into dist/index.html (see scripts/prerender.mjs).
export const render = () => renderToString(<App />)
