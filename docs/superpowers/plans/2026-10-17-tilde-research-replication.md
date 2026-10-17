# Tilde Research Replication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replicate the Tilde Research website (https://tilderesearch.com/) from scratch with 1:1 visual fidelity, academic-monastic "dark-tech" aesthetic, full responsive behavior across 4 breakpoints, exact typography, interactive coordinate grids, ambient bipartite video, bilateral vector wings, complete 17-paper research catalog, and careers portal.

**Architecture:** Client-side React 19 application bundled with Vite and Tailwind CSS v4, utilizing `react-router-dom` for seamless page routing (`/`, `/about`, `/research`, `/join`), `motion` (formerly Framer Motion) for fluid micro-interactions and page transitions, and accessible UI component patterns from `shadcn/ui` / `motion-primitives` / `watermelon-ui`.

**Tech Stack:** 
- React 19, Vite, TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- `motion` (Framer Motion v14) & `clsx` / `tailwind-merge`
- `react-router-dom` v7
- Component libraries: `shadcn/ui` primitives, `motion-primitives`
- Custom Typography: `Serrif VF` (Variable Serif), `af Another Sans` (Hairline Sans), `GT Flexa Mono` / `Geist Mono`

**Spec:** `c:\Users\PC\Downloads\tilde_research_visual_analysis.md` and live analysis of `https://tilderesearch.com/`

---

## Global Constraints

- **Color Ground:** Near-absolute obsidian black `#010204` (`rgb(1, 2, 4)`) background with zero OLED smear.
- **Color Text:** Desaturated off-white `#F3F3F4` (`rgb(243, 243, 244)`) preventing retinal glare, achieving 18.8:1 contrast ratio.
- **Hover Inversion:** Dark elements invert to solid white `#FFFFFF` with `#000000` text on hover.
- **Coordinate Lattice:** $3\text{px} \times 3\text{px}$ dots at `rgba(255, 255, 255, 0.3)`.
- **Centerpiece Video:** `https://framerusercontent.com/assets/Ig3rUMsiJFPn7k8TrUMqck7OdoA.mp4` (looping, muted, playsinline, 60fps).
- **Font Stack:**
  - Headlines/Display: `Serrif VF-TRIAL Variable Compressed Thin` (`30px`, weight 100, tracking `-0.6px` / `-0.02em`, line-height `100%`).
  - Body: `af Another Sans Variable Variable Thin` (`16px`/`14px`, weight 100, tracking `+0.16px` / `0.01em`, line-height `130%`).
  - Metadata/Badges/Footer: `Geist Mono` / `GT Flexa Mono` (`12px`, weight 400, tracking `+0.12px` / `0.01em`, line-height `100%`).
- **Semantic Standard:** Fix Framer bad practices: use `<p>` for manifesto text (not `<H1>`), informative `alt` tags on research cards, and `:focus-visible` dashed outlines.
- **Component Libraries:** Exclusively use component libraries listed in `ui-library-installation-commands-v3.md` (shadcn/ui, motion-primitives, watermelon-ui, radix-ui).

---

## Review Focus

1. **Desktop Viewport Lock (`100vh`)**: Homepage must fit entirely within the desktop viewport without unwanted vertical scrolling or scrollbars, while allowing normal scrolling on mobile/tablet.
2. **Font Loading & Fallback Flash**: Custom fonts (`Serrif`, `af Another Sans`, `GT Flexa Mono`) must load without layout shifts or raw fallback jumps.
3. **Bilateral Wing SVGs Alignment**: On `/about`, vector wings must frame the manifesto text symmetrically on desktop and gracefully collapse on mobile.
4. **Research Card Read-More Hover Dynamics**: Hovering any card must trigger an opacity and transform reveal of the hairline "Read More" label without layout jank.
5. **Mobile Navigation Overlay**: Hamburger toggle must smoothly reveal a fullscreen dark overlay with large numbered navigation links `(1)`, `(2)`, `(3)`.

---

### Task 1: Clean Slate & Build Toolchain Configuration

