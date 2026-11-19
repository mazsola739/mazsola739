import { levels, projects } from '../data/projects.ts'
import { ProjectCard } from './ProjectCard.tsx'
import { Section } from './Section.tsx'

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="From noob to raisin: my first small projects up to complex systems."
    >
      <ol className="grid gap-8 md:gap-12">
        {levels.map((level) => {
          const items = projects.filter((project) => project.level === level.id)
          return (
            <li key={level.id} className="grid gap-1 md:grid-cols-[15rem_1fr] md:gap-8">
              <div>
                <span className="inline-block rounded-full bg-surface px-2.5 py-0.5 text-sm font-bold text-sky">
                  {String(level.id).padStart(2, '0')}
                </span>
                <h3 className="mt-1 text-xl leading-tight font-bold tracking-tight">
                  {level.title}
                </h3>
                <p className="mt-0.5 mb-2 text-sm text-muted italic">{level.tagline}</p>
                <p className="text-[0.95rem] text-muted">{level.description}</p>
              </div>
              {/* Phones: a row of cards to swipe through, edge to edge, the next card peeking in
                  (the padding leaves room for the flowers on the card borders). From md: a grid. */}
              <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-4 overflow-x-auto px-4 py-5 md:mx-0 md:grid md:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] md:overflow-visible md:p-0">
                {items.length > 0 ? (
                  items.map((project) => <ProjectCard key={project.title} project={project} />)
                ) : (
                  <div className="grid min-h-32 w-full shrink-0 place-items-center rounded-2xl border border-dashed border-line bg-surface/25 p-6 text-center text-[0.95rem] text-muted">
                    Projects for this level are coming soon.
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
