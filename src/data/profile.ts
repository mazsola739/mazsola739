export type Link = { label: string; href: string }

export type Profile = {
  name: string
  /** What people call me; shown under the name. */
  nickname: string
  role: string
  intro: string
  /** The year I started coding; the footer counts the years from it. */
  codingSince: number
  /** Where the CV button points (the live CV site, or a PDF in public/). Empty = placeholder button. */
  cv: string
  links: Link[]
}

export const profile: Profile = {
  name: 'Erika Rostás',
  nickname: 'Rika',
  role: 'Full-stack Developer',
  intro:
    "I've been writing code since 2020, from a love calculator on CodePen to full-stack apps. Since 2025 I've been sharpening my skills with AI, with GitHub Copilot and Claude as my everyday pair programmers.",
  codingSince: 2020,
  cv: 'https://mazsola739.github.io/rika-cv/',
  links: [
    { label: 'GitHub', href: 'https://github.com/mazsola739' },
    { label: 'GitLab', href: 'https://gitlab.com/mazsola739' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' },
    // { label: 'E-mail', href: 'mailto:...' },
  ],
}

export const isExternal = (href: string) => href.startsWith('http')
