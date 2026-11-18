import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The site is served from the root of https://mazsola739.github.io, so the default base ('/') is right.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
