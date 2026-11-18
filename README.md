# mazsola739.github.io

My portfolio: the place to open my CV and my projects, from my first small projects to complex systems.

**Live site:** https://mazsola739.github.io

## Stack

Vite · React 19 · TypeScript · GitHub Pages (GitHub Actions)

## Run locally

```bash
npm install
npm run dev
```

Production build: `npm run build` → the output goes to `dist/`.

## Content

- `src/data/profile.ts` – name, role, introduction, CV, links
- `src/data/projects.ts` – levels and projects

## Deployment

Every push to `main` is built and published by `.github/workflows/deploy.yml`.
One-time setup in the repository: **Settings → Pages → Source: GitHub Actions**.
