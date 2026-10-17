import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// base './' + single-file output: dist/index.html works on GitHub Pages and when opened from disk.
export default defineConfig(({ isSsrBuild }) => ({
  base: './',
  plugins: isSsrBuild ? [react()] : [react(), tailwindcss(), viteSingleFile()],
  // Inline logos in the prerender too, so its markup matches the single-file client build.
  build: isSsrBuild ? { assetsInlineLimit: 100_000_000 } : undefined,
}))
