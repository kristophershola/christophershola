"use client"

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react"
import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring } from "motion/react"
import { ArrowRight, Check, Loader2, Music2, Pause, Play, Send, Shuffle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

import { GENRES, useBeat, type Genre } from "./use-beat"

export type Role = "talent" | "company"
export interface WaitlistPayload {
  role: Role
  name: string
  email: string
}

type Step = "idle" | "role" | "name" | "email" | "sending" | "done" | "beat" | "player"

/** Pill widths in px, measured from the reference recording. The player sizes itself to its label. */
const WIDTH = { idle: 187, role: 253, name: 323, email: 323, sending: 350, done: 323, beat: 136 }
const HOVER_WIDTH = { idle: 210, beat: 152 }

/** Spring fitted to the recorded width transitions (damping ratio about 0.78). */
const SPRING = { type: "spring", stiffness: 140, damping: 18 } as const
const PUSH = {
  initial: { opacity: 0, x: 44, filter: "blur(4px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -44, filter: "blur(4px)" },
  transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
} as const
const FADE = {
  initial: { opacity: 0, filter: "blur(5px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(5px)" },
  transition: { duration: 0.14 },
} as const

const PICK_DELAY = 650
const SENDING_MIN = 260
const DONE_DWELL = 2100

const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2
  const r = 30 + (i % 3) * 10
  return {
    color: ["bg-pink-400", "bg-amber-300", "bg-sky-400", "bg-emerald-300"][i % 4],
    x: Math.cos(a) * r,
    y: Math.sin(a) * r,
  }
})

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v))

interface WaitlistCtaProps {
  label?: string
  onSubmit?: (payload: WaitlistPayload) => void | Promise<void>
  className?: string
}

