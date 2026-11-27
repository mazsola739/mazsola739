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
 * A round button, the shape of the level badges, turns the order round. It sits at both ends of
 * the timeline, joined to it by the line: at the top in front of the subtitle, and at the bottom
 * after the last badge. It shows the picture of where the new order starts (a sprout for Noob,
 * grapes for Raisin); the text next to it ends in the words of what it does.
 */
const ORDERS: Record<
  Order,
  { subtitle: string; bottom: string; label: string; icon: ReactNode; next: Order }
> = {
  'raisin-first': {
    subtitle:
      'Aged to perfection on top, fresh sprouts at the bottom. Fancy the origin story instead?',
    bottom: 'Back at the seed, where it all began. Watch it grow the other way round?',
    label: 'Rewind to the seed',
    icon: <SproutIcon />,
    next: 'noob-first',
  },
  'noob-first': {
    subtitle: 'Watch it grow, from a tiny seed to a wrinkly raisin. Too slow for you?',
    bottom: 'Still growing, with no end in sight. Rather start with the ripest?',
    label: 'Skip to the raisin',
    icon: <GrapesIcon className="fill-grape" />,
    next: 'raisin-first',
  },
}

/**
 * The switch with its text. `stop` is the line's colour where the button sits: the line runs
 * into it, and its border takes that colour; `scroll` jumps back to the top of the projects (for
 * the bottom switch, which would otherwise leave the visitor at the far end of the new order).
 */
function OrderSwitch({
  order,
  onChange,
  text,
  stop,
  scroll,
  className = '',
}: {
  order: Order
  onChange: (order: Order) => void
  text: string
  stop: string
  scroll?: boolean
  className?: string
}) {
  const { label, icon, next } = ORDERS[order]
  return (
    <div className={`flex items-center gap-3 md:gap-x-3 ${className}`}>
      <button
        type="button"
        data-stop={stop}
        aria-label={label}
        title={label}
        className="relative grid h-8 w-12 shrink-0 cursor-pointer place-items-center rounded-full border-2 border-(--stop) bg-card text-lg text-ink ring-4 ring-page transition-colors hover:border-accent hover:text-accent"
        style={{ '--stop': stop } as CSSProperties}
        onClick={() => {
          onChange(next)
          // A jump, not a smooth scroll: gliding up the whole page would only be a blur.
          if (scroll) document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' })
        }}
      >
        {icon}
      </button>
      <p className="text-muted">
        {text} <span className="font-semibold text-ink">{label}.</span>
      </p>
    </div>
  )
}

/** How far down the line a row of pills reaches with its right end, in pixels. */
const PILL_REACH = 700

/** 00, before Noob: the start, where nothing has happened yet. */
const START_COLOR = 'var(--color-level-0)'

/**
 * From md the levels form a timeline: the badges sit on one line that runs through the colours,
 * from badge to badge, and on to the badge at its end: 00, the start, below Noob when Raisin comes
 * first; ∞, still growing, below Raisin the other way round.
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
      const end = stops[stops.length - 1].y
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

/** ∞, after Raisin: the learning goes on. In Raisin's wine colour, where the line ends. */
const ENDLESS_COLOR = 'var(--color-level-4)'

/**
 * The badge at the end of the line, only on the timeline (from md). Raisin first: 00 in sunshine
 * yellow, the start before anything happened. Noob first: ∞ in wine, still growing.
 */
function EndBadge({ raisinFirst }: { raisinFirst: boolean }) {
  const color = raisinFirst ? START_COLOR : ENDLESS_COLOR
  return (
    <div aria-hidden="true" data-stop={color} className="mt-12 hidden md:block">
      <span
        className="relative inline-flex h-8 w-12 items-center justify-center rounded-full text-base font-extrabold text-white tabular-nums ring-4 ring-page [text-shadow:0_1px_2px_rgb(0_0_0/0.3)]"
        style={{ backgroundColor: color }}
      >
        {raisinFirst ? (
          '00'
        ) : (
          <span className="-translate-y-0.5 text-[1.65rem] leading-none">∞</span>
        )}
      </span>
    </div>
  )
}

export function Projects() {
  // Every visit starts with the newest work; the switch only turns it round for this visit.
  const [order, setOrder] = useState<Order>('raisin-first')

  const raisinFirst = order === 'raisin-first'
  const shownLevels = raisinFirst ? [...rankedLevels].reverse() : rankedLevels
  const { subtitle, bottom } = ORDERS[order]
  const { box, line } = useTimeline(order)
  const firstColor = LEVEL_COLORS[shownLevels[0].rank % LEVEL_COLORS.length]
  const endColor = raisinFirst ? START_COLOR : ENDLESS_COLOR

  return (
    <Section id="projects" title="Projects">
      <div ref={box} className="relative">
        <div
          ref={line}
          aria-hidden="true"
          className="absolute left-[calc(1.5rem-2px)] hidden w-1 rounded-full md:block"
        />
        <OrderSwitch
          className="-mt-4 mb-8 md:mb-12"
          order={order}
          onChange={setOrder}
          text={subtitle}
          stop={firstColor}
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
                  where a lone card fills the row (auto-fit). From lg: always two cards side by side. */}
                <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-4 overflow-x-auto px-4 py-5 md:mx-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] md:overflow-visible md:p-0 lg:grid-cols-2 lg:gap-5">
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
        <EndBadge raisinFirst={raisinFirst} />
        <OrderSwitch
          className="mt-8 md:mt-12"
          order={order}
          onChange={setOrder}
          text={bottom}
          stop={endColor}
          scroll
        />
      </div>
    </Section>
  )
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
