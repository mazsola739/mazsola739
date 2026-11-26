/** The big pill button: the contact form's Send button. */
export const button = {
  primary:
    'inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-2.5 font-semibold text-[0.95rem] text-surface transition-colors',
}

/**
 * The small pill buttons of the sticky header (CV, GitHub, GitLab, Contact me): only the icon on
 * phones, a size smaller there to leave the page more room; the icon and the label from md. They
 * are the size of the theme button next to them, and on hover they turn raspberry like every
 * other round button on the page.
 */
const pill =
  'inline-flex size-7 shrink-0 items-center justify-center gap-1.5 rounded-full border text-sm font-semibold transition-colors sm:size-9 md:size-auto md:px-3.5 md:py-1.5'

export const headerButton = {
  primary: `${pill} border-ink bg-ink text-surface hover:border-accent hover:bg-accent`,
  secondary: `${pill} border-line bg-button text-ink hover:border-accent hover:text-accent`,
}

/**
 * The links at the bottom of a project card: round icon buttons, the site filled (a globe), the
 * code outlined (the GitHub mark). They turn raspberry on hover like the header's buttons, and
 * stay small, so the project is the first thing to read.
 */
const cardPill = 'grid size-9 place-items-center rounded-full border text-lg transition-colors'

export const cardButton = {
  primary: `${cardPill} border-ink bg-ink text-surface hover:border-accent hover:bg-accent`,
  secondary: `${cardPill} border-line bg-button text-ink hover:border-accent hover:text-accent`,
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
