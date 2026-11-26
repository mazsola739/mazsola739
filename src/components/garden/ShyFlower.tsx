import { type CSSProperties, useEffect, useState } from 'react'
import { Flower, type FlowerKind } from './art.tsx'

/** bloom: full size. gone: picked (it shrinks away). bud: growing back, still small. */
type Phase = 'bloom' | 'gone' | 'bud'

/** How long a picked flower stays away (ms): somewhere between 5 and 10 seconds. */
const awayFor = () => 5000 + Math.random() * 5000
/** How long it takes to grow back to a bud (ms), as long as the grow transition. */
const GROW = 1000

/** A flower that disappears when clicked, then grows back a few seconds later: first a bud, then in full. */
export function ShyFlower({
  kind,
  className,
  style,
}: {
  kind: FlowerKind
  className?: string
  style?: CSSProperties
}) {
  const [phase, setPhase] = useState<Phase>('bloom')

  useEffect(() => {
    if (phase === 'bloom') return
    const timer =
      phase === 'gone'
        ? setTimeout(() => setPhase('bud'), awayFor())
        : setTimeout(() => setPhase('bloom'), GROW + 100)
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-auto size-full origin-bottom cursor-pointer transition-[scale,opacity] duration-1000 ease-out data-[bud=true]:scale-55 data-[gone=true]:pointer-events-none data-[gone=true]:scale-0 data-[gone=true]:opacity-0 data-[gone=true]:duration-300 data-[gone=true]:ease-in motion-reduce:transition-none"
      data-gone={phase === 'gone'}
      data-bud={phase === 'bud'}
      onClick={() => setPhase('gone')}
    >
      <Flower kind={kind} className={className} style={style} />
    </div>
  )
}

// SPDX-FileCopyrightText: 2026 R. Rika
// SPDX-License-Identifier: MIT
// Reusing this code is fine with my name kept on it, but please don't present it as your own original work.