export function WaitlistCta({ label = "Join SelfMint Waitlist", onSubmit, className }: WaitlistCtaProps) {
  const [step, setStep] = useState<Step>("idle")
  const [hover, setHover] = useState(false)
  const [role, setRole] = useState<Role>("talent")
  const [picked, setPicked] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [invalid, setInvalid] = useState(false)
  const [genre, setGenre] = useState<Genre>("Synthwave")
  const [playing, setPlaying] = useState(true)
  const [playerW, setPlayerW] = useState(219)
  const [nat, setNat] = useState({ idle: 0, ask: 0, role: 0, beat: 0, beatHover: 0 })
  const beat = useBeat()

  const pill = useRef<HTMLDivElement>(null)
  const measure = useRef<HTMLDivElement>(null)
  const probe = useRef<HTMLDivElement>(null)

  // Magnetic pull: the pill drifts toward a nearby cursor and springs back.
  const mx = useSpring(useMotionValue(0), { stiffness: 170, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 170, damping: 18 })
  useEffect(() => {
    if (step !== "idle" && step !== "beat") return
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const move = (e: PointerEvent) => {
      const r = pill.current?.getBoundingClientRect()
      if (!r) return
      const dx = e.clientX - (r.left + r.width / 2 - mx.get())
      const dy = e.clientY - (r.top + r.height / 2 - my.get())
      const near = Math.hypot(dx, dy) < 240
      mx.set(near ? clamp(dx * 0.2, 20) : 0)
      my.set(near ? clamp(dy * 0.2, 14) : 0)
    }
    const reset = () => (mx.set(0), my.set(0))
    window.addEventListener("pointermove", move)
    document.addEventListener("pointerleave", reset)
    return () => {
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerleave", reset)
      reset()
    }
  }, [step, mx, my])

  // The player is as wide as its label, so measure a hidden copy of it.
  useLayoutEffect(() => {
    if (measure.current) setPlayerW(Math.ceil(measure.current.getBoundingClientRect().width))
  }, [genre])

  // Text pills never clip: the measured widths are minimums, and each pill grows to fit
  // its content if your font runs wider than the one in the reference recording.
  useLayoutEffect(() => {
    const read = () => {
      const el = probe.current
      if (!el) return
      const w = (k: string) => Math.ceil(el.querySelector<HTMLElement>(`[data-k="${k}"]`)?.getBoundingClientRect().width ?? 0)
      setNat({ idle: w("idle"), ask: w("ask"), role: w("role"), beat: w("beat"), beatHover: w("beatHover") })
    }
    read()
    void document.fonts?.ready.then(read)
  }, [label])

  // Timed hand-offs between steps.
  useEffect(() => {
    const hop: [number, Step] | null =
      step === "role" && picked ? [PICK_DELAY, "name"] : step === "done" ? [DONE_DWELL, "beat"] : null
    if (!hop) return
    const id = window.setTimeout(() => setStep(hop[1]), hop[0])
    return () => window.clearTimeout(id)
  }, [step, picked, role])

  const pick = (value: Role) => {
    setRole(value)
    setPicked(true)
  }

  const submitName = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return setInvalid(true)
    setStep("email")
  }

  const submitEmail = async (e: FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setInvalid(true)
    setStep("sending")
    const started = Date.now()
    try {
      await onSubmit?.({ role, name: name.trim(), email })
      await new Promise((r) => setTimeout(r, Math.max(0, SENDING_MIN - (Date.now() - started))))
      setStep("done")
    } catch {
      setStep("email")
      setInvalid(true)
    }
  }

  const startBeat = () => {
    setHover(false)
    setStep("player")
    setPlaying(true)
    beat.play(genre)
  }

  const shuffle = () => {
    const next = GENRES.filter((g) => g !== genre)[Math.floor(Math.random() * (GENRES.length - 1))]
    setGenre(next)
    if (playing) beat.play(next)
  }

  const toggle = () => {
    if (playing) beat.stop()
    else beat.play(genre)
    setPlaying(!playing)
  }

  const lit = hover && (step === "idle" || step === "beat")
  const width =
    step === "player" ? playerW
    : step === "idle" ? Math.max(lit ? HOVER_WIDTH.idle : WIDTH.idle, lit ? nat.ask : nat.idle)
    : step === "beat" ? Math.max(lit ? HOVER_WIDTH.beat : WIDTH.beat, lit ? nat.beatHover : nat.beat)
    : step === "role" ? Math.max(WIDTH.role, nat.role + 8)
    : WIDTH[step]
  const panel = step === "sending" ? "email" : step

  const surface =
    step === "idle" ? (lit ? "bg-[#2a2a2d]" : "bg-[#111113]")
    : step === "role" ? "bg-[#111113]"
    : step === "name" || step === "email" || step === "sending" ? "bg-[#c6ecd2]"
    : step === "done" ? "bg-[#111113]"
    : step === "beat" ? (lit ? "bg-[#34343a]" : "bg-[#2a2a2d]")
    : "bg-[#2a2a2d]"

  const field = (value: string, onChange: (v: string) => void, placeholder: string, type: string, auto: string) => (
    <Input
      autoFocus
      type={type}
      value={value}
      autoComplete={auto}
      aria-label={placeholder}
      aria-invalid={invalid}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value)
        setInvalid(false)
      }}
      className="h-full flex-1 border-0 bg-transparent p-0 text-[15px] text-neutral-950 shadow-none placeholder:text-neutral-950/45 focus-visible:ring-0 dark:bg-transparent"
    />
  )

  return (
    <MotionConfig reducedMotion="user">
      <div className={cn("flex w-full justify-center", className)}>
        <motion.div style={{ x: mx, y: my }} className="max-w-full">
          <motion.div
            ref={pill}
            initial={false}
            animate={{ width }}
            transition={SPRING}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
            onPointerLeave={() => setHover(false)}
            className={cn(
              "relative h-[45px] max-w-full overflow-hidden rounded-full transition-colors duration-200",
              surface,
              step === "role" && "p-1",
              invalid && "bg-rose-200"
            )}
          >
            <AnimatePresence initial={false}>
              {panel === "idle" && (
                <motion.div key="idle" {...PUSH} className="absolute inset-0">
                  <Button
                    variant="ghost"
                    onClick={() => (setHover(false), setStep("role"))}
                    onFocus={() => setHover(true)}
                    onBlur={() => setHover(false)}
                    className="size-full rounded-full p-0 font-medium text-white hover:bg-transparent hover:text-white"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={lit ? "ask" : "join"}
                        {...FADE}
                        className={cn("whitespace-nowrap", lit ? "text-[17px]" : "text-[15px]")}
                      >
                        {lit ? "Talent or company?" : label}
                      </motion.span>
                    </AnimatePresence>
                  </Button>
                </motion.div>
              )}

              {panel === "role" && (
                <motion.div key="role" {...PUSH} className="absolute inset-1">
                  <ToggleGroup
                    type="single"
                    value={role}
                    onValueChange={(v) => v && pick(v as Role)}
                    aria-label="I am a"
                    className="grid size-full grid-cols-2 gap-0 rounded-full bg-neutral-500"
                  >
                    {(["talent", "company"] as const).map((r) => (
                      <ToggleGroupItem
                        key={r}
                        value={r}
                        onClick={() => pick(r)}
                        className="relative h-full rounded-full bg-transparent text-[15px] font-medium text-white hover:bg-transparent hover:text-white data-[state=on]:bg-transparent data-[state=on]:text-neutral-950"
                      >
                        {role === r && (
                          <motion.span
                            layoutId="role-thumb"
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                            className="absolute inset-0 rounded-full bg-white"
                          />
                        )}
                        <span className="relative">I’m a {r}</span>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </motion.div>
              )}

              {panel === "name" && (
                <motion.form key="name" {...PUSH} onSubmit={submitName} noValidate className="absolute inset-0 flex items-center gap-2 pr-[4.5px] pl-5">
                  {field(name, setName, "Enter your name", "text", "name")}
                  <Button type="submit" size="icon" aria-label="Continue" className="size-9 shrink-0 rounded-full bg-neutral-950 text-white hover:bg-neutral-800">
                    <ArrowRight className="size-4" />
                  </Button>
                </motion.form>
              )}

              {panel === "email" && (
                <motion.form key="email" {...PUSH} onSubmit={submitEmail} noValidate className="absolute inset-0 flex items-center gap-2 pr-[4.5px] pl-5">
                  {field(email, setEmail, "Enter your email", "email", "email")}
                  <Button
                    type="submit"
                    size="icon"
                    disabled={step === "sending"}
                    aria-label="Join the waitlist"
                    className="size-9 shrink-0 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 disabled:opacity-100"
                  >
                    {step === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  </Button>
                </motion.form>
              )}

              {panel === "done" && (
                <motion.div key="done" {...FADE} role="status" className="absolute inset-0 flex items-center justify-center text-[15px] font-medium text-white">
                  Thank you!
                  <span className="absolute right-[4.5px] grid size-9 place-items-center rounded-full bg-emerald-500">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  {SPARKS.map((s, i) => (
                    <motion.i
                      key={i}
                      aria-hidden
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{ x: s.x, y: s.y, opacity: 0, scale: 0.4 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={cn("absolute top-1/2 right-[22px] size-1.5 rounded-full", s.color)}
                    />
                  ))}
                </motion.div>
              )}

              {panel === "beat" && (
                <motion.div key="beat" {...PUSH} className="absolute inset-0">
                  <Button
                    variant="ghost"
                    onClick={startBeat}
                    onFocus={() => setHover(true)}
                    onBlur={() => setHover(false)}
                    className={cn(
                      "size-full justify-between rounded-full pr-[4.5px] pl-5 font-medium text-white hover:bg-transparent hover:text-white",
                      lit ? "text-[17px]" : "text-[15px]"
                    )}
                  >
                    Play a beat
                    <span className="grid size-9 place-items-center rounded-full bg-white text-neutral-950">
                      <Music2 className="size-4" />
                    </span>
                  </Button>
                </motion.div>
              )}

              {panel === "player" && (
                <motion.div key="player" {...PUSH} className="absolute inset-0">
                  <PlayerRow genre={genre} playing={playing} onShuffle={shuffle} onToggle={toggle} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Hidden copies used only to measure natural widths. */}
        <div ref={probe} aria-hidden className="pointer-events-none invisible fixed top-0 left-0 flex flex-col items-start font-medium whitespace-nowrap">
          <span data-k="idle" className="px-4 text-[15px]">{label}</span>
          <span data-k="ask" className="px-4 text-[17px]">Talent or company?</span>
          <span data-k="role" className="flex text-[15px]">
            <span className="px-4">I’m a company</span>
            <span className="px-4">I’m a company</span>
          </span>
          <span data-k="beat" className="flex items-center gap-2 pr-[4.5px] pl-5 text-[15px]">Play a beat<i className="size-9" /></span>
          <span data-k="beatHover" className="flex items-center gap-2 pr-[4.5px] pl-5 text-[17px]">Play a beat<i className="size-9" /></span>
        </div>
        <div ref={measure} aria-hidden className="pointer-events-none invisible fixed top-0 left-0 w-max">
          <PlayerRow genre={genre} playing={false} measure />
        </div>
      </div>
    </MotionConfig>
  )
}

interface PlayerRowProps {
  genre: Genre
  playing: boolean
  measure?: boolean
  onShuffle?: () => void
  onToggle?: () => void
}

function PlayerRow({ genre, playing, measure, onShuffle, onToggle }: PlayerRowProps) {
  return (
    <div className="flex h-[45px] items-center gap-3 pr-[4.5px] pl-4 text-[15px] font-medium whitespace-nowrap text-white">
      <Equalizer active={playing} />
      <span aria-live={measure ? undefined : "polite"} className={cn("text-left", !measure && "min-w-0 flex-1 truncate")}>
        {genre}
      </span>
      <Button
        size="icon"
        variant="outline"
        tabIndex={measure ? -1 : 0}
        onClick={onShuffle}
        aria-label="Shuffle genre"
        className="size-8 shrink-0 rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
      >
        <Shuffle className="size-3.5" />
      </Button>
      <Button
        size="icon"
        tabIndex={measure ? -1 : 0}
        onClick={onToggle}
        aria-label={playing ? "Pause" : "Play"}
        className="size-9 shrink-0 rounded-full bg-white text-neutral-950 hover:bg-white/90"
      >
        {playing ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
      </Button>
    </div>
  )
}

function Equalizer({ active }: { active: boolean }) {
  return (
    <span aria-hidden className="flex h-4 w-4 shrink-0 items-end gap-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-white"
          initial={{ height: "30%" }}
          animate={{ height: active ? ["30%", "100%", "50%", "85%", "30%"] : "30%" }}
          transition={active ? { duration: 0.9 + i * 0.17, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
        />
      ))}
    </span>
  )
}
