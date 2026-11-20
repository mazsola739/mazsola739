import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  subtitle: string
  /** Controls next to the title (e.g. a switch); on phones they go under the subtitle. */
  actions?: ReactNode
  children: ReactNode
}

export function Section({ id, title, subtitle, actions, children }: SectionProps) {
  return (
    <section
      id={id}
      className="wrapper border-t border-line py-[clamp(3rem,8vw,5rem)]"
      aria-labelledby={`${id}-title`}
    >
      <header className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="min-w-0 flex-[1_1_20rem]">
          <h2
            id={`${id}-title`}
            className="text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-bold tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-2 text-muted">{subtitle}</p>
        </div>
        {actions}
      </header>
      {children}
    </section>
  )
}