**Files:**
- Delete: Obsolete prototype files (`src/components/*`, `.grid/*`, etc.)
- Preserve: `.fonts/*`
- Modify: `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`
- Create: `src/lib/utils.ts`

**Interfaces:**
- Produces: `@/` path alias pointing to `src/`, `cn()` utility in `src/lib/utils.ts`.

- [ ] **Step 1: Clean obsolete portfolio files and directories**
  Remove existing prototype components in `src/components`, obsolete files in `.grid/`, keeping `.fonts/` and `public/`.
- [ ] **Step 2: Configure Path Aliases in `vite.config.ts` and `tsconfig.json`**
  Add `@` alias to `vite.config.ts` (`resolve: { alias: { '@': path.resolve(__dirname, './src') } }`).
- [ ] **Step 3: Create `src/lib/utils.ts`**
  Implement the standard `cn(...inputs: ClassValue[])` helper using `clsx` and `tailwind-merge`.
- [ ] **Step 4: Verify build works**
  Run: `npm run build`
  Expected: Clean build without errors.

---

### Task 2: Typography & CSS Design System Tokens

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`

**Interfaces:**
- Produces: Global CSS variables (`--background`, `--foreground`), `@font-face` rules for `Serrif`, `af Another Sans`, `GT Flexa Mono`, and Tailwind utility classes (`font-serif`, `font-sans`, `font-mono`).

- [ ] **Step 1: Define `@font-face` rules and root tokens in `src/index.css`**
  Register:
  - `Serrif` from `../.fonts/Serrif-TRIAL-Regular.woff2`
  - `af Another Sans` from `../.fonts/afAnotherSans-Medium-Trial.otf`
  - `GT Flexa Mono` from `../.fonts/GT-Flexa-Mono-Regular-Trial.woff2`
  Configure theme colors: background `#010204`, foreground `#F3F3F4`, border `rgba(255,255,255,0.1)`.
- [ ] **Step 2: Update `index.html`**
  Set `<title>Tilde Research</title>`, dark theme meta tag, favicon, and dark background.
- [ ] **Step 3: Verify fonts and styles**
  Run `npm run build` to confirm CSS compilation with `@tailwindcss/vite`.

---

### Task 3: Interactive Coordinate Grid Matrix Component

**Files:**
- Create: `src/components/CoordinateGrid.tsx`

**Interfaces:**
- Consumes: Tailwind CSS utility classes.
- Produces: `<CoordinateGrid />` component rendering the 6-row × 12-column dot lattice.

- [ ] **Step 1: Implement `<CoordinateGrid />`**
  Build a responsive grid representing the exact Framer matrix:
  - Grid points spaced mathematically across the viewport with $3\text{px} \times 3\text{px}$ dots.
  - Subdued opacity (`rgba(255, 255, 255, 0.25)` to `0.3`).
  - Pointer-events set to none so it does not block interactions.
- [ ] **Step 2: Add responsive hide rules matching live site**
  Hide outer columns on tablet (`<1200px`) and mobile (`<810px`) matching Framer breakpoints.
- [ ] **Step 3: Verification**
  Render in a test view to verify lattice alignment.

---

### Task 4: UI Primitives (Button, Badge, Social Link)

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/badge.tsx`

**Interfaces:**
- Produces:
  - `Button`: pill-shaped button with solid white contrast inversion on hover.
  - `Badge`: monospace tag badge (`VIGNETTE`, `TECHNICAL RELEASE`, `ANNOUNCEMENT`, `FULL-TIME`, `INTERNSHIP`).

- [ ] **Step 1: Implement `Button` component**
  Create accessible pill button with framer-motion / CSS spring transitions:
  - Default: border `rgba(255,255,255,0.15)`, background `rgba(255,255,255,0.02)`, text `#F3F3F4`.
  - Hover: background `#FFFFFF`, text `#000000`, border `#FFFFFF`.
- [ ] **Step 2: Implement `Badge` component**
  Create technical monospace badge with subtle dark border and muted uppercase typography.
- [ ] **Step 3: Verify button and badge rendering**

