import { useEffect, useMemo, useRef, useState } from 'react'
import { BUTTERFLY_WINGS, type FlowerKind, isTall, type Wings } from './art.tsx'
import { Flutter, type Spot } from './Flutter.tsx'
import { newSeed, pickAvoiding, seededRandom } from './random.ts'
import { ShyFlower } from './ShyFlower.tsx'

/** Daisies, peonies and tulips come up more often, like on the card. */
const KINDS: FlowerKind[] = [
  'daisy',
  'daisy',
  'red',
  'yellow',
  'blue',
  'orange',
  'pink',
  'white',
  'purple',
  'peony',
  'peony',
  'tulip',
  'tulip',
  'sprig',
  'star',
  'star',
]

/** Small flowers that grow next to a bigger one (no stems: they would cross). */
const COMPANIONS: FlowerKind[] = ['daisy', 'white', 'red', 'yellow', 'purple', 'star']

type Bloom = {
  id: number
  kind: FlowerKind
  x: number
  y: number
  size: number
  rotate: number
  delay: number
  duration: number
}

type Resting = { id: number; wings: Wings; size: number; start: Spot }

/** The page column is at most 1040px wide (see the wrapper utility), with a 1rem gutter. */
const COLUMN = 1040
/** All butterflies are the same size. */
const BUTTERFLY_SIZE = 40
/** A new flower is never the same kind as the last few ones… */
const RECENT = 5
/** …nor closer than this (px, centre to centre) to another flower of its kind. */
const SAME_KIND_GAP = 280

/** Remembers the last few kinds, so the next pick can avoid them. */
function recentKinds() {
  const kinds: FlowerKind[] = []
  return {
    kinds,
    add(kind: FlowerKind) {
      kinds.push(kind)
      if (kinds.length > RECENT) kinds.shift()
    },
  }
}

const centre = (bloom: Bloom) => ({
  x: bloom.x + bloom.size / 2,
  y: bloom.y + (isTall(bloom.kind) ? bloom.size * 0.75 : bloom.size / 2),
})

/** True if a flower of the same kind already grows within SAME_KIND_GAP of (x, y). */
const kindNearby = (blooms: Bloom[], kind: FlowerKind, x: number, y: number) =>
  blooms.some((bloom) => {
    if (bloom.kind !== kind) return false
    const c = centre(bloom)
    return Math.hypot(c.x - x, c.y - y) < SAME_KIND_GAP
  })

const gutterOf = (width: number) => (width - Math.min(width - 32, COLUMN)) / 2

/**
 * A random x (px) outside the text column: anywhere in the side margins on wide screens,
 * right at the edge (partly off-screen) on narrow ones.
 */
function marginX(random: () => number, width: number, size: number, side: 'left' | 'right') {
  const gutter = gutterOf(width)
  if (gutter >= 90) {
    const room = Math.max(gutter - size - 16, 0)
    return side === 'left' ? 8 + random() * room : width - 8 - size - random() * room
  }
  // Only about 40% shows, so it stays inside the 1rem gutter and off the text.
  return side === 'left' ? -size * 0.6 : width - size * 0.4
}

/**
 * Scatters flowers down the page edges, outside the text column. Each slot gets one flower per
 * side at a random height, so they never pile up; on wide screens about every fifth one has a
 * small companion growing next to it.
 */
