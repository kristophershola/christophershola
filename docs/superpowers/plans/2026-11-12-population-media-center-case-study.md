# Population Media Center Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a dedicated, high-fidelity portfolio case study page for Population Media Center at `/work/population-media-center`, replicating the split-screen layout of `https://tilderesearch.com/join` / `InquiriesPage.tsx` with a static left context column and an independently scrollable right visual column.

**Architecture:** A responsive split-screen page (`PopulationMediaCenterPage.tsx`) where the desktop viewport maintains a static left column (`md:w-5/12`) containing the overview, 5 discipline breakdowns, and impact stats, while the right column (`md:w-7/12`) independently scrolls through the documentary video reel (`/population-media-center.mp4`) and all 8 campaign poster artworks. On mobile/tablet portrait, it gracefully cascades into a single-column reading and visual stream.

**Tech Stack:** React 19, Vite 8, React Router 7, Tailwind CSS 4, Motion (`motion/react`), Lucide React.

**Spec:** `docs/superpowers/specs/2026-11-12-population-media-center-case-study-design.md`

## Global Constraints

- **Layout Structure:** Mirror `tilderesearch.com/join` and `src/pages/InquiriesPage.tsx` (`h-screen overflow-hidden` wrapper on desktop, fixed Navbar, static `md:w-5/12` left pane, independently scrollable `md:w-7/12` right pane).
- **Typography:** Strictly use existing design system tokens: `font-serif` (`Serrif`), `font-sans` (`Another Sans`), `font-mono` (`Flexa Mono` / `Geist Mono`).
- **Color Palette:** Strictly adhere to the `#191817` void background, `#F3F3F4` primary text, `#8E8F94` muted secondary text, and `border-white/10`.
- **Zero Regressions:** Existing pages (`HomePage`, `AboutPage`, `WorkPage`, `InquiriesPage`) must remain completely unaffected.
- **Verification Gate:** `npm run build` (`tsc -b && vite build`) and `npx oxlint` must pass with zero errors.

## Review Focus

1. **Desktop Left-Column Viewport Fit:** On standard 1080p and laptop screens (e.g. 1366x768 or 1280x800), ensure the left pane fits comfortably without clipping or awkward overflow, providing a subtle internal scroll only when viewport height is constrained.
2. **Video Player Performance & Autoplay Policy:** Ensure `/population-media-center.mp4` handles inline playback gracefully with play/pause and mute/unmute controls without causing layout shifts or console errors.
3. **Route Navigation & Scroll Restoration:** Navigating from `/work` to `/work/population-media-center` must scroll smoothly to top and back without broken state.
4. **Image Aspect Ratios:** All 8 campaign posters must maintain their original square/portrait aspect ratios without distortion or clipping.
5. **Mobile Responsiveness:** At `<768px`, the split layout must smoothly transition into a unified vertical flow.

---

### Task 1: Route Linking & Data Integration Foundation

**Files:**
- Modify: `src/data/researchData.ts:12-25`
- Modify: `src/components/ResearchCard.tsx:42-50`
- Test: Build verification with `npm run build`

- [ ] **Step 1.1: Update researchData.ts link**
  Change `researchItems[0].link` in `src/data/researchData.ts` from `"https://www.populationmedia.org"` to `"/work/population-media-center"`.

- [ ] **Step 1.2: Enable internal routing in ResearchCard.tsx**
  In `src/components/ResearchCard.tsx`, import `Link` from `react-router-dom`. If `item.link.startsWith("/")`, wrap the card in `<Link to={item.link}>` rather than `<a href={item.link} target="_blank">`.

- [ ] **Step 1.3: Verify TypeScript compilation**
  Run `npm run build` to confirm no type breakages in `ResearchCard.tsx` and `researchData.ts`.

---

### Task 2: Create PopulationMediaCenterPage Layout & Left Static Column

**Files:**
- Create: `src/pages/PopulationMediaCenterPage.tsx`
- Modify: `src/App.tsx:1-35`
- Test: Run `npm run build` and test route rendering

- [ ] **Step 2.1: Register new route in App.tsx**
  In `src/App.tsx`, import `PopulationMediaCenterPage` from `@/pages/PopulationMediaCenterPage` and register `<Route path="/work/population-media-center" element={<PopulationMediaCenterPage />} />`.

