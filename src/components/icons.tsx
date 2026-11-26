/**
 * Small inline icons for links. They are decorative (the link text says where it goes),
 * so they are hidden from screen readers and take the text colour and size (1em).
 * GitHub mark: Octicons (MIT). GitLab tanuki: Simple Icons (CC0). Globe, LinkedIn, mail, file,
 * close (x) and arrow up: Lucide (ISC).
 */
type IconProps = { className?: string }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  )
}

export function GitLabIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m23.955 13.587-1.342-4.135-2.664-8.189a.455.455 0 0 0-.867 0L16.418 9.45H7.582L4.919 1.263a.455.455 0 0 0-.867 0L1.388 9.452.046 13.587a.924.924 0 0 0 .331 1.023L12 23.054l11.623-8.443a.92.92 0 0 0 .332-1.024" />
    </svg>
  )
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...stroke}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...stroke}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...stroke}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

/** A page of text: the CV. */
export function FileIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...stroke}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8m8 4H8m8 4H8" />
    </svg>
  )
}

/** An x: closes the contact window. */
export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...stroke}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

/** An arrow pointing up: back to the top of the page. */
export function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...stroke}
    >
      <path d="m5 12 7-7 7 7M12 19V5" />
    </svg>
  )
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...stroke}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...stroke}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

/*
 * Pictograms drawn for this site: a bunch of grapes for Raisin (the senior, sun-dried grape) and
 * a sprout for Noob. They are decorative; the words next to them say what they mean.
 */

/** A bunch of grapes with a leaf and a little shine on each grape. The grapes take the
    `fill-*` color given in `className`. */
export function GrapesIcon({ className }: IconProps) {
  const grapes = [
    [5.6, 7.6],
    [10, 7.6],
    [14.4, 7.6],
    [7.8, 11.6],
    [12.2, 11.6],
    [10, 15.6],
  ]
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1.15em"
      height="1.15em"
      viewBox="0 0 20 20"
    >
      <path d="M10.2 3.6c1.4-1.9 3.6-2.4 5.6-1.6-.6 2.1-2.6 3.3-5.6 1.6Z" fill="#7cb342" />
      <path d="M10 4.2V1.6" stroke="#6a9a2a" strokeWidth="1.4" strokeLinecap="round" />
      {grapes.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" />
      ))}
      <g fill="#ffffff" opacity="0.55">
        {grapes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x - 0.8} cy={y - 0.8} r="0.7" />
        ))}
      </g>
    </svg>
  )
}

/** A sprout: two green leaves on a stem in the text colour. */
export function SproutIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="1.15em"
      height="1.15em"
      viewBox="0 0 20 20"
    >
      <path d="M10 18V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 11C6 11 3.5 8.5 3.5 4.5 7.5 4.5 10 7 10 11Z" fill="#7cb342" />
      <path d="M10 9c0-3.5 2.2-5.6 6.5-5.6 0 3.6-2.4 5.6-6.5 5.6Z" fill="#9ccc65" />
    </svg>
  )
}

/** Picks the icon from the link target: GitHub, LinkedIn, e-mail, or a globe for any other site. */
export function LinkIcon({ href, className }: IconProps & { href: string }) {
  if (href.includes('github.com')) return <GitHubIcon className={className} />
  if (href.includes('gitlab.com')) return <GitLabIcon className={className} />
  if (href.includes('linkedin.com')) return <LinkedInIcon className={className} />
  if (href.startsWith('mailto:')) return <MailIcon className={className} />
  return <GlobeIcon className={className} />
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
