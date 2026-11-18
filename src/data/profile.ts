export type Link = { label: string; href: string }

export type Profile = {
  name: string
  role: string
  intro: string
  /** Where the CV button points (a PDF in public/, or the live rika-cv). Empty = placeholder button. */
  cv: string
  links: Link[]
}

export const profile: Profile = {
  name: 'Erika Rostás',
  role: 'Front-end Developer',
  intro: 'A short introduction goes here: who I am, what I work on, and what I am most proud of.',
  cv: '',
  links: [
    { label: 'GitHub', href: 'https://github.com/mazsola739' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' },
    // { label: 'E-mail', href: 'mailto:...' },
  ],
}

export const isExternal = (href: string) => href.startsWith('http')
