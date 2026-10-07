import { cn } from "@/lib/utils"

import { OrbitGallery } from "./orbit-gallery"
import { WaitlistCta, type WaitlistPayload } from "./waitlist-cta"

// Placeholder photos. Pass your own portraits through the `images` prop.
const DEFAULT_IMAGES = Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/selfmint-${i + 1}/800/624`)

export interface SelfmintHeroProps {
  images?: string[]
  brand?: string
  headline?: string
  ctaLabel?: string
  onSubmit?: (payload: WaitlistPayload) => void | Promise<void>
  className?: string
}

export function SelfmintHero({
  images = DEFAULT_IMAGES,
  brand = "Selfmint",
  headline = "Take control of your identity!",
  ctaLabel,
  onSubmit,
  className,
}: SelfmintHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-svh w-full flex-col items-center overflow-hidden bg-[#fbfbfb] text-neutral-950",
        className
      )}
    >
      <OrbitGallery images={images} className="z-0" />

      <header className="pointer-events-none relative z-20 flex h-20 shrink-0 items-start pt-3.5">
        <Logo name={brand} />
      </header>

      <div className="pointer-events-none relative z-20 flex flex-1 flex-col items-center justify-center gap-7 px-6">
        <h1
          style={{ fontFamily: "var(--font-display, inherit)" }}
          className="max-w-[8.5em] text-center text-[clamp(2.5rem,4.36vw,3.75rem)] leading-none font-extrabold tracking-[-0.055em] text-balance"
        >
          {headline}
        </h1>
        <WaitlistCta className="pointer-events-auto" label={ctaLabel} onSubmit={onSubmit} />
      </div>
    </section>
  )
}

function Logo({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg aria-hidden viewBox="0 0 24 24" className="size-[22px]">
        <rect x="1" y="1" width="12" height="12" fill="currentColor" />
        <rect x="10" y="10" width="12" height="12" fill="#fff" stroke="currentColor" strokeWidth="2.2" />
      </svg>
      <span className="text-[15px] leading-none font-extrabold tracking-tight">{name}.</span>
    </div>
  )
}
