import type { Project } from '../data/projects.ts'
import { CardBlooms } from './garden/CardBlooms.tsx'
import { GitHubIcon, GlobeIcon } from './icons.tsx'

const linkClass = 'inline-flex items-center gap-1.5 font-semibold text-accent hover:underline'
/** The card's main link stretches over the whole card (its ::after covers the article). */
const coverCard = 'after:absolute after:inset-0 after:rounded-2xl'
/** The other link sits above that cover, so it still opens on its own. */
const aboveCover = 'relative z-1'

/**
 * A project: screenshot, year, title, description, tags and links. Tapping or clicking anywhere
 * on the card opens the live site (or the code, when there is no live site), in a new tab.
 */
export function ProjectCard({ project }: { project: Project }) {
  const main = project.live ? 'live' : 'repo'
  return (
    // On phones the cards sit in a swipeable row (see Projects): fixed width, snapping into place.
    <div className="relative flex w-[min(85%,22rem)] shrink-0 snap-start md:w-auto">
      <article className="relative flex flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[scale,border-color,box-shadow] duration-200 hover:border-accent/60 hover:shadow-lg hover:shadow-ink/10 active:scale-[0.98] motion-reduce:transition-none">
        {project.image && (
          <img
            className="aspect-16/10 w-full border-b border-line object-cover object-top"
            src={project.image}
            alt={`${project.title} – screenshot`}
            loading="lazy"
          />
        )}
        <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
          <p className="text-xs font-semibold text-muted">{project.year}</p>
          <h4 className="text-lg leading-tight font-bold tracking-tight">{project.title}</h4>
          <p className="text-[0.95rem] text-muted">{project.description}</p>
          {/* Footer: pushed to the bottom, so the links of cards in one row line up. */}
          <div className="mt-auto grid gap-2.5 pt-1">
            {project.tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-sky/15 px-2.5 py-0.5 text-xs">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            {(project.live || project.repo) && (
              <p className="flex gap-4">
                {project.live && (
                  <a
                    className={`${linkClass} ${coverCard}`}
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GlobeIcon />
                    Live demo
                  </a>
                )}
                {project.repo && (
                  <a
                    className={`${linkClass} ${main === 'repo' ? coverCard : aboveCover}`}
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon />
                    Code
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
      </article>
      <CardBlooms />
    </div>
  )
}
