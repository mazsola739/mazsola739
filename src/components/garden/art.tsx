import type { CSSProperties } from 'react'

/**
 * Flowers and butterflies drawn in the flat style of the "You are sweet." card
 * (daisies, tulips, five-petal flowers, golden stars). All purely decorative.
 *
 * The round shapes are drawn around (0, 0), and their moving parts turn and scale around that
 * point: transform-box view-box puts the transform origin at the drawing's (0, 0), not at the
 * corner of the viewBox, so origin-[0_0] is the centre of the flower / the butterfly's body.
 * A flower closes when an ancestor with the `group` class has data-closed="true".
 */
type ArtProps = { className?: string; style?: CSSProperties }

const DAISY_PETALS = [0, 45, 90, 135, 180, 225, 270, 315]
const FIVE_PETALS = [0, 72, 144, 216, 288]

/** Petals fold in towards the middle of the flower. */
const CLOSING_PETALS =
  'origin-[0_0] transition-transform duration-700 ease-out [transform-box:view-box] group-data-[closed=true]:scale-45'

export function Daisy({ className, style }: ArtProps) {
  return (
    <svg aria-hidden="true" className={className} style={style} viewBox="-20 -20 40 40">
      <g fill="#ffffff" className={CLOSING_PETALS}>
        {DAISY_PETALS.map((angle) => (
          <ellipse key={angle} cx="0" cy="-10" rx="4.6" ry="8.2" transform={`rotate(${angle})`} />
        ))}
      </g>
      <circle r="5.6" fill="#f2b43a" />
      <circle cx="-1.3" cy="-1.3" r="2.2" fill="#f7d36b" />
    </svg>
  )
}

export function PetalFlower({
  petal,
  center,
  className,
  style,
}: ArtProps & { petal: string; center: string }) {
  return (
    <svg aria-hidden="true" className={className} style={style} viewBox="-20 -20 40 40">
      <g fill={petal} className={CLOSING_PETALS}>
        {FIVE_PETALS.map((angle) => (
          <circle key={angle} cx="0" cy="-9.5" r="7.6" transform={`rotate(${angle})`} />
        ))}
      </g>
      <circle r="5.2" fill={center} />
      <circle r="1.8" fill="#f2b43a" />
    </svg>
  )
}

export function Tulip({ className, style }: ArtProps) {
  return (
    <svg aria-hidden="true" className={className} style={style} viewBox="0 0 40 60">
      <path d="M20 58V34" fill="none" stroke="#8bbf5a" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20 52C12 50 8 44 7 37c7 1 11 6 13 15Z" fill="#9cc56b" />
      {/* Closing: the cup narrows from its base and the light inner petals tuck away. */}
      <g className="origin-bottom transition-transform duration-700 ease-out [transform-box:fill-box] group-data-[closed=true]:scale-x-70">
        <path d="M9 13l5 7 6-9 6 9 5-7c2 13-1 23-11 25C10 36 7 26 9 13Z" fill="#e8457f" />
        <path
          d="M14 20l6-9 6 9c-1 7-3 11-6 12-3-1-5-5-6-12Z"
          fill="#f49bc4"
          className="transition-opacity duration-700 group-data-[closed=true]:opacity-0"
        />
      </g>
    </svg>
  )
}

export function Star({ className, style }: ArtProps) {
  return (
    <svg aria-hidden="true" className={className} style={style} viewBox="-12 -12 24 24">
      {/* A star doesn't close: it twinkles round instead. */}
      <path
        d="M0-10l2.65 6.36 6.86.55-5.23 4.48 1.6 6.7L0 4.5l-5.88 3.59 1.6-6.7-5.23-4.48 6.86-.55Z"
        fill="#f2b43a"
        stroke="#f2b43a"
        strokeWidth="1.6"
        strokeLinejoin="round"
        className="origin-[0_0] transition-transform duration-700 ease-out [transform-box:view-box] group-data-[closed=true]:scale-70 group-data-[closed=true]:rotate-144"
      />
    </svg>
  )
}

/** The round pink bloom of the card, with two leaves. */
export function Peony({ className, style }: ArtProps) {
  return (
    <svg aria-hidden="true" className={className} style={style} viewBox="-20 -20 40 40">
      <ellipse cx="-10" cy="11" rx="7.5" ry="3.4" transform="rotate(-28 -10 11)" fill="#9cc56b" />
      <ellipse cx="10" cy="11" rx="7.5" ry="3.4" transform="rotate(28 10 11)" fill="#8bbf5a" />
      <g className={CLOSING_PETALS}>
        <circle cy="-1" r="12.5" fill="#e8457f" />
        <path d="M-11-3c3-7 7-2 11-8 4 6 8 1 11 8-4 5-18 5-22 0Z" fill="#f49bc4" />
        <path d="M-6 3c2-4 4-1 6-4 2 3 4 0 6 4-2 3-10 3-12 0Z" fill="#f06ba8" />
      </g>
    </svg>
  )
}

