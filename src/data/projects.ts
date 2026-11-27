import angularFundamentals from '../assets/projects/angular-fundamentals.webp'
import codergames from '../assets/projects/codergames.webp'
import frontEndLab from '../assets/projects/front-end-lab.webp'
import jsonTabifier from '../assets/projects/json-tabifier.webp'
import angularFundamentalsLandscape from '../assets/projects/landscape/angular-fundamentals.webp'
import codergamesLandscape from '../assets/projects/landscape/codergames.webp'
import frontEndLabLandscape from '../assets/projects/landscape/front-end-lab.webp'
import jsonTabifierLandscape from '../assets/projects/landscape/json-tabifier.webp'
import matchmakerLandscape from '../assets/projects/landscape/matchmaker.webp'
import mazeEscapeSolverLandscape from '../assets/projects/landscape/maze-escape-solver.webp'
import nextjsBlogLandscape from '../assets/projects/landscape/nextjs-blog.webp'
import nodejsMentoringLandscape from '../assets/projects/landscape/nodejs-mentoring.webp'
import projectRampupLandscape from '../assets/projects/landscape/project-rampup.webp'
import reactFundamentalsLandscape from '../assets/projects/landscape/react-fundamentals.webp'
import rikaBuildLandscape from '../assets/projects/landscape/rika-build.webp'
import rikaCheatSheetsLandscape from '../assets/projects/landscape/rika-cheat-sheets.webp'
import rikaDataRefinementLandscape from '../assets/projects/landscape/rika-data-refinement.webp'
import rikaIpsumLandscape from '../assets/projects/landscape/rika-ipsum.webp'
import rikaOnugLandscape from '../assets/projects/landscape/rika-onug.webp'
import rikaUnicornThemeLandscape from '../assets/projects/landscape/rika-unicorn-theme.webp'
import rikaflixLandscape from '../assets/projects/landscape/rikaflix.webp'
import rikatasLandscape from '../assets/projects/landscape/rikatas.webp'
import rikatrixLandscape from '../assets/projects/landscape/rikatrix.webp'
import skillVisualizerLandscape from '../assets/projects/landscape/skill-visualizer.webp'
import wickedPlanLandscape from '../assets/projects/landscape/wicked-plan.webp'
import matchmaker from '../assets/projects/matchmaker.webp'
import mazeEscapeSolver from '../assets/projects/maze-escape-solver.webp'
import nextjsBlog from '../assets/projects/nextjs-blog.webp'
import nodejsMentoring from '../assets/projects/nodejs-mentoring.webp'
import projectRampup from '../assets/projects/project-rampup.webp'
import reactFundamentals from '../assets/projects/react-fundamentals.webp'
import rikaBuild from '../assets/projects/rika-build.webp'
import rikaCheatSheets from '../assets/projects/rika-cheat-sheets.webp'
import rikaDataRefinement from '../assets/projects/rika-data-refinement.webp'
import rikaIpsum from '../assets/projects/rika-ipsum.webp'
import rikaOnug from '../assets/projects/rika-onug.webp'
import rikaUnicornTheme from '../assets/projects/rika-unicorn-theme.webp'
import rikaflix from '../assets/projects/rikaflix.webp'
import rikatas from '../assets/projects/rikatas.webp'
import rikatrix from '../assets/projects/rikatrix.webp'
import skillVisualizer from '../assets/projects/skill-visualizer.webp'
import wickedPlan from '../assets/projects/wicked-plan.webp'

export type Level = {
  id: number
  /** Fun name of the level, from noob to raisin. */
  title: string
  /** One-line joke under the title. */
  tagline: string
  description: string
}

