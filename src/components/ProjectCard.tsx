import type { Project } from '../data/projects.ts'
import { CardBlooms } from './garden/CardBlooms.tsx'
import { GitHubIcon, GlobeIcon } from './icons.tsx'

const linkClass = 'inline-flex items-center gap-1.5 font-semibold text-accent hover:underline'

export function ProjectCard({ project }: { project: Project }) {
  return (
    // On phones the cards sit in a swipeable row (see Projects): fixed width, snapping into place.
    <div className="relative flex w-[min(85%,22rem)] shrink-0 snap-start md:w-auto">
      <article className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-surface">
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
                  <a className={linkClass} href={project.live} target="_blank" rel="noreferrer">
                    <GlobeIcon />
                    Live demo
                  </a>
                )}
                {project.repo && (
                  <a className={linkClass} href={project.repo} target="_blank" rel="noreferrer">
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
