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
 *
 * Up to lg the card is portrait: the screenshot on top, the text below it. From lg it is
 * landscape, one card per row: the screenshot on the left with the tags and links under it, the
 * text on the right. So a level with a single project fills its row too.
 */
export function ProjectCard({ project }: { project: Project }) {
  const main = project.live ? 'live' : 'repo'
  return (
    // On phones the cards sit in a swipeable row (see Projects): fixed width, snapping into place.
    <div className="relative flex w-[min(85%,22rem)] shrink-0 snap-start md:w-auto">
      <article className="relative flex flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[scale,border-color,box-shadow] duration-200 hover:border-accent/60 hover:shadow-lg hover:shadow-ink/10 active:scale-[0.98] motion-reduce:transition-none lg:grid lg:grid-cols-[2fr_3fr] lg:grid-rows-[auto_1fr] lg:active:scale-[0.99]">
        {project.image && (
          <img
            className="aspect-16/10 w-full border-b border-line object-cover object-top lg:border-r"
            src={project.image}
            alt={`${project.title} – screenshot`}
            loading="lazy"
          />
        )}
        <div className="flex flex-col gap-2.5 px-4 pt-4 sm:px-5 sm:pt-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pb-5">
          <p className="text-xs font-semibold text-muted">{project.year}</p>
          <h4 className="text-lg leading-tight font-bold tracking-tight">{project.title}</h4>
          <p className="text-[0.95rem] text-muted">{project.description}</p>
        </div>
        {/* Footer. Portrait: pushed to the bottom, so the links of cards in one row line up.
            Landscape: right under the screenshot. */}
        <div className="mt-auto grid gap-2.5 px-4 pt-3.5 pb-4 sm:px-5 sm:pb-5 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:content-start lg:pt-5">
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
      </article>
      <CardBlooms />
    </div>
  )
}