function scatterFlowers(width: number, height: number, seed: number): Bloom[] {
  if (!width || !height) return []
  const random = seededRandom(seed)
  const gutter = gutterOf(width)
  const wide = gutter >= 90
  const step = wide ? 380 : 600
  const blooms: Bloom[] = []
  const recent = recentKinds()
  const sway = () => ({ delay: -random() * 4, duration: 2.4 + random() * 1.6 })

  for (let top = 90, slot = 0; top < height - 90; top += step, slot++) {
    const sides = wide
      ? (['left', 'right'] as const)
      : ([slot % 2 === 0 ? 'left' : 'right'] as const)
    for (const side of sides) {
      const kind = pickAvoiding(random, KINDS, recent.kinds)
      recent.add(kind)
      const base = wide ? 22 + random() * 14 : 24 + random() * 8
      const size = Math.round(base * (kind === 'star' ? 0.85 : 1))
      const tall = isTall(kind) ? size * 1.5 : size
      const x = marginX(random, width, size, side)
      const y = top + random() * Math.max(step - tall, 0)
      blooms.push({
        id: blooms.length,
        kind,
        x,
        y,
        size,
        rotate: Math.round(random() * 50 - 25),
        ...sway(),
      })

      if (wide && random() < 0.12) {
        const small = Math.round(size * (0.7 + random() * 0.15))
        // Next to the flower, towards the inside of the margin, a little lower.
        const inward = side === 'left' ? 1 : -1
        const cx = x + inward * (size * 0.7 + random() * size * 0.4)
        const minX = side === 'left' ? 4 : width - gutter + 8
        const maxX = side === 'left' ? gutter - small - 8 : width - small - 4
        const companion = pickAvoiding(random, COMPANIONS, recent.kinds)
        recent.add(companion)
        blooms.push({
          id: blooms.length,
          kind: companion,
          x: Math.min(Math.max(cx, minX), maxX),
          y: y + tall * (0.4 + random() * 0.4),
          size: small,
          rotate: Math.round(random() * 60 - 30),
          ...sway(),
        })
      }
    }
  }
  return blooms
}

/** The page parts a flower inside the column must never cover: text, cards, images, buttons. */
const OBSTACLES =
  '#main :is(h1, h2, h3, h4, p, ul, img, article, a, button, span), #main .rounded-2xl, footer p'

type Box = { left: number; top: number; right: number; bottom: number }

const overlaps = (a: Box, b: Box) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top

const grow = (box: Box, by: number): Box => ({
  left: box.left - by,
  top: box.top - by,
  right: box.right + by,
  bottom: box.bottom + by,
})

/**
 * Scatters smaller flowers inside the page column too, but only into the empty gaps: between
 * the sections, under the level descriptions, next to a lonely card. It measures where the text,
 * cards, images and buttons are, and tries random spots until enough of them are free.
 */
function scatterInside(layer: HTMLElement, seed: number, edge: Bloom[]): Bloom[] {
  const width = layer.clientWidth
  const height = layer.clientHeight
  if (!width || !height) return []
  const origin = layer.getBoundingClientRect()
  const taken = [...document.querySelectorAll(OBSTACLES)]
    .map((element) => {
      const rect = element.getBoundingClientRect()
      return grow(
        {
          left: rect.left - origin.left,
          top: rect.top - origin.top,
          right: rect.right - origin.left,
          bottom: rect.bottom - origin.top,
        },
        14,
      )
    })
    .filter((box) => box.right > box.left && box.bottom > box.top)

  const random = seededRandom(seed ^ 0x27d4eb2d)
  const gutter = Math.max(gutterOf(width), 8)
  const wanted = Math.round(height / (gutter >= 90 ? 420 : 700))
  const placed: Box[] = []
  const blooms: Bloom[] = []
  const recent = recentKinds()

  for (let attempt = 0; attempt < wanted * 80 && blooms.length < wanted; attempt++) {
    const kind = pickAvoiding(random, KINDS, recent.kinds)
    const size = Math.round((20 + random() * 10) * (kind === 'star' ? 0.9 : 1))
    const tall = isTall(kind) ? size * 1.5 : size
    const x = gutter + random() * Math.max(width - 2 * gutter - size, 1)
    // Not under the sticky header at the very top, nor in the footer's last pixels.
    const y = 90 + random() * Math.max(height - 160 - tall, 1)
    const box = { left: x, top: y, right: x + size, bottom: y + tall }
    if (taken.some((other) => overlaps(box, other))) continue
    // Keep some room between two flowers, so they don't bunch up.
    if (placed.some((other) => overlaps(box, grow(other, 40)))) continue
    // And keep look-alikes apart, from the edge flowers too.
    if (kindNearby([...edge, ...blooms], kind, x + size / 2, y + tall / 2)) continue
    recent.add(kind)
    placed.push(box)
    blooms.push({
      id: 10_000 + blooms.length,
      kind,
      x,
      y,
      size,
      rotate: Math.round(random() * 50 - 25),
      delay: -random() * 4,
      duration: 2.4 + random() * 1.6,
    })
  }
  return blooms
}

