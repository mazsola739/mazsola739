import { useState } from 'react'
import { BUTTERFLY_WINGS, type FlowerKind, type Wings } from './art.tsx'
import { Flutter, type Spot } from './Flutter.tsx'
import { newSeed, pick, pickAvoiding, seededRandom } from './random.ts'
import { ShyFlower } from './ShyFlower.tsx'

type Kind = FlowerKind | 'butterfly'

/** No tulips or sprigs here: a stem looks odd lying on a card edge. */
const KINDS: Kind[] = [
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
  'star',
  'star',
  'butterfly',
  'butterfly',
  'butterfly',
]

const EDGES = ['top', 'right', 'bottom', 'left'] as const
type Edge = (typeof EDGES)[number]

type Decoration = { id: number; kind: Kind; spot: Spot; size: number; wings: Wings; delay: number }

/** A point on the card's border (percentages of the card), sometimes right on a corner. */
function borderSpot(random: () => number, edge: Edge): Spot {
  const along = random() < 0.35 ? (random() < 0.5 ? 0 : 100) : 8 + random() * 84
  return {
    left: edge === 'left' ? 0 : edge === 'right' ? 100 : along,
    top: edge === 'top' ? 0 : edge === 'bottom' ? 100 : along,
    rotate: Math.round(random() * 70 - 35),
  }
}

/** Butterflies are the same size everywhere (see FlowerField). */
const BUTTERFLY_SIZE = 40

/**
 * One or two decorations on random points of the border. Two never share an edge and are
 * never the same kind.
 */
function decorate(seed: number): Decoration[] {
  const random = seededRandom(seed)
  const count = random() < 0.35 ? 2 : 1
  const edges: Edge[] = [...EDGES]
  const used: Kind[] = []
  return Array.from({ length: count }, (_, id) => {
    const edge = edges.splice(Math.floor(random() * edges.length), 1)[0]
    const kind = pickAvoiding(random, KINDS, used)
    used.push(kind)
    const size =
      kind === 'butterfly'
        ? BUTTERFLY_SIZE
        : kind === 'star'
          ? 18 + random() * 6
          : 20 + random() * 8
    return {
      id,
      kind,
      spot: borderSpot(random, edge),
      size: Math.round(size),
      wings: pick(random, BUTTERFLY_WINGS),
      delay: -random() * 4,
    }
  })
}

/** A butterfly on a card lands somewhere else on the same card's border. */
const anotherBorderSpot = () => borderSpot(Math.random, pick(Math.random, EDGES))

/** Flowers and resting butterflies sitting on a card's border, different on every card. */
export function CardBlooms() {
  const [decorations] = useState(() => decorate(newSeed()))

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-1">
      {decorations.map((decoration) =>
        decoration.kind === 'butterfly' ? (
          <Flutter
            key={decoration.id}
            wings={decoration.wings}
            size={decoration.size}
            start={decoration.spot}
            nextSpot={anotherBorderSpot}
          />
        ) : (
          <div
            key={decoration.id}
            className="absolute"
            style={{
              left: `${decoration.spot.left}%`,
              top: `${decoration.spot.top}%`,
              width: decoration.size,
              height: decoration.size,
              transform: `translate(-50%, -50%) rotate(${decoration.spot.rotate}deg)`,
            }}
          >
            <ShyFlower
              kind={decoration.kind}
              className="size-full animate-sway motion-reduce:animate-none"
              style={{ animationDelay: `${decoration.delay}s` }}
            />
          </div>
        ),
      )}
    </div>
  )
}
