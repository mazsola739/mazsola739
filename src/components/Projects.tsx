import type { CSSProperties } from 'react'
import { levels, projects } from '../data/projects.ts'
import { ProjectCard } from './ProjectCard.tsx'
import { Section } from './Section.tsx'

/**
 * Level colors from Noob up to Raisin, like the rainbow mane that ends in the golden horn:
 * indigo, purple, raspberry, gold. Each badge gets its own, and the line down to the next badge
 * fades into the next one.
 */
const LEVEL_COLORS = [
  'var(--color-mane-1)',
  'var(--color-mane-2)',
  'var(--color-raspberry)',
  'var(--color-gold)',
]
/** Text on the badge: white on the dark colors, dark on the gold. */
const BADGE_TEXT = ['text-white', 'text-white', 'text-white', 'text-midnight']

/**
 * The page shows the newest work first: Raisin on top, the golden horn above the mane, then down
 * the levels to Noob. `rank` is the level's place from Noob up; its color follows it.
 */
const shownLevels = levels.map((level, rank) => ({ level, rank })).reverse()

/**
 * From md the levels form a timeline: the badges sit on a line that runs from level to level.
 * The line is drawn by each level's ::before, from its badge to the next one (the 3rem is the
 * gap between the levels). The level's text stays in view while its cards scroll past, so its
 * badge slides down the line.
 */
const timeline =
  'md:before:absolute md:before:top-3 md:before:left-[calc(1.25rem-1px)] md:before:h-[calc(100%+3rem)] md:before:w-0.5 md:before:rounded-full md:before:bg-linear-to-b md:before:from-(--level) md:before:to-(--next) md:before:opacity-70 md:last:before:hidden'

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="From raisin back to noob: complex systems first, down to the small projects where it all started."
    >
      <ol className="grid gap-8 md:gap-12">
        {shownLevels.map(({ level, rank }) => {
          // Within a level, too, the newest project comes first.
          const items = projects.filter((project) => project.level === level.id).reverse()
          const colors = {
            '--level': LEVEL_COLORS[rank % LEVEL_COLORS.length],
            // The line runs down to the level below, one rank lower.
            '--next': LEVEL_COLORS[(rank + LEVEL_COLORS.length - 1) % LEVEL_COLORS.length],
          } as CSSProperties
          return (
            <li
              key={level.id}
              style={colors}
              className={`relative grid gap-1 md:grid-cols-[17rem_1fr] md:gap-8 ${timeline}`}
            >
              {/* The column is as tall as the level and kept clear of the garden's flowers
                  (data-keep-clear), because the text slides down in it while scrolling. */}
              <div data-keep-clear>
                {/* From md: badge on the left, the text next to it; stays in view while scrolling. */}
                <div className="md:sticky md:top-24 md:grid md:grid-cols-[2.5rem_1fr] md:items-start md:gap-x-3">
                  <span
                    className={`inline-block w-10 rounded-full bg-(--level) py-0.5 text-center text-sm font-bold ${BADGE_TEXT[rank % BADGE_TEXT.length]}`}
                  >
                    {String(level.id).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1 flex flex-wrap items-baseline gap-x-2 md:mt-0">
                    <span className="text-xl leading-tight font-bold tracking-tight">
                      {level.title}
                    </span>
                    {items.length > 0 && (
                      <span className="text-sm font-semibold text-muted">
                        {items.length} {items.length === 1 ? 'project' : 'projects'}
                      </span>
                    )}
                  </h3>
                  <p className="mt-0.5 mb-2 text-sm text-muted italic md:col-start-2">
                    {level.tagline}
                  </p>
                  <p className="text-[0.95rem] text-muted md:col-start-2">{level.description}</p>
                </div>
              </div>
              {/* Phones: a row of cards to swipe through, edge to edge, the next card peeking in
                  (the padding leaves room for the flowers on the card borders). From md: a grid,
                  where a lone card fills the row (auto-fit). From lg: one landscape card per row. */}
              <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-4 overflow-x-auto px-4 py-5 md:mx-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] md:overflow-visible md:p-0 lg:grid-cols-1 lg:gap-5">
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
