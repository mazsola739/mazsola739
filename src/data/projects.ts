import matchmaker from '../assets/projects/matchmaker.webp'
import mazeEscapeSolver from '../assets/projects/maze-escape-solver.webp'
import nextjsBlog from '../assets/projects/nextjs-blog.webp'
import rikaIpsum from '../assets/projects/rika-ipsum.webp'
import rikaflix from '../assets/projects/rikaflix.webp'
import rikatas from '../assets/projects/rikatas.webp'

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
}

/** The projects go from simple to complex, one level at a time: from noob to raisin. */
export const levels: Level[] = [
  {
    id: 1,
    title: 'Noob',
    tagline: 'Hello, world!',
    description: 'First steps: HTML, CSS, JavaScript and my first React app.',
  },
  {
    id: 2,
    title: 'Junior',
    tagline: 'It works on my machine.',
    description: 'Coding challenges, test assignments and small tools.',
  },
  {
    id: 3,
    title: 'Medior',
    tagline: 'It works on your machine too.',
    description: 'Complete apps with state management, routing, forms and tests.',
  },
  {
    id: 4,
    title: 'Raisin',
    tagline: 'Senior, sun-dried to perfection.',
    description: 'Real-time multiplayer systems with their own servers and tests.',
  },
]

/** Projects are added here one by one; within a level they show in this order. */
export const projects: Project[] = [
  {
    title: 'Matchmaker',
    level: 1,
    year: '2020',
    description:
      'My very first code, my own "Hello, world!": a love calculator, inspired by a game we played on paper at school. Type in two names, it counts the letters of I LOVE YOU in them and adds the neighbouring digits row by row until only a love percentage is left; a button tells you which letters are missing to reach 100%. First written on CodePen in 2020, renovated in 2026.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://mazsola739.github.io/rika-hello-world/',
    repo: 'https://github.com/mazsola739/rika-hello-world',
    image: matchmaker,
  },
  {
    title: 'Rika Ipsum',
    level: 1,
    year: '2021',
    description:
      'A nonsense text generator with 12 flavours of ipsum, from Lorem, Marvel and Meow to Palindrome, Pirate and Meeting Ipsum. It makes paragraphs, sentences, words or a set number of characters, with optional emojis and <p> tags, and every generator has its own link. One HTML file, no build, no dependencies; refreshed in 2026.',
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
      'My Codewars homework from the Junior Front-End Online Program: 169 of 173 katas solved in JavaScript, many of them refactored, and a site to browse them. Search by kata name or by method (e.g. map), filter by kyu, open a kata to see the task and my solution, and see which methods I used the most. Codewars look, with a dark / light mode.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Codewars', 'highlight.js'],
    live: 'https://mazsola739.github.io/rikatas/',
    repo: 'https://github.com/mazsola739/rikatas',
    image: rikatas,
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
  },
  {
    title: 'Next.js Blog',
    level: 2,
    year: '2025',
    description:
      'The home assignment of a junior front-end job application: a responsive blog built from a Figma design, with paginated posts from a mock API, detail pages, tags, reading time, an RSS feed and a light / dark theme. A static export, so it runs on GitHub Pages.',
    tags: ['Next.js', 'React', 'TypeScript', 'SCSS modules', 'Static export'],
    live: 'https://mazsola739.github.io/rika-nextjs-blog/',
    repo: 'https://github.com/mazsola739/rika-nextjs-blog',
    image: nextjsBlog,
  },
  {
    title: 'Rikaflix',
    level: 3,
    year: '2024',
    description:
      'A streaming-site-style movie and TV show browser with 600+ titles: search, genre filters, sorting, paging, a detail page and add / edit / delete. It started as the React home task of the EPAM mentoring program and runs fully in the browser, without a server.',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Emotion', 'Formik', 'Vitest'],
    live: 'https://mazsola739.github.io/rikaflix/',
    repo: 'https://github.com/mazsola739/rikaflix',
    image: rikaflix,
  },
]
