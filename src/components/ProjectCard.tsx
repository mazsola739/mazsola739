import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects.ts'
import { CardBlooms } from './garden/CardBlooms.tsx'
import { GitHubIcon, GlobeIcon } from './icons.tsx'

const linkClass = 'inline-flex items-center gap-1.5 font-semibold text-accent hover:underline'
/** The card's main link stretches over the whole card (its ::after covers the article). */
const coverCard = 'after:absolute after:inset-0 after:rounded-2xl'
/** The other link sits above that cover, so it still opens on its own. */
const aboveCover = 'relative z-1'

/**
 * From lg every card is the same height, and the description gets whatever room is left. This
 * counts how many whole lines fit in it and sets --lines, which clamps the text to them: a text
 * that doesn't fit ends in "…" on its last line instead of being cut through the middle.
 */
function useFittingLines() {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const text = ref.current
    if (!text) return
    const fit = () => {
      const style = getComputedStyle(text)
      const line = Number.parseFloat(style.lineHeight) || Number.parseFloat(style.fontSize) * 1.5
      // +1: clientHeight is rounded, and the last line must not be lost to a fraction of a pixel.
      const lines = Math.max(1, Math.floor((text.clientHeight + 1) / line))
      text.style.setProperty('--lines', String(lines))
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(text)
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
 * screenshot, the right half the year, title, description, tags and links. The description is
 * clamped to the room left (see useFittingLines).
 */
export function ProjectCard({ project }: { project: Project }) {
  const main = project.live ? 'live' : 'repo'
  const description = useFittingLines()
  return (
    // On phones the cards sit in a swipeable row (see Projects): fixed width, snapping into place.
    <div className="relative flex w-[min(85%,22rem)] shrink-0 snap-start md:w-auto">
      <article className="relative flex flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[scale,border-color,box-shadow] duration-200 hover:border-accent/60 hover:shadow-lg hover:shadow-ink/10 active:scale-[0.98] motion-reduce:transition-none lg:grid lg:h-80 lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)_auto] lg:active:scale-[0.99]">
        {project.image && (
          <img
            className="aspect-16/10 w-full border-b border-line object-cover object-top lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:h-full lg:border-r lg:border-b-0 lg:object-left-top"
            src={project.image}
            alt={`${project.title} – screenshot`}
            loading="lazy"
          />
        )}
        <div className="flex flex-col gap-2.5 px-4 pt-4 sm:px-5 sm:pt-5 lg:col-start-2 lg:row-start-1 lg:min-h-0">
          <p className="text-xs font-semibold text-muted">{project.year}</p>
          <h4 className="text-lg leading-tight font-bold tracking-tight">{project.title}</h4>
          <p
            ref={description}
            className="text-[0.95rem] text-muted lg:line-clamp-(--lines) lg:min-h-0 lg:flex-1"
          >
            {project.description}
          </p>
        </div>
        {/* Footer: pushed to the bottom, so the links of cards in one row line up. */}
        <div className="mt-auto grid gap-2.5 px-4 pt-3.5 pb-4 sm:px-5 sm:pb-5 lg:col-start-2 lg:row-start-2">
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
