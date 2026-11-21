# Design: Portfolio Case Studies Dynamic Rollout

**Date:** 2026-11-21  
**Author:** Kristopher Shola / AI Assistant  
**Status:** In Review  
**Target Architecture:** Dynamic `/work/:slug` route driven by typed registry `src/data/caseStudies.ts`

---

## 1. Intent & The Why

Christopher Shola's portfolio (`christophershol.vercel.app`) showcases strategic and multidisciplinary design, narrative, and digital development work across Africa and globally. The existing live case study for Population Media Center (PMC) established a high-standard, editorial split-screen format.

The goal is to systematically implement the 9 pending project case studies identified in the rollout plan (`c:\Users\PC\Downloads\Portfolio case study rollout plan.md`) and Google Drive source materials:
1. **Mathevia** (`/work/mathevia`) — Maths learning platform and student experience.
2. **Lorewa** (`/work/lorewa`) — Hausa women's learning brand and visual identity.
3. **WRAPA Gender Online Academy** (`/work/wrapa-gender-online-academy`) — Barrier-free STEM & entrepreneurship e-learning.
4. **Juno Boutique Hotel** (`/work/juno-boutique-hotel`) — Digital hospitality, spatial pacing, and booking experience.
5. **ISMPH** (`/work/ismph`) — Health communication, policy advocacy campaigns, and media storytelling.
6. **Lavish Apartments** (`/work/lavish-apartments`) — Short-let hospitality and private cinema visual showcase.
7. **Event Flyers** (`/work/event-flyers`) — Information design and event communications stack.
8. **Enviovic** (`/work/enviovic`) — Corporate identity and brand collateral.
9. **3D Visuals** (`/work/3d-visuals`) — Spatial modeling and dimensional render exploration.

