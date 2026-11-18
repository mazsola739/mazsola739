import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  subtitle: string
  children: ReactNode
}

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section
      id={id}
      className="wrapper border-t border-line py-[clamp(3rem,8vw,5rem)]"
      aria-labelledby={`${id}-title`}
    >
      <header className="mb-10">
        <h2
          id={`${id}-title`}
          className="text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-bold tracking-tight"
        >
          {title}
        </h2>
        <p className="mt-2 text-muted">{subtitle}</p>
      </header>
      {children}
    </section>
  )
}