export type Project = {
  title: string
  /** Which level (Level.id) the project belongs to. */
  level: number
  year: string
  description: string
  tags: string[]
  /** Live demo, e.g. a GitHub Pages URL. */
  live?: string
  /** Source code – only link public repos, private ones give visitors a 404. */
  repo?: string
  /** Screenshot: put it in src/assets/projects/ and import it here. */
  image?: string
  /**
   * Screenshot for the landscape card (from lg): the part of the live page that matters, in the
   * card's shape (367 x 350, saved at 2x as 734 x 700) in src/assets/projects/landscape/.
   * Without it, the landscape card shows the middle of `image`.
   */
  landscape?: string
}

/**
 * The projects go from simple to complex, one level at a time: from noob to raisin. The page
 * shows them the other way round, Raisin on top.
 */
export const levels: Level[] = [
  {
    id: 1,
    title: 'Noob',
    tagline: 'Hello, world!',
    description:
      'First steps: HTML, CSS and JavaScript, my first course homework and my first React app, all kept in Git.',
  },
  {
    id: 2,
    title: 'Junior',
    tagline: 'It works on my machine.',
    description:
      "My junior years: courses in React, Angular and Node.js, a ramp-up task, a client project, a hackathon entry and a job application's home task. Along the way came TypeScript, Redux, React Router, Express and Docker, Scrum sprints in an Agile team, and Git every day.",
  },
  {
    id: 3,
    title: 'Medior',
    tagline: 'It works on your machine too.',
    description:
      'I opened up more and more to the world: an app from a mentoring program, a whole coding competition solved, and tools other people install (an npm package, a VS Code extension and a Windows wallpaper). New in my toolbox: Tailwind CSS, Emotion, Formik, a CLI published on npm with TypeScript types, Yarn, and Prettier, ESLint and Husky to keep the code tidy.',
  },
  {
    id: 4,
    title: 'Raisin',
    tagline: 'Senior, sun-dried to perfection.',
    description:
      "Game systems with a Rust core and lots of tests: real-time multiplayer with its own server, and 51 browser games against bots. Here I learned Rust with Axum and Tokio, MobX, Playwright, Vite, Vitest and Bun, switched to Biome in place of Prettier and ESLint, and built my own dev tools for Rika's One Night Ultimate Game.",
  },
]

