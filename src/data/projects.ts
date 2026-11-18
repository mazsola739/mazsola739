export type Level = {
  id: number
  title: string
  period: string
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

/** The projects go from simple to complex, one level at a time. */
export const levels: Level[] = [
  {
    id: 1,
    title: 'Foundations',
    period: '2020–2021',
    description: 'First steps: HTML, CSS, JavaScript and my first React app.',
  },
  {
    id: 2,
    title: 'Training & challenges',
    period: '2024–2025',
    description: 'A mentoring program, test assignments and small tools.',
  },
  {
    id: 3,
    title: 'Apps of my own',
    period: '2026',
    description: 'Complete apps I designed and built myself.',
  },
  {
    id: 4,
    title: 'Complex systems',
    period: '2023 – present',
    description: 'Real-time multiplayer systems with their own servers and tests.',
  },
]

/** Projects are added here one by one. */
export const projects: Project[] = []
