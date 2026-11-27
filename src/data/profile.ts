export type Link = { label: string; href: string }

export type Profile = {
  name: string
  /** What people call me; shown under the name. */
  nickname: string
  role: string
  roleNote: string
  /** How the nickname sounds, written the way a dictionary writes it. */
  pronunciation: string
  /** The intro as a dictionary entry: numbered meanings under the name. */
  definitions: string[]
  /** The entry's last line, like a dictionary's cross-reference. */
  seeAlso: string
  /** The year I started coding; the footer counts the years from it. */
  codingSince: number
  /** Where the CV button points (the live CV site, or a PDF in public/). Empty = placeholder button. */
  cv: string
  /**
   * The access key of the contact form from Web3Forms (https://web3forms.com), which e-mails the
   * messages to me. It is meant to be public: it can only send to my address. Empty = no form,
   * the Contact page only shows the links.
   */
  contactFormKey: string
  links: Link[]
}

export const profile: Profile = {
  name: 'Erika Rostás',
  nickname: 'Rika',
  role: 'Full-stack Developer',
  /** How I work: said next to the role, in the header and on the role's pill in the intro. */
  roleNote: 'AI-assisted',
  pronunciation: '/ˈri.kɒ/',
  definitions: [
    'A developer who has been coding since 2020, from a first “Hello, world!” in a sandbox to full-stack apps.',
    'Someone whose everyday pair programmer is Claude (GitHub Copilot and ChatGPT lend a hand too).',
  ],
  seeAlso: 'unicorn',
  codingSince: 2020,
  cv: 'https://mazsola739.github.io/rika-cv/',
  contactFormKey: '8674bf2a-c248-426a-aed4-379fa983cb34',
  links: [
    { label: 'GitHub', href: 'https://github.com/mazsola739' },
    { label: 'GitLab', href: 'https://gitlab.com/mazsola739' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' },
    // { label: 'E-mail', href: 'mailto:...' },
  ],
}

export const isExternal = (href: string) => href.startsWith('http')

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
