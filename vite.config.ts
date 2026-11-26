import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative base so the build works from any path: https://mazsola739.github.io/mazsola739/ today,
  // or the root if the repo is ever renamed to mazsola739.github.io.
  base: './',
  plugins: [react(), tailwindcss()],
  // Keep the /*! credit note of main.tsx in the minified bundle (Vite drops legal comments by default).
  build: { rolldownOptions: { output: { comments: { legal: true } } } },
})