---

### Task 5: Navbar & Mobile Fullscreen Navigation Drawer

**Files:**
- Create: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `react-router-dom` (`NavLink`, `useLocation`), `motion`.
- Produces: `<Navbar />` with SVG logo, desktop citation links `About (1)`, `Research (2)`, `Join (3)`, and animated mobile drawer.

- [ ] **Step 1: Extract and integrate exact Tilde SVG Logo**
  Embed the exact inline vector SVG (`viewBox="0 0 147 18.296"`) linking to `/`.
- [ ] **Step 2: Build desktop navigation links with citation numbers**
  - Links: `About`, `Research`, `Join` with superscripts `(1)`, `(2)`, `(3)`.
  - Font: `af Another Sans` 14px, citation 11px with 0.5 opacity.
  - Underline/opacity shift on hover and active route state.
- [ ] **Step 3: Implement Mobile Hamburger & Fullscreen Drawer**
  - Minimalist 2-line hamburger icon visible on mobile (`<810px`).
  - Animated full-screen modal using `motion` with large typography and link dismiss on click.
- [ ] **Step 4: Verify navigation transitions**

---

### Task 6: Global Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Produces: `<Footer />` component with social links (`Twitter`, `LinkedIn`, `GitHub`).

- [ ] **Step 1: Implement `<Footer />`**
  - Technical monospace links: `Twitter` (`https://x.com/tilderesearch`), `LinkedIn` (`https://www.linkedin.com/company/tilderesearch/`), `GitHub` (`https://github.com/tilde-research`).
  - 12px `Geist Mono` / `GT Flexa Mono` with 1px animated hover underline.
- [ ] **Step 2: Verify responsive positioning**
  Desktop fixed/anchored bottom layout; mobile stacked bottom layout.

---

### Task 7: Homepage Hero & Looping Bipartite Neural Graph

**Files:**
- Create: `src/pages/HomePage.tsx`

**Interfaces:**
- Consumes: `<CoordinateGrid />`, `<Navbar />`, `<Footer />`, `motion`.
- Produces: Homepage view matching `https://tilderesearch.com/`.

- [ ] **Step 1: Embed ambient bipartite neural network video**
  - Video URL: `https://framerusercontent.com/assets/Ig3rUMsiJFPn7k8TrUMqck7OdoA.mp4`
  - Dimensions: `660px × 787px` centered in viewport on desktop.
  - Props: `autoPlay`, `loop`, `muted`, `playsInline`, `objectFit="cover"`.
- [ ] **Step 2: Implement bottom-left editorial copy**
  - Headline: "Understanding\nIntelligence" in `Serrif VF` (30px, hairline weight 100, tracking -0.6px).
  - Body: "Tilde Research is a moonshot AI lab advancing mechanistic interpretability, new architectures, and pretraining science." in `af Another Sans`.
  - Second sentence: "We build foundational understanding of models to advance the frontier of intelligence."
- [ ] **Step 3: Desktop Viewport Lock & Mobile Responsive Flow**
  - Desktop: strictly locked to `100vh`, no scrollbar.
  - Mobile: video flows to top half, typography stacks naturally below.
- [ ] **Step 4: Verify animations**
  Smooth fade-up reveals on mount via `motion`.

---

### Task 8: About Page with Bilateral Wing Vectors

**Files:**
- Create: `src/pages/AboutPage.tsx`

**Interfaces:**
- Consumes: `<CoordinateGrid />`, `<Navbar />`, `<Footer />`.
- Produces: About page view matching `https://tilderesearch.com/about`.

- [ ] **Step 1: Integrate bilateral wing SVGs**
  - Left wing vector (`viewBox="0 0 301 521"`) representing the input network fan.
  - Right wing vector mirrored representing the output network fan.
  - Coordinate position flanking the central column.
- [ ] **Step 2: Implement manifesto editorial typography**
  - Headline: "Our mission at Tilde is to deeply understand the inner mechanisms of models in order to advance the frontier of intelligence"
  - Body paragraphs explaining mechanistic interpretability, model compression, search space, and the A* heuristic.
  - Semantic `<p>` tags for accessibility.