- [ ] **Step 2.2: Implement Split Screen Frame & Left Static Column**
  Create `src/pages/PopulationMediaCenterPage.tsx`:
  - Set outer container: `relative w-full min-h-screen md:h-screen md:overflow-hidden text-[#F3F3F4] select-none flex flex-col justify-between`.
  - Include `<Navbar />`.
  - Structure `main`: `relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 flex flex-col md:flex-row md:overflow-hidden gap-10 md:gap-12 lg:gap-16`.
  - Build left column (`w-full md:w-5/12 flex flex-col shrink-0 md:h-[calc(100vh-140px)] md:overflow-y-auto md:pr-4 custom-scrollbar`):
    - **Header metadata:** Badges `CASE STUDY // ENTERTAINMENT-EDUCATION` and `POPULATION MEDIA CENTER`.
    - **Heading & Tagline:** `Population Media Center` in `font-serif text-[32px] sm:text-[36px]`, with subtitle `"25 Years of Transformative Entertainment-Education"`.
    - **Introduction (Who Population Media Center Are):** Overview of PMC's mission, the Sabido methodology, and mass-media behavioral transformation across Nigeria and globally.
    - **Areas Worked (The 5 Core Disciplines):**
      1. *Brand Strategy*
      2. *Campaign Ideation*
      3. *Storytelling and Narrative Development*
      4. *Graphic Design*
      5. *PR and Media Strategy*
    - **Impact Statistics Bento:**
      - `1.5×` — Likelihood of HIV-risk discussion with partner/relatives (*Siñalamba* radio drama listeners).
      - `500M+` — Audience members reached worldwide across 50+ countries.
      - `50+` — Countries with active broadcast interventions.
      - `25 Years` — Longitudinal social behavioral transformation.
    - **Action Links:** "Official Website ↗" (`https://www.populationmedia.org`) and "← Back to Work" (`/work`).

- [ ] **Step 2.3: Verify initial split layout build**
  Run `npm run build` to confirm `PopulationMediaCenterPage.tsx` compiles cleanly.

---

### Task 3: Build the Right Scrollable Column with Video Reel & Visual Campaign Gallery

**Files:**
- Modify: `src/pages/PopulationMediaCenterPage.tsx`
- Test: Build verification with `npm run build` and visual inspection via Puppeteer

- [ ] **Step 3.1: Implement Custom 16:9 Video Reel Player**
  In the right column (`w-full md:w-7/12 md:overflow-y-auto md:pr-4 space-y-10 custom-scrollbar`):
  - Add the documentary video container for `/population-media-center.mp4` with a 16:9 aspect ratio.
  - Implement smooth controls: Play/Pause toggle overlay, Mute/Unmute toggle, and time progress indicator.
  - Add descriptive caption: `"Population Media Center: Discovering Nigeria's Impact — 25-Year Retrospective Reel"`.

- [ ] **Step 3.2: Implement the 8 Campaign Poster Artwork Stream**
  Create rich artwork showcase cards for all 8 campaign designs:
  1. **PMC: 25 Years of Impact** (`/pmc/pmc-25-years.jpg`) — Founder portrait & cultural geometric borders.
  2. **Siñalamba: HIV Risk Dialogue** (`/pmc/sinalamba-stat.jpg`) — 1.5× discussion metric graphic.
  3. **Nelson Mandela Day: Emancipation of Women** (`/pmc/mandela-day.jpg`) — Women's rights and gender equity.
  4. **What Is Doughnut Economics?** (`/pmc/doughnut-economics.jpg`) — Ecological ceiling & social foundation.
  5. **Ending FGM: A Global Problem** (`/pmc/fgm-global-problem.jpg`) — Global solidarity with UNHCR.
  6. **World Mental Health Day: Ask for Help** (`/pmc/mental-health-day.jpg`) — Puzzle silhouette & stigma reduction.
  7. **Civic Voice: Your Vote Amplifies Your Voice** (`/pmc/vote-amplifies-voice.jpg`) — Youth voting mobilization.
  8. **World Environment Day: Community & Ecology** (`/pmc/world-environment-day.jpg`) — Intersectional environmental stewardship.
  - Each item features:
    - High-resolution image in native aspect ratio (`aspect-square` or `aspect-[1024/858]`) with subtle border `border-white/10` and background `#222120`.
    - Category / discipline badge + Year tag.
    - Title in `font-serif`.
    - Contextual analytical paragraph describing the design rationale and campaign objective.

- [ ] **Step 3.3: Add End-of-Scroll Footer**
  Place `<Footer variant="static" />` inside the right scrolling column at the bottom.

- [ ] **Step 3.4: Verify complete page build**
  Run `npm run build` and `npx oxlint` to ensure complete TypeScript and lint compliance.

---

### Task 4: Responsive Verification & Visual Polish

**Files:**
- Modify: `src/pages/PopulationMediaCenterPage.tsx` (if any adjustments needed)
- Test: Puppeteer inspection at Desktop (1440x900), Laptop (1280x800), and Mobile (390x844)

- [ ] **Step 4.1: Test Desktop Viewport (1440x900)**
  Launch dev server if not running, navigate to `http://localhost:3000/work/population-media-center` with Puppeteer, take a screenshot, and verify:
  - Left pane is static.
  - Right pane is independently scrollable.
  - Video player renders cleanly.
  - Fonts match `Serrif`, `Another Sans`, `Flexa Mono`.

- [ ] **Step 4.2: Test Laptop Viewport (1280x800)**
  Verify with Puppeteer that the left column does not clip and allows internal scrolling if height is constrained.

- [ ] **Step 4.3: Test Mobile Viewport (390x844)**
  Verify with Puppeteer that mobile cascades into a single vertical scroll stream with full readability.

- [ ] **Step 4.4: Full Test Suite & Git Commit**
  Run `npm run build` and `npx oxlint` to confirm zero errors, then commit the implementation.
