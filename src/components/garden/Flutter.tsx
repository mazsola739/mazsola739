import { useEffect, useRef, useState } from 'react'
import { Butterfly, type Wings } from './art.tsx'

/** Where a butterfly sits: percentages of its container, and the angle it faces. */
export type Spot = { left: number; top: number; rotate: number }

type FlutterProps = {
  wings: Wings
  size: number
  start: Spot
  /** Picks the next place to land, when the butterfly is clicked. */
  nextSpot: (from: Spot) => Spot
}

const easeInOut = (t: number) => (1 - Math.cos(Math.PI * t)) / 2

/** Shortest turn from one angle to another, in degrees (-180…180). */
const turnBetween = (from: number, to: number) => ((((to - from) % 360) + 540) % 360) - 180

/**
 * A butterfly that rests (wings slowly opening and closing) until it is clicked, then flies
 * along a curved, slightly wobbly path to a new spot, faces where it is going, and lands.
 */
export function Flutter({ wings, size, start, nextSpot }: FlutterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const [spot, setSpot] = useState(start)
  const [flying, setFlying] = useState(false)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const fly = () => {
    const element = ref.current
    const box = element?.offsetParent
    if (!element || !(box instanceof HTMLElement) || flying) return
    const to = nextSpot(spot)
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSpot(to)
      return
    }

    // Work in pixels for the path, write percentages back so it stays put if the page resizes.
    const width = box.clientWidth
    const height = box.clientHeight
    const from = { x: (spot.left / 100) * width, y: (spot.top / 100) * height }
    const end = { x: (to.left / 100) * width, y: (to.top / 100) * height }
    const dx = end.x - from.x
    const dy = end.y - from.y
    const distance = Math.hypot(dx, dy) || 1
    // Curved path: the middle control point is pushed sideways by a random amount.
    const bend = (Math.random() - 0.5) * 0.9 * distance
    const control = {
      x: from.x + dx / 2 - (dy / distance) * bend,
      y: from.y + dy / 2 + (dx / distance) * bend,
    }
    const duration = Math.min(Math.max(distance / 260, 0.9), 3) * 1000
    const startTime = performance.now()
    setFlying(true)

    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const e = easeInOut(t)
      const u = 1 - e
      const x = u * u * from.x + 2 * u * e * control.x + e * e * end.x
      const y = u * u * from.y + 2 * u * e * control.y + e * e * end.y
      // Direction of travel along the curve; the drawing faces up, hence the quarter turn.
      const tx = 2 * u * (control.x - from.x) + 2 * e * (end.x - control.x)
      const ty = 2 * u * (control.y - from.y) + 2 * e * (end.y - control.y)
      const heading = (Math.atan2(ty, tx) * 180) / Math.PI + 90
      // In the last part of the flight, turn to the landing angle.
      const settle = Math.max(0, (t - 0.8) / 0.2)
      const rotate = heading + turnBetween(heading, to.rotate) * settle
      // Butterflies don't fly straight: a little up-and-down flutter, calm at take-off and landing.
      const wobble = Math.sin(t * Math.PI * 8) * 8 * Math.sin(Math.PI * t)

      element.style.left = `${(x / width) * 100}%`
      element.style.top = `${((y + wobble) / height) * 100}%`
      element.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`
      if (t < 1) {
        frame.current = requestAnimationFrame(step)
      } else {
        setSpot(to)
        setFlying(false)
      }
    }
    frame.current = requestAnimationFrame(step)
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="group pointer-events-auto absolute cursor-pointer"
      data-resting={!flying}
      onClick={fly}
      style={{
        left: `${spot.left}%`,
        top: `${spot.top}%`,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) rotate(${spot.rotate}deg)`,
        zIndex: flying ? 30 : undefined,
      }}
    >
      <Butterfly wings={wings} className="size-full" />
    </div>
  )
}
