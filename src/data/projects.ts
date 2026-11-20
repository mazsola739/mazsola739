import angularFundamentals from '../assets/projects/angular-fundamentals.webp'
import codergames from '../assets/projects/codergames.webp'
import frontEndLab from '../assets/projects/front-end-lab.webp'
import jsonTabifier from '../assets/projects/json-tabifier.webp'
import matchmaker from '../assets/projects/matchmaker.webp'
import mazeEscapeSolver from '../assets/projects/maze-escape-solver.webp'
import nextjsBlog from '../assets/projects/nextjs-blog.webp'
import nodejsMentoring from '../assets/projects/nodejs-mentoring.webp'
import projectRampup from '../assets/projects/project-rampup.webp'
import reactFundamentals from '../assets/projects/react-fundamentals.webp'
import rikaCheatSheets from '../assets/projects/rika-cheat-sheets.webp'
import rikaIpsum from '../assets/projects/rika-ipsum.webp'
import rikaOnug from '../assets/projects/rika-onug.webp'
import rikaUnicornTheme from '../assets/projects/rika-unicorn-theme.webp'
import rikaflix from '../assets/projects/rikaflix.webp'
import rikatas from '../assets/projects/rikatas.webp'
import rikatrix from '../assets/projects/rikatrix.webp'
import skillVisualizer from '../assets/projects/skill-visualizer.webp'

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
   * The landscape card (from lg) shows only the middle part of the screenshot. When the
   * interesting part is elsewhere, this moves the crop: a CSS object-position, e.g. 'right top'.
   */
  focus?: string
  /** Zooms the landscape crop in around the focus point, e.g. 1.3 shows a smaller part, larger. */
  zoom?: number
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
      'First steps: HTML, CSS and JavaScript, Codewars katas, my first course homework, the cheat sheets I started collecting and my first React app.',
  },
  {
    id: 2,
    title: 'Junior',
    tagline: 'It works on my machine.',
    description:
      "My junior years: courses in React, Angular and Node.js, a ramp-up task, a hackathon entry and a job application's home task.",
  },
  {
    id: 3,
    title: 'Medior',
    tagline: 'It works on your machine too.',
    description:
      'A complete app, a whole coding competition solved and visualised, and tools other people install: an npm package, a VS Code extension and a Windows wallpaper.',
  },
  {
    id: 4,
    title: 'Raisin',
    tagline: 'Senior, sun-dried to perfection.',
    description: 'Real-time multiplayer systems with their own servers and tests.',
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
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://mazsola739.github.io/rika-hello-world/',
    repo: 'https://github.com/mazsola739/rika-hello-world',
    image: matchmaker,
    focus: 'left top',
    zoom: 1.3,
  },
  {
    title: 'Rika Ipsum',
    level: 1,
    year: '2021',
    description:
      'A nonsense text generator with 13 flavours of ipsum, from Lorem, Superhero and Meow to Palindrome, Pirate and Meme Ipsum. It makes paragraphs, sentences, words or characters, with optional emojis and <p> tags. One HTML file, no build, no dependencies; refreshed in 2026.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://mazsola739.github.io/rika-ipsum/',
    repo: 'https://github.com/mazsola739/rika-ipsum',
    image: rikaIpsum,
  },
  {
    title: 'Rikatas',
    level: 1,
    year: '2021',
    description:
      'My Codewars homework from the Junior Front-End Online Program: 169 of 173 katas solved in JavaScript, and a site to browse them. Search by name or by method, filter by kyu, read the task and my solution, and see which methods I used the most.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Codewars', 'highlight.js'],
    live: 'https://mazsola739.github.io/rikatas/',
    repo: 'https://github.com/mazsola739/rikatas',
    image: rikatas,
  },
  {
    title: 'Front-end Lab',
    level: 1,
    year: '2021',
    description:
      'My homework from Front-end Lab, the course before my first developer job: 15 tasks from HTML basics to routing with the History API. The HTML, CSS and Bootstrap pages run as they were built; the JavaScript tasks are rebuilt with React 19 and TypeScript, with tests.',
    tags: ['HTML', 'SCSS', 'Bootstrap', 'JavaScript', 'React', 'TypeScript', 'Vitest'],
    live: 'https://mazsola739.github.io/rika-fl-hu1/',
    repo: 'https://github.com/mazsola739/rika-fl-hu1',
    image: frontEndLab,
    focus: 'left top',
  },
  {
    title: 'Rika Cheat Sheets',
    level: 1,
    year: '2021',
    description:
      'Whatever I liked or finally understood in my noob days went in here, from 2021 on. In 2026 it grew into a site of its own, in English and Hungarian: hand-drawn cheat sheets, 167 JavaScript snippets, a roadmap to tick off and 50 development principles with poster memes.',
    tags: ['HTML', 'CSS', 'JavaScript', 'SVG', 'localStorage'],
    live: 'https://mazsola739.github.io/rika-cheat-sheets/',
    repo: 'https://github.com/mazsola739/rika-cheat-sheets',
    image: rikaCheatSheets,
  },
  {
    title: 'skill-visualizer',
    level: 1,
    year: '2021',
    description:
      "My first React app. I've always liked visual overviews, so I wondered: what if my knowledge could be seen like a tree and its branches? Paste a list of skills as JSON and it draws a mind map, every skill rated from 0 to 8 stars. It opens with my skills from June 2021.",
    tags: ['React', 'JavaScript', 'Vite', 'PlantUML', 'Vitest'],
    live: 'https://mazsola739.github.io/skill-visualizer/',
    repo: 'https://github.com/mazsola739/skill-visualizer',
    image: skillVisualizer,
    focus: '82% bottom',
    zoom: 1.6,
  },
  {
    title: 'React Fundamentals',
    level: 2,
    year: '2021',
    description:
      'My homework from a React Fundamentals course in 2021: a courses app that grew week by week, from components and routing to Redux and tests. Rebuilt in 2026 with React 19 and Redux Toolkit, with a backend of my own that also runs in the browser.',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'React Router', 'Tailwind CSS', 'Bun', 'Vitest'],
    live: 'https://mazsola739.github.io/rika-react-fundamentals/',
    repo: 'https://github.com/mazsola739/rika-react-fundamentals',
    image: reactFundamentals,
    focus: '33% top',
  },
  {
    title: 'Angular Fundamentals',
    level: 2,
    year: '2021',
    description:
      "My homework from an Angular Fundamentals course in 2021: a courses app with forms, routing, services and an NgRx store. I never worked with Angular after it: we didn't become friends. The old code got lost, so in 2026 I wrote it again from the task sheets.",
    tags: ['Angular', 'TypeScript', 'NgRx', 'RxJS', 'Signals', 'SCSS', 'Vitest'],
    live: 'https://mazsola739.github.io/rika-angular-fundamentals/',
    repo: 'https://github.com/mazsola739/rika-angular-fundamentals',
    image: angularFundamentals,
    focus: 'left top',
  },
  {
    title: 'Project Ramp-up',
    level: 2,
    year: '2022',
    description:
      'My ramp-up task before my first project as a junior developer, built in two weeks in 2022: a browser for the posts, albums, photos and todos of the JSONPlaceholder API. Rebuilt in 2026 with React 19, TanStack Query 5 and Tailwind, with tests.',
    tags: [
      'React',
      'TypeScript',
      'TanStack Query',
      'React Router',
      'Tailwind CSS',
      'Vitest',
      'REST API',
    ],
    live: 'https://mazsola739.github.io/project-rampup/',
    repo: 'https://github.com/mazsola739/project-rampup',
    image: projectRampup,
    focus: 'left top',
  },
  {
    title: 'Node.js Mentoring',
    level: 2,
    year: '2023',
    description:
      'My home tasks from a Node.js mentoring program in 2023: seven modules, from a REPL command and my own EventEmitter to streams, a REST API and an Express service. Renovated in 2026 with TypeScript, Bun, SQLite and tests; most of it runs right in the browser.',
    tags: ['Node.js', 'TypeScript', 'Express', 'REST API', 'Streams', 'SQLite', 'Bun'],
    live: 'https://mazsola739.github.io/rika-nodejs/',
    repo: 'https://github.com/mazsola739/rika-nodejs',
    image: nodejsMentoring,
    focus: 'left top',
  },
  {
    title: 'Next.js Blog',
    level: 2,
    year: '2023',
    description:
      'The home assignment of a junior front-end job application: a responsive blog built from a Figma design, with paginated posts from a mock API, detail pages, tags, reading time, an RSS feed and a light / dark theme. A static export, so it runs on GitHub Pages.',
    tags: ['Next.js', 'React', 'TypeScript', 'SCSS modules', 'Static export'],
    live: 'https://mazsola739.github.io/rika-nextjs-blog/',
    repo: 'https://github.com/mazsola739/rika-nextjs-blog',
    image: nextjsBlog,
    focus: 'left top',
  },
  {
    title: 'Maze Escape Solver',
    level: 2,
    year: '2024',
    description:
      'My entry for the DT Maze Challenge hackathon: it reads a 17×17 maze as XML and finds the fewest steps, trap triggers and district rotations to the exit with A* search. Tested on 450 random mazes; the page has an interactive replay of the solutions.',
    tags: ['TypeScript', 'Node.js', 'A* search', 'XML parsing'],
    live: 'https://mazsola739.github.io/rika-hacka/',
    repo: 'https://github.com/mazsola739/rika-hacka',
    image: mazeEscapeSolver,
    focus: 'left top',
  },
  {
    title: 'Rikaflix',
    level: 3,
    year: '2024',
    description:
      'A streaming-site-style movie and TV show browser with 600+ titles: search, genre filters, sorting, paging, a detail page and add / edit / delete. It started as the home task of a React mentoring program and runs fully in the browser, without a server.',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Emotion', 'Formik', 'Vitest'],
    live: 'https://mazsola739.github.io/rikaflix/',
    repo: 'https://github.com/mazsola739/rikaflix',
    image: rikaflix,
    focus: 'left top',
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
    focus: 'left top',
  },
  {
    title: 'Rika Unicorn Theme',
    level: 3,
    year: '2026',
    description:
      'A VS Code extension with four colour themes and 71 file and folder icons: flowers, butterflies, stars and a unicorn for README files. Every colour was sampled from one picture of a unicorn, and the code colours pass a WCAG contrast check.',
    tags: ['VS Code extension', 'Color theme', 'Icon theme', 'JavaScript', 'SVG', 'WCAG'],
    live: 'https://mazsola739.github.io/rika-unicorn-theme/',
    repo: 'https://github.com/mazsola739/rika-unicorn-theme',
    image: rikaUnicornTheme,
    focus: 'right top',
    zoom: 1.25,
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
    focus: 'left top',
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
    focus: 'left top',
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
    focus: '15% top',
  },
]
