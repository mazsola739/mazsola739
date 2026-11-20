import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BUTTERFLIES,
  type FlowerKind,
  isTall,
  ROUND_FLOWERS,
  STARS,
  TALL_FLOWERS,
  TALL_RATIO,
} from './art.tsx'
import { Flutter, type Spot } from './Flutter.tsx'
import { newSeed, pickAvoiding, seededRandom } from './random.ts'
import { ShyFlower } from './ShyFlower.tsx'

/** Flower heads come up twice as often as the flowers with a stem and the stars. */
const KINDS: FlowerKind[] = [...ROUND_FLOWERS, ...ROUND_FLOWERS, ...TALL_FLOWERS, ...STARS]

/** Small flowers that grow next to a bigger one (no stems: they would cross). */
const COMPANIONS: FlowerKind[] = [...ROUND_FLOWERS, ...STARS]

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

type Resting = { id: number; src: string; size: number; start: Spot }

/** The page column is at most 1040px wide (see the wrapper utility), with a 1rem gutter. */
const COLUMN = 1040
/** All butterflies are the same size. */
const BUTTERFLY_SIZE = 40
/** On phones (no margins) only a few butterflies, resting in the empty gaps. */
const PHONE_BUTTERFLIES = 4
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
  y: bloom.y + (isTall(bloom.kind) ? (bloom.size * TALL_RATIO) / 2 : bloom.size / 2),
})

/** True if a flower of the same kind already grows within SAME_KIND_GAP of (x, y). */
const kindNearby = (blooms: Bloom[], kind: FlowerKind, x: number, y: number) =>
  blooms.some((bloom) => {
    if (bloom.kind !== kind) return false
    const c = centre(bloom)
    return Math.hypot(c.x - x, c.y - y) < SAME_KIND_GAP
  })

const gutterOf = (width: number) => (width - Math.min(width - 32, COLUMN)) / 2
/** Phones and small tablets: the side margins are too narrow for flowers. */
const isNarrow = (width: number) => gutterOf(width) < 90

/** A random x (px) for something `size` wide, anywhere in the left or the right margin. */
function marginX(random: () => number, width: number, size: number, side: 'left' | 'right') {
  const room = Math.max(gutterOf(width) - size - 16, 0)
  return side === 'left' ? 8 + random() * room : width - 8 - size - random() * room
}

/**
 * Scatters flowers down the page edges, outside the text column. Each slot gets one flower per
 * side at a random height, so they never pile up; about every eighth one has a small companion
 * growing next to it. Only on wide screens: on phones there is no margin, and flowers at the
 * edge would hang over the text and the cards (scatterInside places a few more there instead).
 */
