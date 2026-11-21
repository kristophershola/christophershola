# Portfolio Case Studies Dynamic Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a centralized data-driven dynamic case study system (`/work/:slug`) with modular split-screen presentation components, publishing four active case studies (Mathevia, Lorewa, WRAPA, Juno), staging unpublished drafts, and migrating Population Media Center for complete parity.

**Architecture:** A single typed registry (`src/data/caseStudies.ts`) defines case study metadata, copy, impact statistics, and media configurations. A dynamic page (`src/pages/CaseStudyPage.tsx`) mounts a responsive split layout (`src/components/case-study/CaseStudyLayout.tsx`) featuring an agency narrative and responsive photo/stat grid on the left (`md:w-5/12`) and a polymorphic centerpiece panel on the right (`md:w-7/12`). Unknown or draft (`published: false`) slugs cleanly redirect to `/work`.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4, React Router 7, Motion (Framer Motion 14), Lucide React.

**Spec:** [`docs/superpowers/specs/2026-11-21-portfolio-case-studies-rollout-design.md`](file:///C:/Users/PC/.gemini/antigravity/worktrees/Portfolio/add_portfolio_case_study/docs/superpowers/specs/2026-11-21-portfolio-case-studies-rollout-design.md)

## Global Constraints

- Tone and standard: "Competence" and "Precise Language"—zero fabricated metrics, zero agency hype, bounded roles with concrete deliverables.
- Layout: Split desktop view (`md:w-5/12` narrative left, `md:w-7/12` media right) matching PMC and Tilde Research join layout, collapsing into vertical scroll on mobile (`< 768px`).
- Style tokens: Background `#191817`, text `#F3F3F4`, muted labels `#8E8F94`, borders `border-white/10`, hover borders `hover:border-white/30`.
- Release scope: Publish Mathevia, Lorewa, WRAPA, and Juno; scaffold 3D Visuals, Enviovic, and Event Flyers as draft (`published: false`).
- Zero build or type-check regressions (`npm run build` and `npx oxlint` must exit with 0 errors on every task).

## Review Focus

1. **Direct navigation to an unpublished or invalid slug:** Visiting `/work/unknown-slug` or `/work/enviovic` should safely redirect to `/work` without runtime crashing or blank screens.
2. **Video autoplay and mute behavior:** Videos in `MediaPanel` or `VideoPlayer` must start muted with `playsInline` to ensure background autoplay works without browser security rejections.
3. **Lightbox keyboard trap and escape handling:** Opening an image in the gallery lightbox must trap focus, close on `Escape` keypress or background backdrop click, and restore focus smoothly.
4. **Natural image aspect ratios:** Gallery items must retain their intrinsic aspect ratios without stretching, cropping, or layout jumps across breakpoints.
5. **PMC visual and functional parity:** Migrating Population Media Center onto the shared `CaseStudyLayout` must produce indistinguishable visual and interactive output compared to the original `PopulationMediaCenterPage.tsx`.

---

### Task 1: Typed Data Registry (`src/data/caseStudies.ts`)

**Files:**
- Create: `src/data/caseStudies.ts`
- Test: Verification via TypeScript compilation (`npm run build`)

**Interfaces:**
- Produces:
  - `type CaseStudyCategory`: `"UNDERSTOOD" | "CAPABLE" | "WELCOME" | "SEEN" | "UNHURRIED" | "HEARD" | "INVITED" | "READY" | "TRUSTED" | "TANGIBLE"`
  - `type MediaPanelType`: `"video" | "scrollable-page" | "device-toggle" | "carousel" | "stack"`
  - `interface CaseStudy`: Complete schema matching spec Section 3.1
  - `const caseStudies: CaseStudy[]`: Master registry array
  - `function getCaseStudy(slug: string): CaseStudy | undefined`
  - `function getPublishedCaseStudies(): CaseStudy[]`

- [ ] **Step 1: Write type definitions and registry schema in `src/data/caseStudies.ts`**

Define `CaseStudyCategory`, `MediaPanelType`, `CaseStudyMediaConfig`, `CaseStudyStat`, `CaseStudyGalleryItem`, and `CaseStudy`. Include helper query functions `getCaseStudy` and `getPublishedCaseStudies`.

- [ ] **Step 2: Add initial PMC baseline entry into `caseStudies.ts`**

Populate the existing PMC narrative, statistics, disciplines, and video media configuration into the registry to test data validity.

- [ ] **Step 3: Run TypeScript compiler to verify registry types**

Run: `npm run build`
Expected: PASS with 0 type errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/caseStudies.ts
git commit -m "feat(data): define case study schema and registry"
```

---

### Task 2: Extracted Case Study Modular Component Suite

**Files:**
- Create:
  - `src/components/case-study/Lightbox.tsx`
  - `src/components/case-study/VideoPlayer.tsx`
  - `src/components/case-study/ImageGrid.tsx`
  - `src/components/case-study/StatGrid.tsx`
  - `src/components/case-study/PaletteStrip.tsx`
  - `src/components/case-study/MediaPanel.tsx`
  - `src/components/case-study/CaseStudyLayout.tsx`
- Test: TypeScript compilation (`npm run build`) and linter (`npx oxlint`)

**Interfaces:**
- Consumes: `CaseStudy`, `CaseStudyMediaConfig`, `CaseStudyStat`, `CaseStudyGalleryItem` from `src/data/caseStudies.ts`
- Produces:
  - `Lightbox`: Modal dialog component with `Escape` handler, close button, and ARIA dialog roles.
  - `VideoPlayer`: Custom 16:9 video player with play/pause overlay, mute toggle, progress bar, and keyboard/touch support.
  - `ImageGrid`: 2-column masonry/natural aspect ratio image grid triggering lightbox selection.
  - `StatGrid`: 2x2 grid displaying typographic impact statistics with italic narrative lead-ins.
  - `PaletteStrip`: Swatch strip displaying brand identity hex tokens.
  - `MediaPanel`: Container rendering video, scrollable page frame, or device toggle based on `media.type`.
  - `CaseStudyLayout`: Split-screen layout integrating navigation, left narrative column, and right `MediaPanel`.

- [ ] **Step 1: Implement `Lightbox.tsx` and `VideoPlayer.tsx`**

Extract and enhance video player and modal lightbox from `PopulationMediaCenterPage.tsx`. Add keyboard listener for `Escape` and backdrop dismissal.

- [ ] **Step 2: Implement `ImageGrid.tsx`, `StatGrid.tsx`, and `PaletteStrip.tsx`**

Build left-column presentation blocks styled with project design tokens (`font-serif`, `font-mono`, `text-[#8E8F94]`, `border-white/10`).

- [ ] **Step 3: Implement `MediaPanel.tsx`**

Build the right-hand media container supporting `"video"`, `"scrollable-page"`, and `"device-toggle"` modes with fluid aspect ratio scaling.

- [ ] **Step 4: Implement `CaseStudyLayout.tsx`**

Assemble the split layout (`md:w-5/12` left scroll, `md:w-7/12` right fixed/centerpiece), integrating `Navbar`, back link, disciplines, challenge, quote, approach, `ImageGrid`, `StatGrid`, `PaletteStrip`, outbound links, and `Footer`.

- [ ] **Step 5: Run compiler and linter to verify components**

Run: `npm run build && npx oxlint`
Expected: PASS with 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/case-study/
git commit -m "feat(components): implement modular case study component suite"
```

---

### Task 3: Dynamic Route & Page Controller (`src/pages/CaseStudyPage.tsx`)

**Files:**
- Create: `src/pages/CaseStudyPage.tsx`
- Modify: `src/App.tsx:24-34`
- Test: Build and routing check

**Interfaces:**
- Consumes: `getCaseStudy` from `src/data/caseStudies.ts`, `CaseStudyLayout` from `src/components/case-study/CaseStudyLayout.tsx`
- Produces: Dynamic route handler mounting `/work/:slug`

- [ ] **Step 1: Implement `CaseStudyPage.tsx`**

Extract `slug` via `useParams()`. Look up study in `caseStudies`. If study is missing or `published === false`, redirect to `/work` using React Router `<Navigate to="/work" replace />`. If valid, invoke `usePageMeta` and render `<CaseStudyLayout study={study} />`.

- [ ] **Step 2: Register dynamic route in `src/App.tsx`**

Add `<Route path="/work/:slug" element={<CaseStudyPage />} />` to `<Routes>`.

- [ ] **Step 3: Run compiler to verify route wiring**

Run: `npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/CaseStudyPage.tsx src/App.tsx
git commit -m "feat(router): add dynamic /work/:slug route with draft redirect"
```

---

### Task 4: Ingestion and Optimization of Media Assets

**Files:**
- Create: Directories and assets under `public/work/`
  - `public/work/mathevia/`
  - `public/work/lorewa/`
  - `public/work/wrapa/`
  - `public/work/juno/`
- Test: File existence and size check (< 2MB per image, < 5MB per video)

**Interfaces:**
- Consumes: Google Drive file IDs identified during discovery
- Produces: Optimized local assets referenced in `src/data/caseStudies.ts`

- [ ] **Step 1: Ingest and organize Mathevia assets**

Download desktop hero, feature screens, pricing plans, and landing page captures from Google Drive into `public/work/mathevia/`.

- [ ] **Step 2: Ingest and organize Lorewa assets**

Incorporate brand identity sheet, logo, post graphics, and reel from `C:\Users\PC\Downloads\Lorewa` and Google Drive into `public/work/lorewa/`.

- [ ] **Step 3: Ingest and organize WRAPA assets**

Migrate and organize existing `wrapa-hero.jpg`, `wrapa.mp4`, and social graphics into `public/work/wrapa/`.

- [ ] **Step 4: Ingest and organize Juno assets**

Incorporate curated room, wellness, dining, and desktop/mobile screenshots from `C:\Users\PC\Downloads\Projects\juno-hotel` and Drive into `public/work/juno/`.

- [ ] **Step 5: Verify asset integrity and commit**

Verify all files load cleanly and sizes are within budgets.
```bash
git add public/work/
git commit -m "assets(work): add optimized media for mathevia, lorewa, wrapa, and juno"
```

---

### Task 5: Content Authoring & Registry Population

**Files:**
- Modify: `src/data/caseStudies.ts`
- Test: Build verification and copy audit

**Interfaces:**
- Produces: Fully populated entries for active publications (`mathevia`, `lorewa`, `wrapa-gender-online-academy`, `juno-boutique-hotel`, `population-media-center`) and draft scaffolding (`3d-visuals`, `enviovic`, `event-flyers`, `ismph`, `lavish-apartments` with `published: false`).

- [ ] **Step 1: Author Mathevia study (Category: `CAPABLE`)**

Draft grounded narrative on reframing math intimidation, student UX, and structured lesson delivery. Configure scrollable mockup media panel. Set `published: true`.

- [ ] **Step 2: Author Lorewa study (Category: `SEEN`)**

Draft narrative on Hausa women's bilingual learning identity, Fraunces/Nunito typography, rose/berry/lime palette tokens, and social content. Set `published: true`.

- [ ] **Step 3: Author WRAPA Gender Online Academy study (Category: `WELCOME`)**

Draft narrative on barrier-free STEM education for girls and women, digital curriculum, and Wayback platform archive. Set `published: true`.

- [ ] **Step 4: Author Juno Boutique Hotel study (Category: `UNHURRIED`)**

Draft narrative on translating Maitama hospitality and spatial calm into digital pacing, suite booking, and Thai wellness spa services. Set `published: true`.

- [ ] **Step 5: Scaffold draft studies in registry**

Add entries for `3d-visuals`, `enviovic`, `event-flyers`, `ismph`, and `lavish-apartments` with `published: false`.

- [ ] **Step 6: Run compiler and linter**

Run: `npm run build && npx oxlint`
Expected: PASS with 0 errors.

- [ ] **Step 7: Commit**

```bash
git add src/data/caseStudies.ts
git commit -m "feat(content): populate active case studies and scaffold drafts"
```

---

### Task 6: Work Page Feed Integration & Navigation Promotion

**Files:**
- Modify: `src/data/researchData.ts`
- Modify: `src/pages/WorkPage.tsx`
- Test: Build verification and visual check of `/work` feed

**Interfaces:**
- Consumes: `getPublishedCaseStudies()` from `src/data/caseStudies.ts`
- Produces: Synchronized portfolio feed displaying active case studies with internal routing links.

- [ ] **Step 1: Update `researchData.ts` to derive active cards from registry**

Promote Mathevia, Lorewa, and WRAPA from archive into active feed. Normalize date formats and align card categories.

- [ ] **Step 2: Verify `ResearchCard.tsx` navigates internal `/work/:slug` routes seamlessly**

Ensure clicking any card routes internally to `/work/:slug` without hard reloads.

- [ ] **Step 3: Run build and lint verification**

Run: `npm run build && npx oxlint`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/researchData.ts src/pages/WorkPage.tsx
git commit -m "feat(work): synchronize active case studies with portfolio feed"
```

---

### Task 7: Parity Migration of PMC onto Shared Layout & Full Verification

**Files:**
- Modify: `src/pages/PopulationMediaCenterPage.tsx` (re-export or wrap `CaseStudyLayout` for `/work/population-media-center`)
- Test: Full build, lint, and browser verification across viewports

- [ ] **Step 1: Connect `PopulationMediaCenterPage.tsx` to shared `CaseStudyLayout`**

Render `CaseStudyLayout` with PMC registry data, verifying identical visual rendering, video playback, and lightbox behaviors.

- [ ] **Step 2: Run complete production build and linter**

Run: `npm run build && npx oxlint`
Expected: Build succeeds with 0 errors.

- [ ] **Step 3: Verification of Review Focus failure modes**

1. Direct navigation to `/work/mathevia`, `/work/lorewa`, `/work/wrapa-gender-online-academy`, `/work/juno-boutique-hotel`, and `/work/population-media-center`.
2. Direct navigation to `/work/enviovic` and `/work/3d-visuals` redirects cleanly to `/work`.
3. Verification of Lightbox `Escape` key capture and focus.
4. Verification of responsive mobile layout at 375px.

- [ ] **Step 4: Commit**

```bash
git add src/pages/PopulationMediaCenterPage.tsx
git commit -m "refactor(pmc): migrate population media center to shared case study layout"
```
