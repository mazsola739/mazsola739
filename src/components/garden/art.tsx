import type { CSSProperties } from 'react'

/**
 * The garden's pictures (src/assets/garden), in the style of the unicorn: flower heads, flowers
 * with a stem, stars and butterflies. Every kind sits on a canvas of a fixed shape, so no sizes
 * are needed here:
 *   round-*.webp      square, the flower head in the middle
 *   tall-*.webp       1:2 (TALL_RATIO), the stem's foot at the bottom
 *   star-*.webp       square
 *   butterfly-*.webp  square, facing up, the body down the middle
 * All purely decorative.
 */

/** The pictures matching a glob, in file name order. */
const pictures = (files: Record<string, string>) =>
  Object.keys(files)
    .sort()
    .map((path) => files[path])

const glob = {
  round: import.meta.glob<string>('../../assets/garden/round-*.webp', {
    eager: true,
    import: 'default',
  }),
  tall: import.meta.glob<string>('../../assets/garden/tall-*.webp', {
    eager: true,
    import: 'default',
  }),
  star: import.meta.glob<string>('../../assets/garden/star-*.webp', {
    eager: true,
    import: 'default',
  }),
  butterfly: import.meta.glob<string>('../../assets/garden/butterfly-*.webp', {
    eager: true,
    import: 'default',
  }),
}

export type FlowerShape = 'round' | 'tall' | 'star'
/** One flower picture. The same object is reused, so kinds can be compared with ===. */
export type FlowerKind = { shape: FlowerShape; src: string }

const kinds = (shape: FlowerShape, files: Record<string, string>): FlowerKind[] =>
  pictures(files).map((src) => ({ shape, src }))

export const ROUND_FLOWERS = kinds('round', glob.round)
export const TALL_FLOWERS = kinds('tall', glob.tall)
export const STARS = kinds('star', glob.star)

/** Flowers with a stem are twice as tall as they are wide; the rest are square. */
export const TALL_RATIO = 2
export const isTall = (kind: FlowerKind) => kind.shape === 'tall'

/** Any flower or star. */
export function Flower({
  kind,
  className,
  style,
}: {
  kind: FlowerKind
  className?: string
  style?: CSSProperties
}) {
  return (
    <img
      src={kind.src}
      alt=""
      draggable={false}
      decoding="async"
      className={className}
      style={style}
    />
  )
}

/** The butterfly pictures. */
export const BUTTERFLIES = pictures(glob.butterfly)

const LAYER = 'absolute inset-0 size-full select-none'

/**
 * A butterfly facing up. Its wings fold in towards the body: slowly while it rests, fast while it
 * flies (an ancestor `group` with data-resting="false"). The picture itself folds; a narrow strip
 * of it down the middle stays on top, so the body and the head keep their shape.
 */
export function Butterfly({ src, className }: { src: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative ${className ?? ''}`}>
      <img
        src={src}
        alt=""
        draggable={false}
        decoding="async"
        className={`${LAYER} animate-flap [animation-duration:1.8s] group-data-[resting=false]:[animation-duration:0.24s] motion-reduce:animate-none`}
      />
      <img
        src={src}
        alt=""
        draggable={false}
        decoding="async"
        className={`${LAYER} [clip-path:inset(0_41%)]`}
      />
    </div>
  )
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
