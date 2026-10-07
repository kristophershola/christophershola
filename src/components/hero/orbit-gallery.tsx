"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * Card path measured from the reference recording (1376 x 1032 viewport).
 * One entry per card slot: [x, y, width]. Slots run from a tiny card at the
 * far left, over the top, down the right side and along the bottom, where the
 * cards are largest and then trail off to the upper left as translucent ghosts.
 */
const REF_W = 1376
const REF_H = 1032
const PATH: [number, number, number][] = [
  [170, 452, 2], [211, 394, 9], [268, 337, 18], [343, 287, 30], [430, 248, 40],
  [527, 221, 53], [631, 207, 62], [737, 206, 73], [841, 220, 85], [939, 245, 97],
  [1027, 285, 108], [1101, 332, 122], [1161, 390, 135], [1201, 452, 148], [1222, 515, 160],
  [1222, 588, 171], [1203, 660, 183], [1163, 722, 197], [1112, 775, 215], [1030, 825, 228],
  [940, 866, 238], [852, 890, 250], [770, 903, 262], [688, 908, 275], [606, 903, 290],
  [524, 890, 305], [444, 856, 320], [364, 818, 333], [284, 775, 340], [222, 722, 374],
  [190, 648, 346], [178, 574, 340], [172, 520, 335], [170, 470, 330],
]

const SLOTS = PATH.length - 1 // 33 cards, one per slot
const FADE_START = 28 // the ghost trail: opacity falls linearly to 0 over 4 slots
const FADE_END = 32
const BASE_W = 400
const BASE_H = 312
const PX_PER_SLOT = 100 // top of the ring moves about one card per 100px of drag

const catmull = (a: number, b: number, c: number, d: number, t: number) =>
  0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t)

const at = (i: number) => PATH[Math.min(PATH.length - 1, Math.max(0, i))]

// Every card keeps its own small random tilt, like photos scattered on a table.
const tiltOf = (i: number) => (((i * 9301 + 49297) % 233280) / 233280 - 0.5) * 16

interface OrbitGalleryProps {
  images: string[]
  /** Time constant of the post-flick glide, in seconds. */
  friction?: number
  className?: string
}

export function OrbitGallery({ images, friction = 0.6, className }: OrbitGalleryProps) {
  const root = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = root.current
    if (!el) return

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let pos = 0 // ring position, in card slots
    let velocity = 0 // slots per second
    let dragging = false
    let w = el.clientWidth
    let h = el.clientHeight
    let last = 0
    let raf = 0
    let samples: { t: number; x: number }[] = []

    const draw = () => {
      const px = w / REF_W
      const size = Math.min(1.35, Math.max(0.5, px))
      for (let i = 0; i < SLOTS; i++) {
        const node = cards.current[i]
        if (!node) continue

        const k = (((i + pos) % SLOTS) + SLOTS) % SLOTS
        const j = Math.floor(k)
        const t = k - j
        const x = catmull(at(j - 1)[0], at(j)[0], at(j + 1)[0], at(j + 2)[0], t)
        const y = catmull(at(j - 1)[1], at(j)[1], at(j + 1)[1], at(j + 2)[1], t)
        const cardW = at(j)[2] + (at(j + 1)[2] - at(j)[2]) * t

        const opacity = Math.min(1, Math.max(0, (FADE_END - k) / (FADE_END - FADE_START)))
        node.style.transform = `translate3d(${(x / REF_W) * w}px, ${(y / REF_H) * h}px, 0) translate(-50%, -50%) rotate(${tiltOf(i)}deg) scale(${(cardW * size) / BASE_W})`
        node.style.opacity = String(opacity)
        // Newer (smaller k) cards sit on top, so the fading ghosts slide underneath.
        node.style.zIndex = String(Math.round((SLOTS - k) * 10))
        node.style.visibility = opacity === 0 ? "hidden" : "visible"
      }
    }

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!dragging) {
        velocity *= Math.exp(-dt / friction)
        if (Math.abs(velocity) < 0.12) velocity = 0
        pos += velocity * dt
      }
      draw()
      raf = velocity !== 0 || dragging ? requestAnimationFrame(tick) : 0
    }
    const wake = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const unit = () => PX_PER_SLOT * Math.min(1.35, Math.max(0.28, w / REF_W))

    const down = (e: PointerEvent) => {
      dragging = true
      velocity = 0
      samples = [{ t: e.timeStamp, x: e.clientX }]
      el.setPointerCapture(e.pointerId)
      wake()
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      const prev = samples[samples.length - 1]
      pos += (e.clientX - prev.x) / unit()
      samples.push({ t: e.timeStamp, x: e.clientX })
      samples = samples.filter((s) => e.timeStamp - s.t < 90)
      draw()
    }
    const up = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      const first = samples[0]
      const span = (e.timeStamp - first.t) / 1000
      const flick = span > 0.01 ? (e.clientX - first.x) / span / unit() : 0
      velocity = calm ? 0 : Math.max(-24, Math.min(24, flick))
      wake()
    }

    const ro = new ResizeObserver(() => {
      w = el.clientWidth
      h = el.clientHeight
      draw()
    })
    ro.observe(el)
    el.addEventListener("pointerdown", down)
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerup", up)
    el.addEventListener("pointercancel", up)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      el.removeEventListener("pointerdown", down)
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerup", up)
      el.removeEventListener("pointercancel", up)
    }
  }, [friction])

  return (
    <div
      ref={root}
      aria-hidden
      className={cn("absolute inset-0 cursor-grab touch-pan-y select-none active:cursor-grabbing", className)}
    >
      {Array.from({ length: SLOTS }, (_, i) => (
        <div
          key={i}
          ref={(node) => {
            cards.current[i] = node
          }}
          style={{ width: BASE_W, height: BASE_H }}
          className="absolute top-0 left-0 overflow-hidden rounded-2xl bg-muted opacity-0 shadow-[0_34px_60px_-18px_rgba(0,0,0,0.3)] will-change-transform"
        >
          <img src={images[i % images.length]} alt="" draggable={false} decoding="async" className="size-full object-cover" />
        </div>
      ))}
    </div>
  )
}