/** The orange leafy sprig from the card's corner. Its leaves fold in when it "closes". */
export function Sprig({ className, style }: ArtProps) {
  return (
    <svg aria-hidden="true" className={className} style={style} viewBox="0 0 40 60">
      <path
        d="M20 58C19 42 21 26 20 6"
        fill="none"
        stroke="#e07a1f"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <g className="origin-center transition-transform duration-700 ease-out [transform-box:fill-box] group-data-[closed=true]:scale-x-50">
        <ellipse cx="13" cy="44" rx="7" ry="3.6" transform="rotate(-30 13 44)" fill="#f28c28" />
        <ellipse cx="27" cy="36" rx="7" ry="3.6" transform="rotate(30 27 36)" fill="#f6a04d" />
        <ellipse cx="13" cy="27" rx="6.5" ry="3.3" transform="rotate(-35 13 27)" fill="#f6a04d" />
        <ellipse cx="27" cy="19" rx="6" ry="3.1" transform="rotate(35 27 19)" fill="#f28c28" />
        <ellipse cx="20" cy="7" rx="3.4" ry="5.5" fill="#f28c28" />
      </g>
    </svg>
  )
}

export type FlowerKind =
  | 'daisy'
  | 'red'
  | 'yellow'
  | 'blue'
  | 'orange'
  | 'pink'
  | 'white'
  | 'purple'
  | 'peony'
  | 'tulip'
  | 'sprig'
  | 'star'

/** Tall flowers (with a stem) are 1.5 times as tall as they are wide; the rest are square. */
export const isTall = (kind: FlowerKind) => kind === 'tulip' || kind === 'sprig'

/** Petal and centre colours of the five-petal flowers, as on the card. */
const PETAL_FLOWERS = {
  red: ['#e63946', '#ffffff'],
  yellow: ['#f7c948', '#e63946'],
  blue: ['#2f6e9e', '#f49bc4'],
  orange: ['#f28c28', '#ffffff'],
  pink: ['#f06ba8', '#ffffff'],
  white: ['#ffffff', '#e63946'],
  purple: ['#7a5cc2', '#f6c445'],
} as const

/** Any flower by name. */
export function Flower({ kind, className, style }: ArtProps & { kind: FlowerKind }) {
  switch (kind) {
    case 'daisy':
      return <Daisy className={className} style={style} />
    case 'peony':
      return <Peony className={className} style={style} />
    case 'tulip':
      return <Tulip className={className} style={style} />
    case 'sprig':
      return <Sprig className={className} style={style} />
    case 'star':
      return <Star className={className} style={style} />
    default: {
      const [petal, center] = PETAL_FLOWERS[kind]
      return <PetalFlower petal={petal} center={center} className={className} style={style} />
    }
  }
}

/** Wing colours and shapes of the butterflies, all from the card's palette. */
export const BUTTERFLY_WINGS = [
  { upper: '#f06ba8', lower: '#7a5cc2', shape: 'round' },
  { upper: '#f6c445', lower: '#f28c28', shape: 'swallowtail' },
  { upper: '#b39ae6', lower: '#e0367a', shape: 'round' },
  { upper: '#4fc3cf', lower: '#3a2f8f', shape: 'swallowtail' },
  { upper: '#e63946', lower: '#f6c445', shape: 'round' },
  { upper: '#f49bc4', lower: '#b39ae6', shape: 'swallowtail' },
] as const

export type Wings = (typeof BUTTERFLY_WINGS)[number]

/** One wing side (left); the right side is the same, mirrored. */
function WingSide({ upper, lower, shape }: Wings) {
  return (
    <>
      <path d="M-1.5-3C-6-18-22-21-21-8c.5 7 10 10 19.5 8Z" fill={upper} />
      {shape === 'swallowtail' ? (
        <path d="M-1.5 1C-12 1-19 8-15 14c2 3 5 2 6 7 2-4 5-9 7.5-15Z" fill={lower} />
      ) : (
        <path d="M-1.5 1C-12 2-19 10-14 16c5 5 11-3 12.5-11Z" fill={lower} />
      )}
      <circle cx="-13" cy="-10" r="3" fill="#ffffff" opacity="0.9" />
      <circle cx="-18.5" cy="-5" r="1.4" fill="#ffffff" opacity="0.9" />
      <circle cx="-11" cy="9" r="2" fill={shape === 'swallowtail' ? '#ffffff' : '#f6c445'} />
    </>
  )
}

/**
 * A butterfly facing up, its body at (0, 0). The wings fold in towards the body: slowly while it
 * rests, fast while it flies (an ancestor `group` with data-resting="false").
 */
export function Butterfly({ wings, className }: { wings: Wings; className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="-24 -22 48 44">
      <g className="origin-[0_0] animate-flap [animation-duration:1.8s] [transform-box:view-box] group-data-[resting=false]:[animation-duration:0.24s] motion-reduce:animate-none">
        <WingSide {...wings} />
        <g transform="scale(-1 1)">
          <WingSide {...wings} />
        </g>
      </g>
      <path
        d="M-.8-10Q-3.5-16-7-18.5M.8-10Q3.5-16 7-18.5"
        fill="none"
        stroke="#2a2463"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="-7" cy="-18.5" r="1.1" fill="#2a2463" />
      <circle cx="7" cy="-18.5" r="1.1" fill="#2a2463" />
      <ellipse cy="2" rx="1.9" ry="9.5" fill="#2a2463" />
      <circle cy="-8.5" r="2.4" fill="#2a2463" />
    </svg>
  )
}
