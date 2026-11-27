import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  subtitle?: string
  /** Controls next to the title (e.g. a switch); on phones they go under the subtitle. */
  actions?: ReactNode
  children: ReactNode
}

export function Section({ id, title, subtitle, actions, children }: SectionProps) {
  return (
    <section
      id={id}
      className="wrapper py-[clamp(1.5rem,4vw,2.5rem)]"
      aria-labelledby={`${id}-title`}
    >
      <header className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="min-w-0 flex-[1_1_20rem]">
          <h2
            id={`${id}-title`}
            className="text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-bold tracking-tight"
          >
            {title}
          </h2>
          {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
        </div>
        {actions}
      </header>
      {children}
    </section>
  )
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
