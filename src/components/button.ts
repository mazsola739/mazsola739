/** The big pill button: the contact form's Send button. */
export const button = {
  primary:
    'inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-2.5 font-semibold text-[0.95rem] text-surface transition-colors',
}

/**
 * The small pill buttons of the sticky header (CV, GitHub, GitLab, Contact me): only the icon on
 * phones, the icon and the label from md. They are the size of the theme button next to them,
 * and on hover they turn raspberry like every other round button on the page.
 */
const pill =
  'inline-flex size-8 shrink-0 items-center justify-center gap-1.5 rounded-full border text-sm font-semibold transition-colors sm:size-9 md:size-auto md:px-3.5 md:py-1.5'

export const headerButton = {
  primary: `${pill} border-ink bg-ink text-surface hover:border-accent hover:bg-accent`,
  secondary: `${pill} border-line bg-button text-ink hover:border-accent hover:text-accent`,
}

/**
 * The links at the bottom of a project card, sharing the width of the row: the site filled, the code outlined, both small
 * pills that turn raspberry on hover like the header's buttons.
 */
const cardPill =
  'inline-flex flex-1 items-center justify-center gap-1 rounded-full border px-2.5 py-1.5 text-[0.8rem] font-semibold whitespace-nowrap transition-colors sm:gap-1.5 sm:px-3.5 sm:text-sm'

export const cardButton = {
  primary: `${cardPill} border-ink bg-ink text-surface hover:border-accent hover:bg-accent`,
  secondary: `${cardPill} border-line bg-button text-ink hover:border-accent hover:text-accent`,
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
