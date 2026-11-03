# Ghosty Reveal Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site background with the `ghosty-reveal` component, where photographs bleed in and out of view through feathered cloudy masks across a scattered layout matching the site's dark palette (`#191817`).

**Architecture:**
1. Set up static assets in `public/ghosty-reveal/` copying from `.agents/skills/ghosty-reveal/assets/media/`.
2. Implement the component in `src/components/ghosty-reveal/` (`card.tsx`, `ghost-reveal.tsx`, `loop.ts`, `mask.ts`, `params.ts`, and `runtime/`), configured with `GROUND = '#191817'`.
3. Verify the implementation passes `.agents/skills/ghosty-reveal/scripts/check.mjs`.
4. Integrate `GhostyRevealCard` into `src/App.tsx` replacing `ImageGalaxyCard`, with ambient opacity tuning across Home and subpages.
5. Verify build (`npm run build`) and linting (`npm run lint`), commit and push to the remote branch to update the Pull Request.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4.

**Spec:** `.agents/skills/ghosty-reveal/SKILL.md`

## Global Constraints

- **Fixed Contract:** Preserve the SVG mask displacement filter, loop timings (`SWAP_BUFFER = 220`, `BEAT = 140`), `usePause` hooks, and reduced motion fallbacks.
- **Ground Theme:** Set `GROUND` to `#191817` to blend with the portfolio backdrop.
- **Performance Contract:** All files in `src/components/ghosty-reveal/` must pass `node .agents/skills/ghosty-reveal/scripts/check.mjs`.

## Review Focus

1. **Mask Rendering:** Fractal noise SVG linear gradient masks render cleanly in modern browsers without rendering artifacts.
2. **Timing & Stagger:** Slots stagger their breathing loops without synchronized flashing or layout shifts.
3. **Contrast & Readability:** Images stay subtly behind foreground typography and case studies.
4. **Clean Loop Lifecycle:** Unmounting or backgrounding tabs pauses animations via `usePause` and cancels timers.

---

### Task 1: Static Assets Setup for Ghosty Reveal

**Files:**
- Create: `public/ghosty-reveal/vault/grid/*`

- [ ] Step 1: Copy `.agents/skills/ghosty-reveal/assets/media/` to `public/ghosty-reveal/`.
- [ ] Step 2: Verify `public/ghosty-reveal/vault/grid/grid-*.webp` exist.

---

### Task 2: Component Implementation & Performance Contract Verification

**Files:**
- Create: `src/components/ghosty-reveal/params.ts`
- Create: `src/components/ghosty-reveal/mask.ts`
- Create: `src/components/ghosty-reveal/loop.ts`
- Create: `src/components/ghosty-reveal/ghost-reveal.tsx`
- Create: `src/components/ghosty-reveal/card.tsx`
- Create: `src/components/ghosty-reveal/runtime/media.ts`
- Create: `src/components/ghosty-reveal/runtime/use-pause.ts`
- Verify: `node .agents/skills/ghosty-reveal/scripts/check.mjs src/components/ghosty-reveal`

- [ ] Step 1: Implement `runtime/media.ts` and `runtime/use-pause.ts`.
- [ ] Step 2: Implement `params.ts` with `GROUND = '#191817'`.
- [ ] Step 3: Implement `mask.ts`, `loop.ts`, `ghost-reveal.tsx`, and `card.tsx`.
- [ ] Step 4: Run `node .agents/skills/ghosty-reveal/scripts/check.mjs src/components/ghosty-reveal` to ensure zero errors.

---

### Task 3: Site Integration in App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] Step 1: Replace `ImageGalaxyCard` with `GhostyRevealCard` in `src/App.tsx`.
- [ ] Step 2: Set ambient opacity layering (`opacity-90` on Home, `opacity-45` on subpages).

---

### Task 4: Verification, Build & Push

**Files:**
- Verify: `npm run build`
- Verify: `npm run lint`

- [ ] Step 1: Run `npm run build` to confirm TypeScript and Vite compilation.
- [ ] Step 2: Run `npm run lint` to verify oxlint passes.
- [ ] Step 3: Commit changes and push to origin branch `add_image_galaxy_skill`.
