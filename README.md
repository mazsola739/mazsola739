# Hi, I'm Erika Rostás – call me Rika 🦄

Full-stack developer. I've been writing code since 2020, from a love calculator on CodePen to full-stack apps.
Since 2025 I've been sharpening my skills with AI, with GitHub Copilot and Claude as my everyday pair programmers.

**[Portfolio](https://mazsola739.github.io/mazsola739/)** · **[CV](https://mazsola739.github.io/rika-cv/)** ·
[GitLab](https://gitlab.com/mazsola739)

## Highlights

| Project                                                                | What it is                                                                        |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [json-tabifier](https://github.com/mazsola739/json-tabifier)           | An npm package and CLI that lines up JSON values; 35,000+ downloads in a year     |
| [Rika Unicorn Theme](https://github.com/mazsola739/rika-unicorn-theme) | A VS Code extension: four colour themes and 71 file icons                         |
| [Rikaflix](https://github.com/mazsola739/rikaflix)                     | A movie and TV show browser with React, Redux Toolkit and RTK Query               |
| [Project Ramp-up](https://github.com/mazsola739/project-rampup)        | My EPAM ramp-up task, rebuilt with React 19, TanStack Query and Tailwind CSS      |
| [Maze Escape Solver](https://github.com/mazsola739/rika-hacka)         | A hackathon entry: A* search through a 17×17 XML maze, with an interactive replay |

Every project, from my first one to the newest, is on the [portfolio](https://mazsola739.github.io/mazsola739/).

## How I work on GitHub

- **GitHub Actions** test, build and deploy the projects, and **GitHub Pages** hosts every live demo.
- **Pull requests**, some of them reviewed by **Copilot code review**.
- **Releases** for the npm package and the VS Code extension, with a changelog.

<details>
<summary><b>About this repository</b>: the code of the portfolio site</summary>

### Stack

[Bun](https://bun.sh) · [Vite](https://vite.dev) · React 19 · TypeScript · [Tailwind CSS 4](https://tailwindcss.com) ·
[Biome](https://biomejs.dev) · GitHub Pages (GitHub Actions)

### Run locally

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

### Content

- `src/data/profile.ts` – name, role, introduction, CV, links
- `src/data/projects.ts` – levels and projects
- `src/index.css` – Tailwind theme: colors (light and dark) and the page width

### Deployment

Every push to `main` is linted, built and published by `.github/workflows/deploy.yml`.

### License

The code is under the [MIT License](LICENSE). My photo and the illustrations (the unicorn, the flowers and the
butterflies) are not covered by it: all rights reserved.

</details>