function scatterFlowers(width: number, height: number, seed: number): Bloom[] {
  if (!width || !height || isNarrow(width)) return []
  const random = seededRandom(seed)
  const gutter = gutterOf(width)
  const step = 380
  const blooms: Bloom[] = []
  const recent = recentKinds()
  const sway = () => ({ delay: -random() * 4, duration: 2.4 + random() * 1.6 })

  for (let top = 90; top < height - 90; top += step) {
    for (const side of ['left', 'right'] as const) {
      const kind = pickAvoiding(random, KINDS, recent.kinds)
      recent.add(kind)
      const size = Math.round((22 + random() * 14) * (kind.shape === 'star' ? 0.85 : 1))
      const tall = isTall(kind) ? size * TALL_RATIO : size
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

      if (random() < 0.12) {
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

/** The page parts a flower or a resting butterfly must never cover: text, cards, images, buttons. */
const OBSTACLES =
  '#main :is(h1, h2, h3, h4, p, ul, img, article, a, button, span), #main .rounded-2xl, [data-keep-clear], footer p'

type Box = { left: number; top: number; right: number; bottom: number }

const overlaps = (a: Box, b: Box) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top

const grow = (box: Box, by: number): Box => ({
  left: box.left - by,
  top: box.top - by,
  right: box.right + by,
  bottom: box.bottom + by,
})

/** Where the text, cards, images and buttons are, in the layer's pixels (with a little room). */
function measureObstacles(layer: HTMLElement): Box[] {
  const origin = layer.getBoundingClientRect()
  return [...document.querySelectorAll(OBSTACLES)]
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
}

/**
 * Scatters smaller flowers inside the page column too, but only into the empty gaps: between
 * the sections, under the level descriptions, next to a lonely card. It measures where the text,
 * cards, images and buttons are, and tries random spots until enough of them are free.
 */
function scatterInside(layer: HTMLElement, seed: number, edge: Bloom[], taken: Box[]): Bloom[] {
  const width = layer.clientWidth
  const height = layer.clientHeight
  if (!width || !height) return []
  const random = seededRandom(seed ^ 0x27d4eb2d)
  const gutter = Math.max(gutterOf(width), 8)
  // Phones have no edge flowers, so a few more grow inside.
  const wanted = Math.round(height / (isNarrow(width) ? 450 : 420))
  const placed: Box[] = []
  const blooms: Bloom[] = []
  const recent = recentKinds()

  for (let attempt = 0; attempt < wanted * 80 && blooms.length < wanted; attempt++) {
    const kind = pickAvoiding(random, KINDS, recent.kinds)
    const size = Math.round((20 + random() * 10) * (kind.shape === 'star' ? 0.9 : 1))
    const tall = isTall(kind) ? size * TALL_RATIO : size
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

const toSpot = (random: () => number, x: number, y: number, width: number, height: number) => ({
  left: (x / width) * 100,
  top: (y / height) * 100,
  rotate: Math.round(random() * 70 - 35),
})

/**
 * The centre (px) of a free spot for a butterfly between the heights y0 and y1: nothing of the
 * page under it, and not on another butterfly or flower. Null if there is no room.
 */
function gapSpot(
  random: () => number,
  width: number,
  y0: number,
  y1: number,
  avoid: Box[],
): { x: number; y: number } | null {
  const half = BUTTERFLY_SIZE / 2
  for (let attempt = 0; attempt < 150; attempt++) {
    const x = half + 4 + random() * Math.max(width - BUTTERFLY_SIZE - 8, 1)
    const y = y0 + random() * Math.max(y1 - y0, 1)
    const box = { left: x - half, top: y - half, right: x + half, bottom: y + half }
    if (!avoid.some((other) => overlaps(box, other))) return { x, y }
  }
  return null
}

/** A spot for a resting butterfly in a margin at height y (px), as percentages of the field. */
function restingSpot(random: () => number, width: number, height: number, y: number): Spot {
  const side = random() < 0.5 ? 'left' : 'right'
  const x = marginX(random, width, BUTTERFLY_SIZE, side) + BUTTERFLY_SIZE / 2
  return toSpot(random, x, y, width, height)
}

/** Wide screens: one resting butterfly of each picture in the margins, the first two near the top. */
function placeButterflies(width: number, height: number, seed: number): Resting[] {
  if (!width || !height || isNarrow(width)) return []
  const random = seededRandom(seed ^ 0x5bd1e995)
  return BUTTERFLIES.map((src, id) => {
    const y = id < 2 ? 140 + random() * 420 : 200 + random() * Math.max(height - 400, 1)
    return { id, src, size: BUTTERFLY_SIZE, start: restingSpot(random, width, height, y) }
  })
}

/** Phones: a few butterflies (different pictures) in empty gaps of the page, the first near the top. */
function placeButterfliesInGaps(
  layer: HTMLElement,
  seed: number,
  taken: Box[],
  flowers: Bloom[],
): Resting[] {
  const width = layer.clientWidth
  const height = layer.clientHeight
  const random = seededRandom(seed ^ 0x5bd1e995)
  const avoid = [
    ...taken,
    ...flowers.map((bloom) =>
      grow(
        {
          left: bloom.x,
          top: bloom.y,
          right: bloom.x + bloom.size,
          bottom: bloom.y + (isTall(bloom.kind) ? bloom.size * TALL_RATIO : bloom.size),
        },
        10,
      ),
    ),
  ]
  const pictures = [...BUTTERFLIES].sort(() => random() - 0.5).slice(0, PHONE_BUTTERFLIES)
  const resting: Resting[] = []
  pictures.forEach((src, id) => {
    const [y0, y1] = id === 0 ? [90, 900] : [300, height - 120]
    const free = gapSpot(random, width, y0, y1, avoid)
    if (!free) return
    avoid.push(grow({ left: free.x, top: free.y, right: free.x, bottom: free.y }, 60))
    resting.push({
      id,
      src,
      size: BUTTERFLY_SIZE,
      start: toSpot(random, free.x, free.y, width, height),
    })
  })
  return resting
}

/**
 * The garden around the page: flowers (they disappear when clicked and grow back) and resting
 * butterflies (they fly off to a new spot when clicked). On wide screens they live in the side
 * margins and in empty gaps; on phones only in the empty gaps, so they never cover anything.
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

  const narrow = isNarrow(size.width)
  const edgeBlooms = useMemo(() => scatterFlowers(size.width, size.height, seed), [size, seed])
  const marginButterflies = useMemo(
    () => placeButterflies(size.width, size.height, seed),
    [size, seed],
  )

  // The inner flowers (and the butterflies on phones) need the laid-out page (where the text and
  // the cards are), so they are placed after it has rendered, and again when its size really changes.
  const [innerBlooms, setInnerBlooms] = useState<Bloom[]>([])
  const [gapButterflies, setGapButterflies] = useState<Resting[]>([])
  useEffect(() => {
    const layer = ref.current
    if (!layer || !size.width || !size.height) return
    const taken = measureObstacles(layer)
    const inner = scatterInside(layer, seed, edgeBlooms, taken)
    setInnerBlooms(inner)
    setGapButterflies(isNarrow(size.width) ? placeButterfliesInGaps(layer, seed, taken, inner) : [])
  }, [size.width, size.height, seed, edgeBlooms])

  const blooms = [...edgeBlooms, ...innerBlooms]
  const butterflies = narrow ? gapButterflies : marginButterflies

  /** A new landing spot somewhere in the part of the page that is on screen now. */
  const nextSpot = (): Spot => {
    const layer = ref.current
    const width = layer?.clientWidth ?? size.width
    const height = layer?.clientHeight ?? size.height
    const top = layer ? -layer.getBoundingClientRect().top : window.scrollY
    const y0 = Math.max(top + 100, 80)
    const y1 = Math.min(top + window.innerHeight - 100, height - 80)
    if (layer && isNarrow(width)) {
      const free = gapSpot(Math.random, width, y0, y1, measureObstacles(layer))
      if (free) return toSpot(Math.random, free.x, free.y, width, height)
    }
    const y = y0 + Math.random() * Math.max(y1 - y0, 1)
    return isNarrow(width)
      ? toSpot(Math.random, width / 2, y, width, height)
      : restingSpot(Math.random, width, height, y)
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
              height: isTall(bloom.kind) ? bloom.size * TALL_RATIO : bloom.size,
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
            src={butterfly.src}
            size={butterfly.size}
            start={butterfly.start}
            nextSpot={nextSpot}
          />
        ))}
      </div>
    </>
  )
}
