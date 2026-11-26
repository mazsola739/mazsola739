import { type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { levels, projects } from '../data/projects.ts'
import { GrapesIcon, SproutIcon } from './icons.tsx'
import { ProjectCard } from './ProjectCard.tsx'
import { Section } from './Section.tsx'

/**
 * Level colors from Noob up to Raisin, the sunset darkening into a wine-coloured raisin: orange,
 * pink, raspberry, wine. Each level's badge and its stretch of the line get its own, so the
 * colours stay the same whichever way the levels run.
 */
const LEVEL_COLORS = [
  'var(--color-level-1)',
  'var(--color-level-2)',
  'var(--color-level-3)',
  'var(--color-level-4)',
]
/** Text on the badge: white on every level colour. */
const BADGE_TEXT = ['text-white', 'text-white', 'text-white', 'text-white']

/** `rank` is the level's place from Noob up; its color follows it. */
const rankedLevels = levels.map((level, rank) => ({ level, rank }))

/**
 * The visitor can read the levels either way. By default the newest work comes first: Raisin on
 * top, the golden horn above the mane, then down to Noob, and in each level the newest project
 * first. The other way starts with my very first code and grows up to Raisin.
 */
type Order = 'raisin-first' | 'noob-first'

/**
 * One button next to the section title turns the order round. It says in words what it does, with
 * the picture of where it starts: a sprout for Noob, grapes for Raisin. The subtitle's question
 * leads to it.
 */
const ORDERS: Record<Order, { subtitle: string; button: ReactNode; next: Order }> = {
  'raisin-first': {
    subtitle:
      'Aged to perfection on top, fresh sprouts at the bottom. Fancy the origin story instead?',
    button: (
      <>
        <SproutIcon />
        Rewind to the seed
      </>
    ),
    next: 'noob-first',
  },
  'noob-first': {
    subtitle: 'Watch it grow, from a tiny seed to a wrinkly raisin. Too slow for you?',
    button: (
      <>
        <GrapesIcon className="fill-grape" />
        Skip to the raisin
      </>
    ),
    next: 'raisin-first',
  },
}

function OrderButton({ order, onChange }: { order: Order; onChange: (order: Order) => void }) {
  const { button, next } = ORDERS[order]
  return (
    <button
      type="button"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-button px-4 py-2 text-sm font-semibold whitespace-nowrap text-ink transition-colors hover:border-accent hover:text-accent"
      onClick={() => onChange(next)}
    >
      {button}
    </button>
  )
}

/** How far down the line a row of pills reaches with its right end, in pixels. */
const PILL_REACH = 700

/** 00, before Noob: the start, where nothing has happened yet. */
const START_COLOR = 'var(--color-level-0)'

/**
 * From md the levels form a timeline: the badges sit on one line that runs through the colours,
 * from badge to badge, and on to 00, the start, below Noob (only when Raisin comes first: the other way round the line
 * simply starts at Noob).
 * The line's gradient has a stop at every badge, so it is measured from the page (useTimeline).
 * The skill pills of the cards take the colour of the line at their height.
 */
function useTimeline(order: Order) {
  const box = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const root = box.current
    if (!root || !order) return
    const paint = () => {
      const top = root.getBoundingClientRect().top
      // Each stop is the middle of a badge (1rem below the top of its level); the hidden 00 on
      // phones is left out.
      const stops = [...root.querySelectorAll<HTMLElement>('[data-stop]')]
        .filter((el) => el.offsetParent !== null)
        .map((el) => ({
          y: el.getBoundingClientRect().top - top + 16,
          color: el.dataset.stop ?? START_COLOR,
        }))
        .sort((a, b) => a.y - b.y)
      if (stops.length === 0) return
      const first = stops[0].y
      const end = Math.max(stops[stops.length - 1].y, root.offsetHeight)
      if (line.current) {
        line.current.style.top = `${first}px`
        line.current.style.height = `${end - first}px`
        line.current.style.backgroundImage = `linear-gradient(to bottom, ${stops
          .map((stop) => `${stop.color} ${stop.y - first}px`)
          .join(', ')})`
      }
      // The colour of the line at a height: a mix of the two badges' colours around it.
      const colorAt = (y: number) => {
        const next = stops.findIndex((stop) => stop.y > y)
        if (next === -1) return stops[stops.length - 1].color
        if (next === 0) return stops[0].color
        const a = stops[next - 1]
        const b = stops[next]
        const share = Math.round(((b.y - y) / (b.y - a.y)) * 100)
        return `color-mix(in oklab, ${a.color} ${share}%, ${b.color})`
      }
      for (const pill of root.querySelectorAll<HTMLElement>('[data-pill]')) {
        const rect = pill.getBoundingClientRect()
        // A card's row of pills runs, left to right, from the line's colour at its height to the
        // colour PILL_REACH further down; each pill shows its own piece of that change.
        const row = pill.parentElement?.getBoundingClientRect() ?? rect
        const y = rect.top + rect.height / 2 - top
        const at = (x: number) => colorAt(y + ((x - row.left) / row.width) * PILL_REACH)
        pill.style.setProperty('--pill-a', at(rect.left))
        pill.style.setProperty('--pill-b', at(rect.right))
      }
    }
    paint()
    // Cards grow when their screenshots load, and the page reflows on resize.
    const observer = new ResizeObserver(paint)
    observer.observe(root)
    return () => observer.disconnect()
  }, [order])
  return { box, line }
}

