# Hi, I'm Erika Rostás – call me Rika 🦄

Full-stack developer. I've been coding since 2020: from a first “Hello, world!” in a sandbox to full-stack apps built with AI assistance.
Since 2025 I've been sharpening my skills with AI, with GitHub Copilot and Claude as my everyday pair programmers.

**[Portfolio](https://mazsola739.github.io/mazsola739/)** · **[CV](https://mazsola739.github.io/rika-cv/)** ·
[GitLab](https://gitlab.com/mazsola739)

## Highlights

| Project                                                                | What it is                                                                                |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [json-tabifier](https://github.com/mazsola739/json-tabifier)           | An npm package and CLI that lines up JSON values; 35,000+ downloads in a year             |
| [CoderGames Solutions](https://github.com/mazsola739/rika-codergames)  | Every CoderGames task since 2020 solved, tested and visualised; 5 official mistakes found |
| [Rika Unicorn Theme](https://github.com/mazsola739/rika-unicorn-theme) | A VS Code extension: four colour themes and 71 file icons                                 |
| [Rikatrix](https://github.com/mazsola739/rikatrix)                     | An animated Windows wallpaper: pink Matrix rain that spells out sushi recipes             |
| [Maze Escape Solver](https://github.com/mazsola739/rika-hacka)         | A hackathon entry: A* search through a 17×17 XML maze, with an interactive replay         |

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

- **Header** (sticky): my photo and name, the CV, my links, the Contact me window and the theme button
- **Intro**: who I am, as a dictionary entry, with the unicorn
- **Projects**: four levels (Noob, Junior, Medior, Raisin) on one timeline that runs from sunshine yellow to wine.
  A button turns the order round: newest first (Raisin → Noob) or the way it all began (Noob → Raisin)
- **Footer**: the rainbow mane, two short lines and a round button back to the top
- **Theme**: light or dark; it follows the system until the visitor picks one, and remembers the choice
- **Garden**: the flowers and butterflies that live on the cards and the page

| File                   | What is in it                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `src/data/profile.ts`  | name, role, introduction, CV, links, and the Web3Forms access key of the contact form (empty = no form) |
| `src/data/projects.ts` | the levels and every project: title, year, text, tags, links and screenshots                            |
| `src/index.css`        | Tailwind theme: colours (light and dark), the level colours and the page width                          |
| `src/assets/projects/` | one screenshot per project, shown on top of its card                                                    |

### Deployment

Every push to `main` is linted, built and published by `.github/workflows/deploy.yml`.

### License

The code is under the [MIT License](LICENSE). My photo and the illustrations (the unicorn, the flowers and the
butterflies, made with AI) are not covered by it: they may not be reused or used to train AI
([details](src/assets/LICENSE.md)).

</details>
