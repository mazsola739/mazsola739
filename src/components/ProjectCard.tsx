import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects.ts'
import { cardButton } from './button.ts'
import { CardBlooms } from './garden/CardBlooms.tsx'
import { GitHubIcon, GlobeIcon } from './icons.tsx'

/** The buttons sit above the card's cover link, so each opens on its own and lights up alone. */
const aboveCover = 'relative z-1'

/**
 * From lg every card is the same height. The description takes the room it needs, at most what
 * is left next to the title and the tags. This counts how many whole lines fit and sets --lines,
 * which clamps the text to them: a text that doesn't fit ends in "…" on its last line instead of
 * being cut through the middle. Before measuring, the clamp is lifted, so a card that grows wider
 * or taller gets its lines back.
 */
function useFittingLines() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const text = ref.current
    if (!text) return
    const fit = () => {
      text.style.setProperty('--lines', 'none')
      const style = getComputedStyle(text)
      const line = Number.parseFloat(style.lineHeight) || Number.parseFloat(style.fontSize) * 1.5
      // +1: clientHeight is rounded, and the last line must not be lost to a fraction of a pixel.
      const lines = Math.max(1, Math.floor((text.clientHeight + 1) / line))
      text.style.setProperty('--lines', String(lines))
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(text)
    if (text.parentElement) observer.observe(text.parentElement)
    return () => observer.disconnect()
  }, [])
  return ref
}

/**
 * A project: screenshot, year, title, description, tags and links. Tapping or clicking anywhere
 * on the card opens the live site (or the code, when there is no live site), in a new tab.
 *
 * Up to lg the card is portrait: the screenshot on top, the text below it, all of it shown. From
 * lg it is landscape, one card per row, every card the same height: the left half is the
 * screenshot, the right half the year and the links on one row, then the title, description
 * and tags, centred top to bottom. The description is clamped to the room left (see
 * useFittingLines).
 */
export function ProjectCard({ project }: { project: Project }) {
  const main = project.live ? 'live' : 'repo'
  const description = useFittingLines()
  return (
    // On phones the cards sit in a swipeable row (see Projects): fixed width, snapping into place.
    <div className="relative flex w-[min(85%,22rem)] shrink-0 snap-start md:w-auto">
      <article className="relative flex flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-card transition-[scale,border-color,box-shadow] duration-200 hover:border-accent/60 hover:shadow-lg hover:shadow-ink/10 active:scale-[0.98] motion-reduce:transition-none lg:grid lg:h-88 lg:grid-cols-2 lg:grid-rows-1 lg:active:scale-[0.99]">
        {project.image && (
          <div className="overflow-hidden border-b border-line lg:col-start-1 lg:row-start-1 lg:border-r lg:border-b-0">
            {/* The landscape card (from lg) has its own screenshot in its own shape; the browser
                downloads only the one it shows. `contents`: the picture adds no box of its own,
                so the image still fills the frame. */}
            <picture className="contents">
              {project.landscape && (
                <source media="(min-width: 64rem)" srcSet={project.landscape} />
              )}
              <img
                className="aspect-16/10 w-full object-cover object-top lg:aspect-auto lg:h-full"
                src={project.image}
                alt={`${project.title} – screenshot`}
                loading="lazy"
              />
            </picture>
          </div>
        )}
        <div className="flex flex-col gap-2.5 p-4 sm:p-5 lg:col-start-2 lg:row-start-1 lg:min-h-0 lg:justify-center">
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
          {/* The box may shrink to the room left and is measured; the text in it is clamped to
              the whole lines that fit, so no half line peeks out below the "…". */}
          <div
            ref={description}
            className="text-[0.95rem] text-muted lg:min-h-0 lg:shrink lg:text-sm lg:leading-normal"
          >
            <p className="text-justify hyphens-auto lg:line-clamp-(--lines)">
              {project.description}
            </p>
          </div>
          {/* The tags belong to the text: what the project is made of. */}
          {project.tags.length > 0 && (
            <ul className="flex shrink-0 flex-wrap gap-1 pt-0.5" aria-label="Technologies">
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