/** Projects are added here one by one, oldest first; the page shows each level newest first. */
export const projects: Project[] = [
  {
    title: 'Matchmaker',
    level: 1,
    year: '2020',
    description:
      'My very first code, my own "Hello, world!": a love calculator, inspired by a game we played on paper at school. Type in two names, it counts the letters of I LOVE YOU in them and adds the digits row by row until a love percentage is left. Written on CodePen in 2020, renovated in 2026.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Hello, world!'],
    live: 'https://mazsola739.github.io/rika-hello-world/',
    repo: 'https://github.com/mazsola739/rika-hello-world',
    image: matchmaker,
    landscape: matchmakerLandscape,
  },
  {
    title: 'Rika Ipsum',
    level: 1,
    year: '2021',
    description:
      'A nonsense text generator with 13 flavours of ipsum, from Lorem, Superhero and Meow to Palindrome, Pirate and Meme Ipsum. It makes paragraphs, sentences, words or characters, with optional emojis and <p> tags. One HTML file, no build, no dependencies; refreshed in 2026.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Lorem ipsum'],
    live: 'https://mazsola739.github.io/rika-ipsum/',
    repo: 'https://github.com/mazsola739/rika-ipsum',
    image: rikaIpsum,
    landscape: rikaIpsumLandscape,
  },
  {
    title: 'Rikatas',
    level: 1,
    year: '2021',
    description:
      'My Codewars homework from the Junior Front-End Online Program: 169 of 173 katas solved in JavaScript, and a site to browse them. Search by name or by method, filter by kyu, read the task and my solution, and see which methods I used the most.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Codewars', 'Kata samurai 侍'],
    live: 'https://mazsola739.github.io/rikatas/',
    repo: 'https://github.com/mazsola739/rikatas',
    image: rikatas,
    landscape: rikatasLandscape,
  },
  {
    title: 'Front-end Lab',
    level: 1,
    year: '2021',
    description:
      'My homework from Front-end Lab, the course before my first developer job: 15 tasks from HTML basics to routing with the History API. Simple beginner solutions in plain HTML, CSS, Bootstrap and JavaScript, tidied up in 2026.',
    tags: ['HTML', 'SCSS', 'Bootstrap', 'JavaScript', 'Git'],
    live: 'https://mazsola739.github.io/rika-fl-hu1/',
    repo: 'https://github.com/mazsola739/rika-fl-hu1',
    image: frontEndLab,
    landscape: frontEndLabLandscape,
  },
  {
    title: 'Rika Cheat Sheets',
    level: 1,
    year: '2021',
    description:
      'Whatever I liked or finally understood in my noob days went in here, from 2021 on. In 2026 it grew into a site of its own, in English and Hungarian: hand-drawn cheat sheets, 167 JavaScript snippets, a roadmap to tick off and 50 development principles with poster memes.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://mazsola739.github.io/rika-cheat-sheets/',
    repo: 'https://github.com/mazsola739/rika-cheat-sheets',
    image: rikaCheatSheets,
    landscape: rikaCheatSheetsLandscape,
  },
  {
    title: "Rika's Skill Visualizer",
    level: 1,
    year: '2021',
    description:
      "My first React app. I've always liked visual overviews, so I wondered: what if my knowledge could be seen like a tree and its branches? Paste a list of skills as JSON and it draws a mind map, every skill rated from 0 to 8 stars. It opens with my 2026 skills in three maps, front end, back end and the rest, with my June 2021 maps next to them.",
    tags: ['React', 'JavaScript', 'CSS', 'PlantUML', 'Git', 'Self-rated ⭐'],
    live: 'https://mazsola739.github.io/skill-visualizer/',
    repo: 'https://github.com/mazsola739/skill-visualizer',
    image: skillVisualizer,
    landscape: skillVisualizerLandscape,
  },
  {
    title: 'React Fundamentals',
    level: 2,
    year: '2021',
    description:
      'My homework from a React Fundamentals course in 2021: a courses app that grew week by week, from components and routing to Redux and tests. Rebuilt in 2026 with React 19 and Redux Toolkit, with a backend of my own that also runs in the browser.',
    tags: ['React', 'JavaScript', 'Redux', 'React Router'],
    live: 'https://mazsola739.github.io/rika-react-fundamentals/',
    repo: 'https://github.com/mazsola739/rika-react-fundamentals',
    image: reactFundamentals,
    landscape: reactFundamentalsLandscape,
  },
  {
    title: 'Angular Fundamentals',
    level: 2,
    year: '2021',
    description:
      "My homework from an Angular Fundamentals course in 2021: a courses app with forms, routing, services and an NgRx store. I never worked with Angular after it: we didn't become friends. The old code got lost, so in 2026 I wrote it again from the task sheets.",
    tags: ['Angular', 'TypeScript', 'NgRx', 'RxJS', 'SCSS'],
    live: 'https://mazsola739.github.io/rika-angular-fundamentals/',
    repo: 'https://github.com/mazsola739/rika-angular-fundamentals',
    image: angularFundamentals,
    landscape: angularFundamentalsLandscape,
  },
  {
    title: 'RikaBuild',
    level: 2,
    year: '2021–2022',
    description:
      'A client project from my junior years: a mobile app for construction sites to order materials and plant hire and to record deliveries. Its code stays with the client, so in 2026 I rebuilt it from scratch, from memory, with my own design, as a fairy tale of wish scrolls, guilds and pacts.',
    tags: ['React', 'TypeScript', 'React Router', 'CSS Modules'],
    live: 'https://mazsola739.github.io/rika-build/',
    repo: 'https://github.com/mazsola739/rika-build',
    image: rikaBuild,
    landscape: rikaBuildLandscape,
  },
  {
    title: 'Project Ramp-up',
    level: 2,
    year: '2022',
    description:
      'My ramp-up task before my first project as a junior developer, built in two weeks in 2022: a browser for the posts, albums, photos and todos of the JSONPlaceholder API. Rebuilt in 2026 with React 19, TanStack Query 5 and Tailwind, with tests.',
    tags: ['React', 'TypeScript', 'React Query', 'React Router', 'REST API'],
    live: 'https://mazsola739.github.io/project-rampup/',
    repo: 'https://github.com/mazsola739/project-rampup',
    image: projectRampup,
    landscape: projectRampupLandscape,
  },
  {
    title: 'Node.js Mentoring',
    level: 2,
    year: '2023',
    description:
      'My home tasks from a Node.js mentoring program in 2023: seven modules, from a REPL command and my own EventEmitter to streams, a REST API and an Express service. Renovated in 2026 with TypeScript, Bun, SQLite and tests; most of it runs right in the browser.',
    tags: ['Node.js', 'TypeScript', 'Express', 'REST API'],
    live: 'https://mazsola739.github.io/rika-nodejs/',
    repo: 'https://github.com/mazsola739/rika-nodejs',
    image: nodejsMentoring,
    landscape: nodejsMentoringLandscape,
  },
  {
    title: 'Next.js Blog',
    level: 2,
    year: '2023',
    description:
      'The home assignment of a junior front-end job application: a responsive blog built from a Figma design, with paginated posts from a mock API, detail pages, tags, reading time, an RSS feed and a light / dark theme. A static export, so it runs on GitHub Pages.',
    tags: ['Next.js', 'React', 'TypeScript', 'SCSS modules'],
    live: 'https://mazsola739.github.io/rika-nextjs-blog/',
    repo: 'https://github.com/mazsola739/rika-nextjs-blog',
    image: nextjsBlog,
    landscape: nextjsBlogLandscape,
  },
  {
    title: 'Maze Escape Solver',
    level: 2,
    year: '2024',
    description:
      'My entry for the DT Maze Challenge hackathon: it reads a 17×17 maze as XML and finds the fewest steps, trap triggers and district rotations to the exit with A* search. Tested on 450 random mazes; the page has an interactive replay of the solutions.',
    tags: ['TypeScript', 'Node.js', 'Docker'],
    live: 'https://mazsola739.github.io/rika-hacka/',
    repo: 'https://github.com/mazsola739/rika-hacka',
    image: mazeEscapeSolver,
    landscape: mazeEscapeSolverLandscape,
  },
  {
    title: 'Rikaflix',
    level: 3,
    year: '2024',
    description:
      'A streaming-site-style movie and TV show browser with 600+ titles: search, genre filters, sorting, paging, a detail page and add / edit / delete. It started as the home task of a React mentoring program and runs fully in the browser, without a server.',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Emotion', 'Formik'],
    live: 'https://mazsola739.github.io/rikaflix/',
    repo: 'https://github.com/mazsola739/rikaflix',
    image: rikaflix,
    landscape: rikaflixLandscape,
  },
  {
    title: 'json-tabifier',
    level: 3,
    year: '2025',
    description:
      'An open-source npm package with over 35,000 downloads in the last year: a CLI that lines up the values of package.json and other JSON files in a neat column, without changing a value. Zero dependencies, a --check mode for CI and a live playground.',
    tags: [
      'Node.js',
      'JavaScript',
      'CLI',
      'npm',
      'TypeScript types',
      'node:test',
      'GitHub Actions',
    ],
    live: 'https://mazsola739.github.io/json-tabifier/',
    repo: 'https://github.com/mazsola739/json-tabifier',
    image: jsonTabifier,
    landscape: jsonTabifierLandscape,
  },
  {
    title: 'Rika Unicorn Theme',
    level: 3,
    year: '2026',
    description:
      'A VS Code extension with four colour themes and 71 file and folder icons: flowers, butterflies, stars and a unicorn for README files. Every colour was sampled from one picture of a unicorn, and the code colours pass a WCAG contrast check.',
    tags: ['VS Code extension', 'JavaScript', 'SVG'],
    live: 'https://mazsola739.github.io/rika-unicorn-theme/',
    repo: 'https://github.com/mazsola739/rika-unicorn-theme',
    image: rikaUnicornTheme,
    landscape: rikaUnicornThemeLandscape,
  },
  {
    title: 'Rikatrix',
    level: 3,
    year: '2026',
    description:
      'An animated Windows wallpaper for Lively: Matrix rain in pink, lavender and ice blue, with glitter, four themes and a mouse spotlight. The original Matrix code was reportedly scanned from sushi cookbooks, so here the rain spells real sushi words in katakana.',
    tags: ['React', 'TypeScript', 'Canvas', 'Vite', 'Lively Wallpaper', 'GitHub Actions'],
    live: 'https://mazsola739.github.io/rikatrix/',
    repo: 'https://github.com/mazsola739/rikatrix',
    image: rikatrix,
    landscape: rikatrixLandscape,
  },
  {
    title: 'CoderGames Solutions',
    level: 3,
    year: '2026',
    description:
      "Every published task of CoderGames, Deutsche Telekom IT Solutions' coding competition, from 2020 to 2026: 37 tasks, each with a write-up, a checked solution, a visualisation and a playground. Along the way I found five mistakes in the official material.",
    tags: [
      'TypeScript',
      'Node.js',
      'Algorithms',
      'JavaScript',
      'SVG',
      'Web Workers',
      'Data visualisation',
    ],
    live: 'https://mazsola739.github.io/rika-codergames/',
    repo: 'https://github.com/mazsola739/rika-codergames',
    image: codergames,
    landscape: codergamesLandscape,
  },
  {
    title: 'Rika Data Refinement',
    level: 3,
    year: '2025',
    description:
      'A just-for-fun Macrodata Refinement terminal from Severance: the scary numbers look calm until the cursor comes near, then they swell and tremble. Box them and refine them into five bins. Files and branches from the show, quarterly incentives and its quotes, all drawn on a canvas.',
    tags: ['React', 'TypeScript', 'Canvas', 'Web Audio', 'IndexedDB', 'Tailwind CSS'],
    live: 'https://mazsola739.github.io/rika-data-refinement/',
    repo: 'https://github.com/mazsola739/rika-data-refinement',
    image: rikaDataRefinement,
    landscape: rikaDataRefinementLandscape,
  },
  {
    title: "Rika's One Night Ultimate Game",
    level: 4,
    year: '2022–2026',
    description:
      'My favourite board game, One Night Ultimate Werewolf, on the web: up to 12 players, a narrator in English or Hungarian, robots on the empty seats. I started it alone in 2022, before AI came along; in 2026 I rebuilt it with Claude and a Rust server.',
    tags: [
      'Rust',
      'Axum',
      'WebSocket',
      'React',
      'TypeScript',
      'MobX',
      'Tailwind CSS',
      'Playwright',
    ],
    live: 'https://mazsola739.github.io/rika-onug-showcase/',
    image: rikaOnug,
    landscape: rikaOnugLandscape,
  },
  {
    title: 'Wicked Plan',
    level: 4,
    year: '2026',
    description:
      "51 puzzles and party games in the browser, an unofficial fan project inspired by the Netflix show The Devil's Plan: solo puzzles, and bluffing, bidding and hidden-role games against bots. The rules of every game are a seeded Rust module run through WebAssembly, tested with 1,000 random bot games.",
    tags: ['Rust', 'React', 'TypeScript', 'Vite', 'Bun'],
    live: 'https://mazsola739.github.io/wicked-plan/',
    repo: 'https://github.com/mazsola739/wicked-plan',
    image: wickedPlan,
    landscape: wickedPlanLandscape,
  },
]

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
