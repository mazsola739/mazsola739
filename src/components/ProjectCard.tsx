import type { Project } from '../data/projects.ts'
import { cardButton } from './button.ts'
import { CardBlooms } from './garden/CardBlooms.tsx'
import { GitHubIcon, GlobeIcon } from './icons.tsx'

/** The buttons sit above the card's cover link, so each opens on its own and lights up alone. */
const aboveCover = 'relative z-1'

/**
 * A project: screenshot, year, title, description, tags and links. Tapping or clicking anywhere
 * on the card opens the live site (or the code, when there is no live site), in a new tab.
 *
 * The screenshot on top, below it the year and the links on one row, then the title, the whole
 * description and the tags. Cards side by side in a row are the same height.
 */
export function ProjectCard({ project }: { project: Project }) {
  const main = project.live ? 'live' : 'repo'
  return (
    // On phones the cards sit in a swipeable row (see Projects): fixed width, snapping into place.
    <div className="relative flex w-[min(85%,22rem)] shrink-0 snap-start md:w-auto">
      <article className="relative flex flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-card transition-[scale,border-color,box-shadow] duration-200 hover:border-accent/60 hover:shadow-lg hover:shadow-ink/10 active:scale-[0.98] motion-reduce:transition-none">
        {project.image && (
          <div className="overflow-hidden border-b border-line">
            <img
              className="aspect-16/10 w-full object-cover object-top"
              src={project.image}
              alt={`${project.title} – screenshot`}
              loading="lazy"
            />
          </div>
        )}
        <div className="flex flex-col gap-2.5 p-4 sm:p-5">
          {/* The year and the links share the top row: the links stay at hand without a row of
              their own, and the text below gets the room. */}
          <div className="flex min-h-9 shrink-0 items-center justify-between gap-3">
            <p className="text-xs font-semibold text-muted">{project.year}</p>
            {(project.live || project.repo) && (
              <p className="flex shrink-0 gap-2">
                {project.live && (
                  <a
                    className={`${cardButton.primary} ${aboveCover}`}
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    title="Live site"
                  >
                    <GlobeIcon />
                    <span className="sr-only">Live site of {project.title}</span>
                  </a>
                )}
                {project.repo && (
                  <a
                    className={`${main === 'repo' ? cardButton.primary : cardButton.secondary} ${aboveCover}`}
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    title="Code on GitHub"
                  >
                    <GitHubIcon />
                    <span className="sr-only">Code of {project.title} on GitHub</span>
                  </a>
                )}
              </p>
            )}
          </div>
          <h4 className="text-lg leading-tight font-bold tracking-tight">{project.title}</h4>
          <p className="text-justify text-[0.95rem] hyphens-auto text-muted lg:text-sm lg:leading-relaxed">
            {project.description}
          </p>
          {/* The tags belong to the text: what the project is made of. */}
          {project.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1 pt-0.5" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag} data-pill className="rounded-full px-1.5 py-px text-[0.6rem] pill">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Clicking anywhere else on the card opens the main link too. This cover is a link of
            its own, hidden from screen readers and the keyboard (the buttons are there), so
            hovering the card doesn't light up the button. */}
        {/* biome-ignore lint/a11y/useAnchorContent: a mouse-only duplicate of the button link */}
        <a
          className="absolute inset-0 rounded-2xl"
          href={project.live ?? project.repo}
          target="_blank"
          rel="noreferrer"
          aria-hidden="true"
          tabIndex={-1}
        />
      </article>
      <CardBlooms />
    </div>
  )
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
