import { Section } from './Section.tsx'

export function About() {
  return (
    <Section id="about" title="About" subtitle="Who I am and what I work with.">
      <div className="rounded-2xl border border-dashed border-line bg-surface/25 p-6 text-muted">
        An introduction, my work experience and my skills are coming soon.
      </div>
    </Section>
  )
}
