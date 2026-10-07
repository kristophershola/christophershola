import { useCallback, useEffect, useRef } from "react"

export const GENRES = ["Synthwave", "Lo-fi", "Ambient", "Amapiano"] as const
export type Genre = (typeof GENRES)[number]

interface Groove {
  bpm: number
  kick: string
  hat: string
  bass: number[] // MIDI notes, one per quarter note across a bar
  wave: OscillatorType
  release: number
}

const GROOVES: Record<Genre, Groove> = {
  Synthwave: { bpm: 108, kick: "x...x...x...x...", hat: "..x...x...x...x.", bass: [40, 40, 43, 36], wave: "sawtooth", release: 0.2 },
  "Lo-fi": { bpm: 76, kick: "x.....x...x.....", hat: "..x...x...x...x.", bass: [45, 45, 41, 43], wave: "triangle", release: 0.45 },
  Ambient: { bpm: 60, kick: "................", hat: "................", bass: [48, 52, 55, 50], wave: "sine", release: 1.8 },
  Amapiano: { bpm: 112, kick: "x...x...x...x...", hat: "..x.x.x...x.x.x.", bass: [38, 38, 41, 36], wave: "sine", release: 0.35 },
}

const midi = (n: number) => 440 * 2 ** ((n - 69) / 12)

function tone(ac: AudioContext, t: number, type: OscillatorType, from: number, to: number, peak: number, len: number) {
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(from, t)
  osc.frequency.exponentialRampToValueAtTime(to, t + len)
  gain.gain.setValueAtTime(peak, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + len)
  osc.connect(gain).connect(ac.destination)
  osc.start(t)
  osc.stop(t + len)
}

/** Tiny synthesized loops, so the player works without any audio assets. */
export function useBeat() {
  const ctx = useRef<AudioContext | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const stop = useCallback(() => {
    window.clearInterval(timer.current)
    void ctx.current?.suspend()
  }, [])

  const play = useCallback((genre: Genre) => {
    window.clearInterval(timer.current)
    const ac = (ctx.current ??= new AudioContext())
    void ac.resume()

    const groove = GROOVES[genre]
    const sixteenth = 60 / groove.bpm / 4
    let step = 0
    let next = ac.currentTime + 0.05

    const schedule = () => {
      for (; next < ac.currentTime + 0.25; next += sixteenth, step = (step + 1) % 16) {
        if (groove.kick[step] === "x") tone(ac, next, "sine", 140, 40, 0.5, 0.25)
        if (groove.hat[step] === "x") tone(ac, next, "square", 8000, 6000, 0.012, 0.04)
        if (step % 4 === 0) {
          const f = midi(groove.bass[step / 4])
          tone(ac, next, groove.wave, f, f, 0.13, groove.release)
        }
      }
    }

    schedule()
    timer.current = window.setInterval(schedule, 60)
  }, [])

  useEffect(
    () => () => {
      window.clearInterval(timer.current)
      void ctx.current?.close()
    },
    []
  )

  return { play, stop }
}