/** The 00 badge: sunshine yellow, the start before anything happened. Only on the timeline (from md). */
function StartBadge({ className }: { className: string }) {
  return (
    <div aria-hidden="true" data-stop={START_COLOR} className={`hidden md:block ${className}`}>
      <span className="relative inline-block w-12 rounded-full bg-(--color-level-0) py-1 text-center text-base font-extrabold text-white tabular-nums ring-4 ring-page [text-shadow:0_1px_2px_rgb(0_0_0/0.3)]">
        00
      </span>
    </div>
  )
}

export function Projects() {
  // Every visit starts with the newest work; the switch only turns it round for this visit.
  const [order, setOrder] = useState<Order>('raisin-first')

  const raisinFirst = order === 'raisin-first'
  const shownLevels = raisinFirst ? [...rankedLevels].reverse() : rankedLevels
  const { subtitle } = ORDERS[order]
  const { box, line } = useTimeline(order)

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle={subtitle}
      actions={<OrderButton order={order} onChange={setOrder} />}
    >
      <div ref={box} className="relative">
        <div
          ref={line}
          aria-hidden="true"
          className="absolute left-[calc(1.5rem-2px)] hidden w-1 rounded-full md:block"
        />
        <ol className="grid gap-8 md:gap-12">
          {shownLevels.map(({ level, rank }) => {
            // The data lists the projects oldest first; newest first, they are turned round.
            const inLevel = projects.filter((project) => project.level === level.id)
            const items = raisinFirst ? inLevel.reverse() : inLevel
            const color = LEVEL_COLORS[rank % LEVEL_COLORS.length]
            return (
              <li
                key={level.id}
                data-stop={color}
                style={{ '--level': color } as CSSProperties}
                className="relative grid gap-1 md:grid-cols-[19rem_1fr] md:gap-8"
              >
                {/* The column is as tall as the level and kept clear of the garden's flowers
                  (data-keep-clear), because the text slides down in it while scrolling. */}
                <div data-keep-clear>
                  {/* From md: badge on the left, the text next to it; stays in view while scrolling. */}
                  <div className="md:sticky md:top-24 md:grid md:grid-cols-[3rem_1fr] md:items-start md:gap-x-3">
                    <span
                      className={`inline-block w-12 rounded-full bg-(--level) py-1 text-center text-base font-extrabold tabular-nums ring-4 ring-page ${BADGE_TEXT[rank % BADGE_TEXT.length]}`}
                    >
                      {String(level.id).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1 flex flex-wrap items-baseline gap-x-2 md:mt-0.5">
                      <span className="text-2xl leading-tight font-extrabold tracking-tight">
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
                    <p className="text-[0.95rem] hyphens-auto text-muted md:col-start-2 md:text-justify">
                      {level.description}
                    </p>
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
        {raisinFirst && <StartBadge className="mt-12" />}
      </div>
    </Section>
  )
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