/** A spot for a resting butterfly (as percentages of the field), in a margin at height y (px). */
function restingSpot(random: () => number, width: number, height: number, y: number): Spot {
  const side = random() < 0.5 ? 'left' : 'right'
  const narrow = gutterOf(width) < 90
  // On narrow screens it clings to the very edge, mostly visible.
  const x = narrow
    ? side === 'left'
      ? BUTTERFLY_SIZE * 0.3
      : width - BUTTERFLY_SIZE * 0.3
    : marginX(random, width, BUTTERFLY_SIZE, side) + BUTTERFLY_SIZE / 2
  return {
    left: (x / width) * 100,
    top: (y / height) * 100,
    rotate: Math.round(random() * 70 - 35),
  }
}

/** One resting butterfly of each kind: the first two near the top, so they are seen right away. */
function placeButterflies(width: number, height: number, seed: number): Resting[] {
  if (!width || !height) return []
  const random = seededRandom(seed ^ 0x5bd1e995)
  return BUTTERFLY_WINGS.map((wings, id) => {
    const y = id < 2 ? 140 + random() * 420 : 200 + random() * Math.max(height - 400, 1)
    return { id, wings, size: BUTTERFLY_SIZE, start: restingSpot(random, width, height, y) }
  })
}

/**
 * The garden around the page: flowers in the margins (they close when clicked) and
 * butterflies resting in the margins (they fly off to a new spot when clicked).
 */
export function FlowerField() {
  const ref = useRef<HTMLDivElement>(null)
  const [seed] = useState(newSeed)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const layer = ref.current
    if (!layer) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      // Re-scatter only on real changes (not on every image that loads a few pixels taller).
      setSize((prev) =>
        Math.abs(prev.width - width) < 1 && Math.abs(prev.height - height) < 150
          ? prev
          : { width, height },
      )
    })
    observer.observe(layer)
    return () => observer.disconnect()
  }, [])

  const edgeBlooms = useMemo(() => scatterFlowers(size.width, size.height, seed), [size, seed])
  const butterflies = useMemo(() => placeButterflies(size.width, size.height, seed), [size, seed])

  // The inner flowers need the laid-out page (where the text and the cards are), so they are
  // placed after it has rendered, and again whenever the page size really changes.
  const [innerBlooms, setInnerBlooms] = useState<Bloom[]>([])
  useEffect(() => {
    const layer = ref.current
    if (!layer || !size.width || !size.height) return
    setInnerBlooms(scatterInside(layer, seed, edgeBlooms))
  }, [size.width, size.height, seed, edgeBlooms])

  const blooms = [...edgeBlooms, ...innerBlooms]

  /** A new landing spot somewhere in the part of the page that is on screen now. */
  const nextSpot = (): Spot => {
    const layer = ref.current
    const width = layer?.clientWidth ?? size.width
    const height = layer?.clientHeight ?? size.height
    const top = layer ? -layer.getBoundingClientRect().top : window.scrollY
    const y = top + 100 + Math.random() * Math.max(window.innerHeight - 200, 1)
    return restingSpot(Math.random, width, height, Math.min(Math.max(y, 80), height - 80))
  }

  return (
    <>
      <div
        ref={ref}
        aria-hidden="true"
        // Above the page content (whose transparent boxes would catch the clicks), below the sticky
        // header. The flowers sit in the margins and in empty gaps, so they cover nothing.
        className="pointer-events-none absolute inset-0 z-5 overflow-hidden"
      >
        {blooms.map((bloom) => (
          <div
            key={bloom.id}
            className="absolute"
            style={{
              left: bloom.x,
              top: bloom.y,
              width: bloom.size,
              height: isTall(bloom.kind) ? bloom.size * 1.5 : bloom.size,
              transform: `rotate(${bloom.rotate}deg)`,
            }}
          >
            <ShyFlower
              kind={bloom.kind}
              // Round flowers wobble around their middle, the ones with a stem from their foot.
              className={`size-full animate-sway motion-reduce:animate-none ${isTall(bloom.kind) ? 'origin-bottom' : 'origin-center'}`}
              style={{
                animationDelay: `${bloom.delay}s`,
                animationDuration: `${bloom.duration}s`,
              }}
            />
          </div>
        ))}
      </div>
      {/* Above the content, so a butterfly can fly over the cards. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {butterflies.map((butterfly) => (
          <Flutter
            key={butterfly.id}
            wings={butterfly.wings}
            size={butterfly.size}
            start={butterfly.start}
            nextSpot={nextSpot}
          />
        ))}
      </div>
    </>
  )
}
