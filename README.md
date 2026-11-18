# Portfolio

My portfolio: the place to open my CV and my projects, from my first small projects to complex systems.

**Live site** (once the repository is public): https://mazsola739.github.io/mazsola739/

## Stack

[Bun](https://bun.sh) · [Vite](https://vite.dev) · React 19 · TypeScript · [Tailwind CSS 4](https://tailwindcss.com) ·
[Biome](https://biomejs.dev) · GitHub Pages (GitHub Actions)

## Run locally

```bash
bun install
bun run dev
```

| Script              | What it does                                                   |
| ------------------- | -------------------------------------------------------------- |
| `bun run dev`       | dev server with hot reload                                     |
| `bun run build`     | type check + production build into `dist/`                     |
| `bun run preview`   | serve the production build locally                             |
| `bun run typecheck` | TypeScript check only                                          |
| `bun run lint`      | Biome: lint, formatting, import order and Tailwind class order |
| `bun run format`    | apply every safe Biome fix and format the code                 |

## Content

- `src/data/profile.ts` – name, role, introduction, CV, links
- `src/data/projects.ts` – levels and projects
- `src/index.css` – Tailwind theme: colors (light and dark) and the page width

## Deployment

Every push to `main` is linted, built and published by `.github/workflows/deploy.yml`.
One-time setup in the repository: **Settings → Pages → Source: GitHub Actions**.
