# Image Galaxy Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the `image-galaxy` 3D parallax drifting image field as a seamless, high-performance ambient background across the portfolio site, tailored to the dark theme (`#191817`).

**Architecture:** 
1. Copy image assets from `.agents/skills/image-galaxy/assets/media/` into `public/image-galaxy/` so static assets are served locally.
2. Implement the Image Galaxy component in `src/components/image-galaxy/` using the skill's template files (`card.tsx`, `engine.ts`, `params.ts`, and `runtime/`), adapting the ground theme color to `#191817` and viewport design width for responsive full-screen scaling.
3. Validate against the performance contract using `.agents/skills/image-galaxy/scripts/check.mjs`.
4. Integrate the galaxy into `src/App.tsx` as a fixed ambient backdrop with proper z-indexing, ensuring full interactivity (drag on home page, scroll-linked parallax throughout) while preserving accessibility and clickability of all foreground elements (Navbar, case studies, buttons, links).
5. Build and typecheck the application with `npm run build` and verify visual aesthetics and responsiveness.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Motion.

**Spec:** `.agents/skills/image-galaxy/SKILL.md`

## Global Constraints

- **Fixed Contract:** Do not alter the core engine mechanics (perspective, translate3d offsets, wrap logic, lerp easing, reduced motion support, cleanup in destroy).
- **Ground Color:** Set `GROUND` to `#191817` so negative-depth haze blends seamlessly into the portfolio's background tone.
- **Performance Contract:** All files in `src/components/image-galaxy/` must pass `node .agents/skills/image-galaxy/scripts/check.mjs`.
- **A11y & Usability:** Foreground text and interactive elements (links, buttons, navigation) must maintain full pointer event access and clear contrast.

## Review Focus

1. **Overlay & Text Legibility:** Galaxy images must not overpower editorial copy or case studies; ambient opacity and z-index must sit cleanly behind all routes.
2. **Pointer Event Routing:** Home screen must accept drag interactions on open space while Navbar links, footer links, and page buttons remain click-responsive.
3. **Scroll Parallax:** Window scrolling must smoothly accelerate the galaxy drift without teleportation or layout shift.
4. **Reduced Motion:** If `prefers-reduced-motion: reduce` is active, the loop must remain stopped and render a clean, static 3D layout.
5. **Memory & Cleanup:** Navigating between pages or resizing must not leak requestAnimationFrame loops, event listeners, or ResizeObserver instances.

---

### Task 1: Static Assets Setup

**Files:**
- Create: `public/image-galaxy/vault/grid/*` (copied from `.agents/skills/image-galaxy/assets/media/`)

- [ ] Step 1: Create directory `public/image-galaxy` if it doesn't already exist.
- [ ] Step 2: Copy media files from `.agents/skills/image-galaxy/assets/media/` to `public/image-galaxy/`.
- [ ] Step 3: Verify that `public/image-galaxy/vault/grid/grid-1.webp` through `grid-18.webp` exist.

---

### Task 2: Component Implementation & Performance Contract Verification

**Files:**
- Create: `src/components/image-galaxy/params.ts`
- Create: `src/components/image-galaxy/engine.ts`
- Create: `src/components/image-galaxy/card.tsx`
- Create: `src/components/image-galaxy/runtime/media.ts`
- Create: `src/components/image-galaxy/runtime/use-pause.ts`
- Verify: `node .agents/skills/image-galaxy/scripts/check.mjs src/components/image-galaxy`

- [ ] Step 1: Copy `assets/template/runtime/media.ts` and `assets/template/runtime/use-pause.ts` to `src/components/image-galaxy/runtime/`.
- [ ] Step 2: Implement `src/components/image-galaxy/params.ts` setting `GROUND = '#191817'`, `DESIGN_WIDTH = 1400`, `COUNT_DESKTOP = 14`, `COUNT_MOBILE = 7`, `IMAGE_SIZE = 120`, and `IMAGE_SIZE_MOBILE = 70`.
- [ ] Step 3: Implement `src/components/image-galaxy/engine.ts` keeping fixed physics, wrap boundaries, and easing.
- [ ] Step 4: Implement `src/components/image-galaxy/card.tsx` keeping fixed ResizeObserver, pointer drag, scroll handling, and pause hooks.
- [ ] Step 5: Run `node .agents/skills/image-galaxy/scripts/check.mjs src/components/image-galaxy` to ensure it passes the contract with zero errors.

---

### Task 3: Site Integration in App.tsx

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/HomePage.tsx` (if needed for drag passthrough)

- [ ] Step 1: Import `ImageGalaxyCard` into `src/App.tsx`.
- [ ] Step 2: Place `ImageGalaxyCard` in a fixed backdrop layer (`fixed inset-0 z-0`) with subtle ambient opacity so foreground content remains prominently readable.
- [ ] Step 3: Ensure foreground route content is layered above at `relative z-10`, allowing background drag events through empty space while preserving pointer interactivity for all links, inputs, and buttons.
- [ ] Step 4: Test in browser or verify DOM structure that navigation and routes render cleanly.

---

### Task 4: TypeScript Build & Verification

**Files:**
- Test/Build: `npm run build`
- Lint: `npm run lint`

- [ ] Step 1: Run `npm run build` to verify full TypeScript compilation and Vite production bundle.
- [ ] Step 2: Run `npm run lint` to confirm zero lint regressions.
- [ ] Step 3: Commit changes with a descriptive message.
