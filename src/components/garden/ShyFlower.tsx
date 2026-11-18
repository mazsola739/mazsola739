import { type CSSProperties, useEffect, useState } from 'react'
import { Flower, type FlowerKind } from './art.tsx'

/**
 * bloom: open. gone: picked (it shrinks away). bud: growing back, still closed. Then it opens
 * again (the petals unfold, see CLOSING_PETALS in art.tsx).
 */
type Phase = 'bloom' | 'gone' | 'bud'

/** How long a picked flower stays away (ms): somewhere between 5 and 10 seconds. */
const awayFor = () => 5000 + Math.random() * 5000
/** How long it takes to grow back before it opens (ms), as long as the grow transition. */
const GROW = 1000

/** A flower that disappears when clicked and grows back a few seconds later, then opens. */
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
      className="group pointer-events-auto size-full origin-bottom cursor-pointer transition-[scale,opacity] duration-1000 ease-out data-[gone=true]:pointer-events-none data-[gone=true]:scale-0 data-[gone=true]:opacity-0 data-[gone=true]:duration-300 data-[gone=true]:ease-in motion-reduce:transition-none"
      data-gone={phase === 'gone'}
      data-closed={phase !== 'bloom'}
      onClick={() => setPhase('gone')}
    >
      <Flower kind={kind} className={className} style={style} />
    </div>
  )
}