- [ ] **Step 3: Responsive handling**
  On mobile (`<810px`), bilateral wings collapse to avoid cluttering text.
- [ ] **Step 4: Verify alignment and contrast**

---

### Task 9: Research Catalog (3-Column Bento Grid & 17 Papers)

**Files:**
- Create: `src/data/researchData.ts`
- Create: `src/components/ResearchCard.tsx`
- Create: `src/pages/ResearchPage.tsx`

**Interfaces:**
- Consumes: Research paper metadata dataset.
- Produces: Research catalog view matching `https://tilderesearch.com/research`.

- [ ] **Step 1: Create `src/data/researchData.ts`**
  Encode all 17 research items with exact titles, descriptions, categories (`VIGNETTE`, `TECHNICAL RELEASE`, `ANNOUNCEMENT`), dates, image URLs, and blog links.
- [ ] **Step 2: Implement `<ResearchCard />`**
  - High-aspect preview header with crisp image thumbnail.
  - Descriptive alt tag on each image (resolving accessibility audit issue).
  - Hairline serif title, monospace summary, category badge, and date.
  - Hover state: reveal "Read More" hairline serif tag and subtle image zoom/brightness shift.
- [ ] **Step 3: Implement `<ResearchPage />`**
  - 3-column responsive grid (`max-w-[1440px] mx-auto px-6 py-24`).
  - Responsive collapse to 2 columns on tablet and 1 column on mobile.
- [ ] **Step 4: Verify card links and hover interactions**

---

### Task 10: Careers Portal (Join Page)

**Files:**
- Create: `src/pages/JoinPage.tsx`

**Interfaces:**
- Consumes: `<Navbar />`, `<Footer />`, `<Button />`, `<Badge />`.
- Produces: Careers portal view matching `https://tilderesearch.com/join`.

- [ ] **Step 1: Implement Two-Column Split Layout**
  - Left column:
    - Headline: "Join" in `Serrif VF`
    - Mission and backing copy (*Khosla Ventures, OpenAI and Anthropic researchers, Yufei Zhao*)
    - Interactive email link: `join@tilderesearch.com →`
  - Right column:
    - Stacked role cards:
      1. ML Engineer (FULL-TIME)
      2. ML Researcher (FULL-TIME)
      3. Hardware/Kernel Engineer (FULL-TIME)
      4. ML Engineer (INTERNSHIP)
      5. ML Researcher (INTERNSHIP)
      6. Hardware/Kernel Engineer (INTERNSHIP)
    - Each role card features title, tenure badge, and "Read more" pill button linking to Ashby.
- [ ] **Step 2: Responsive handling**
  Stack columns vertically on mobile and tablet.
- [ ] **Step 3: Verify link targets and hover states**

---

### Task 11: Route Assembly, App Orchestration & Focus Polish

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: All pages (`HomePage`, `AboutPage`, `ResearchPage`, `JoinPage`).
- Produces: Complete navigable application.

- [ ] **Step 1: Configure `react-router-dom` in `src/App.tsx`**
  Set up routes for `/`, `/about`, `/research`, and `/join` with scroll restoration.
- [ ] **Step 2: Implement accessible focus rings (`:focus-visible`)**
  Add subtle 1px dashed white focus outlines for keyboard navigation (fixing audit finding).
- [ ] **Step 3: Build verification**
  Run: `npm run build`
  Expected: Successful compilation without errors.

---

### Task 12: Visual & Responsive Verification with Puppeteer

**Files:**
- Verification only

- [ ] **Step 1: Start local dev server on port 3000**
- [ ] **Step 2: Run Puppeteer audits against local clone vs live site**
  Verify:
  - Homepage desktop (1440px) & mobile (375px)
  - About page desktop (1440px) & mobile (375px)
  - Research page desktop (1440px) & mobile (375px)
  - Join page desktop (1440px) & mobile (375px)
- [ ] **Step 3: Compare screenshots and verify zero regressions**