### Guiding Principles: "Competence" & "Precise Language"
- **Competence:** The work speaks with quiet authority. No exaggerated claims, no vanity metrics, and no design theatre. Every project makes clear what the problem was, Christopher's exact bounded role, why design/technical choices were made, and what resulted.
- **Precise Language:** Every sentence does verifiable work. Zero agency fluff or synthetic filler. Where verified audience impact figures exist (e.g., PMC's 1.5× dialogue rate), they are cited directly. Where projects are conceptual or in-flight, tangible process facts (deliverables shipped, screens structured, responsive breakpoints resolved) are reported with total transparency.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Single Data-Driven Dynamic Architecture:** Replace one-off monolithic page files with a centralized, strictly typed registry (`src/data/caseStudies.ts`) and dynamic router (`/work/:slug`).
- **Shared Split-Screen Component System:** Extract reusable components under `src/components/case-study/`:
  - `CaseStudyLayout`: Split shell matching PMC (`md:w-5/12` scrollable narrative left, `md:w-7/12` media panel right).
  - `MediaPanel`: Focal right panel supporting video reels, full-page scrollable mockups, mobile/desktop device frame toggles, or image stacks.
  - `VideoPlayer`: Accessible custom video player with play/pause, volume scrub, mute, and time indicators.
  - `Lightbox`: Keyboard-accessible modal preview (with `Escape` key capture, focus trap/return, ARIA attributes).
  - `ImageGrid`: Natural aspect-ratio responsive image gallery (on left column, matching PMC).
  - `StatGrid`: Typographic 2x2 impact metric figures with contextual labels.
  - `PaletteStrip`: Interactive or coded hex swatch strip for brand identity studies (Lorewa).
- **Phased Rollout:** Foundation first (Phase 0) + pilot case study (Mathevia), ensuring zero regressions on existing PMC page before migrating PMC into the unified registry.
- **Editorial Voice:** Write crisp, human, precise copy adhering to the user's standards across all studies.
- **Work Page Cohesion:** Promote newly published studies into the main `researchItems` feed on `WorkPage.tsx`, preserving internal routing and clean date formatting.

### Scope & Publishing Decisions
- **Active Publication:**
  - **Mathevia** (`/work/mathevia`)
  - **Lorewa** (`/work/lorewa`)
  - **WRAPA Gender Online Academy** (`/work/wrapa-gender-online-academy`)
  - **Juno Boutique Hotel** (`/work/juno-boutique-hotel`)
  - *(PMC unified into registry for visual parity)*
- **Draft Scaffolding (`published: false`):**
  - **3D Visuals** (`/work/3d-visuals`) — Withheld pending high-resolution originals.
  - **Enviovic** (`/work/enviovic`) — Withheld pending business context and contact masking.
  - **Event Flyers** (`/work/event-flyers`) — Withheld pending speaker permissions and program details.
  - *(ISMPH and Lavish staged for asset/consent verification)*
  - Any attempt to access unpublished routes will gracefully redirect to `/work`.

### Resolved Architectural & Ingestion Decisions (Builder Calls)
- **Asset Ingestion:** Directly ingesting files from Google Drive folder IDs into `public/work/<slug>/`, optimized via WebP/MP4 encoding.
- **MediaPanel Layout:** Retains PMC's editorial balance. The left column (`md:w-5/12`) contains the case narrative, pull quote, 4-photo image grid with lightbox, and 2x2 impact stat grid. The right column (`md:w-7/12`) houses the primary focal artifact (e.g. video player for WRAPA/ISMPH, scrollable mockup for Mathevia, or device toggle for Juno).
- **Video Architecture:** Native HTML5 `<video>` for all optimized assets under 5MB. Any oversized media is referenced by external CDN stream URL.
- **Copy Standards:** Bounded roles, exact deliverables, verified numbers, and transparent process facts—zero fabricated business claims.

### Non-Goals
- Inventing unsubstantiated business metrics (e.g. fictional revenue or engagement numbers).
- Redesigning the global site navigation, clock, or footer.
- Committing heavy uncompressed video files (>5MB) directly into git history.

### Anti-Goals
- Duplicating PMC's 388-line monolithic code 9 times.
- Breaking responsive behavior on mobile (375px) or ultra-wide desktop viewports.
- Leaving broken links or 404 routes for unreleased case studies (handled via `published: boolean` flags with safe fallbacks).

---

## 3. Architecture & User Experience

### 3.1 Data Schema (`src/data/caseStudies.ts`)

```typescript
export type CaseStudyCategory = 
  | "UNDERSTOOD" 
  | "CAPABLE" 
  | "WELCOME" 
  | "SEEN" 
  | "UNHURRIED" 
  | "HEARD" 
  | "INVITED" 
  | "READY" 
  | "TRUSTED" 
  | "TANGIBLE";

export type MediaPanelType = 
  | "video" 
  | "scrollable-page" 
  | "device-toggle" 
  | "carousel" 
  | "stack";

export interface CaseStudyMediaConfig {
  type: MediaPanelType;
  primaryMediaSrc?: string;
  posterSrc?: string;
  mobileSrc?: string;
  desktopSrc?: string;
  videoAriaLabel?: string;
  items?: Array<{ src: string; alt: string; caption?: string }>;
}

export interface CaseStudyStat {
  value: string;
  label: string;
  italicPrefix?: string;
}

export interface CaseStudyGalleryItem {
  src: string;
  alt: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: CaseStudyCategory;
  date: string; // ISO or normalized display date e.g. "8.11.2026"
  client: string;
  metaDescription: string;
  intro: string;
  disciplines: string[];
  challenge: string;
  quote?: string;
  approach: string;
  impactIntro?: string;
  stats?: CaseStudyStat[];
  gallery: CaseStudyGalleryItem[];
  palette?: string[]; // Hex color codes for identity studies
  media: CaseStudyMediaConfig;
  outboundLink?: {
    label: string;
    href: string;
  };
  published: boolean;
  isCompact?: boolean; // For thin studies (Enviovic, 3D)
}
```

### 3.2 Layout & Routing

1. **Routing in `src/App.tsx`:**
   ```tsx
   <Route path="/work/:slug" element={<CaseStudyPage />} />
   ```
   Maintains backward compatibility: `/work/population-media-center` either handled directly or routed through `CaseStudyPage` with visual parity.
2. **`CaseStudyPage.tsx`:**
   - Reads `useParams().slug`.
   - Looks up study in `caseStudiesRegistry`.
   - If not found or `!published`, redirects to `/work` (or displays clean 404 state).
   - Sets dynamic page metadata via `usePageMeta(study.title, study.metaDescription)`.
   - Renders `CaseStudyLayout`.

### 3.3 Media Panel Variants

- **Video:** Custom player with playsInline, loop, autoPlay (muted default), play/pause and mute/unmute overlay controls.
- **Scrollable Page / Mockup:** Contained high-fidelity landing page preview with internal scroll or hover scrub (used for Mathevia, Juno full-page captures).
- **Device Toggle:** Interactive toggle between Mobile and Desktop frames (used for Juno hotel screens).
- **Stack / Carousel:** Image reel with thumbnail progression and enlarged lightbox viewing.

---

## 4. Phased Implementation Breakdown

- **Phase 0: Foundation Architecture**
  - Create typed `src/data/caseStudies.ts`.
  - Build `src/components/case-study/` modular components (`CaseStudyLayout`, `MediaPanel`, `VideoPlayer`, `Lightbox`, `ImageGrid`, `StatGrid`, `PaletteStrip`).
  - Implement dynamic `src/pages/CaseStudyPage.tsx`.
  - Add `/work/:slug` route in `src/App.tsx`.
  - Verify zero regressions against existing pages.
- **Phase 1: Pilot Study — Mathevia**
  - Sourcing/optimizing Mathevia assets from `public/` and drive materials.
  - Writing precise, grounded copy: platform design, student lesson flow, UX reframing mathematics.
  - Implementing scrollable mockup/tablet hero media panel.
  - Setting `published: true` and verifying interactive parity.
- **Phase 2: Identity & Motion — Lorewa & WRAPA**
  - Lorewa: Brand identity sheet, Hausa cultural cues, coded color swatches, Instagram post carousel, reel integration.
  - WRAPA: E-learning platform accessibility, STEM inclusion, Wayback archive integration, social video clips.
- **Phase 3: Digital Hospitality & Advocacy — Juno & ISMPH**
  - Juno: Desktop/mobile toggle, room and spa pacing, Maitama boutique positioning.
  - ISMPH: Public health storytelling, policy advocacy campaigns, media strategy.
- **Phase 4: Remaining Studies & Work Page Integration**
  - Lavish Apartments, Event Flyers, Enviovic, and 3D Visuals.
  - Update `researchData.ts` to derive active cards from the unified registry.
  - Clean up leftover legacy template entries in `researchData.ts`.

---

## 5. What is Left to the Builder

- Exact layout styling and CSS utility classes (Tailwind CSS matching `#191817`, `#F3F3F4`, `#8E8F94`, and existing border styles `border-white/10`).
- Sharp / FFmpeg asset processing details and file placement in `public/work/<slug>/`.
- Fine-tuning animation timing (Framer Motion spring/ease curves matching site standards).
- Handling accessible keyboard traps and ARIA roles for the lightbox modal.
