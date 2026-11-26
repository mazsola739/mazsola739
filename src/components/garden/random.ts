/** A small seeded random generator (mulberry32): the same seed gives the same layout. */
export function seededRandom(seed: number) {
  let state = seed | 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** A new seed on every page load, so the garden is different each visit. */
export const newSeed = () => Math.floor(Math.random() * 2 ** 31)

export const pick = <T>(random: () => number, items: readonly T[]): T =>
  items[Math.floor(random() * items.length)]

/** Like pick, but skips the items in `avoid` (unless that would leave nothing to pick). */
export function pickAvoiding<T>(random: () => number, items: readonly T[], avoid: readonly T[]): T {
  const allowed = items.filter((item) => !avoid.includes(item))
  return pick(random, allowed.length > 0 ? allowed : items)
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
