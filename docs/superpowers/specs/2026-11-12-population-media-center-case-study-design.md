# Design: Population Media Center Case Study Page

**Date:** 2026-11-12  
**Author:** Kristopher Shola / AI Assistant  
**Status:** In Review  
**Target URL:** `/work/population-media-center`

---

## 1. Intent & Context

Population Media Center (PMC) is an international nonprofit leader in entertainment-education, utilizing the proven Sabido methodology to produce high-impact serial dramas, radio broadcasts, and multimedia campaigns that shift deeply entrenched cultural and behavioral norms across the globe.

This case study documents Kristopher Shola's multi-disciplinary creative and strategic contributions across **Brand Strategy**, **Campaign Ideation**, **Storytelling and Narrative Development**, **Graphic Design**, and **PR and Media Strategy**. 

The design is modeled directly on the split-screen architecture of **`tilderesearch.com/join`** (and the existing `InquiriesPage.tsx` in this portfolio):
- **Desktop:** The left column is completely static, providing the editorial manifesto, background on PMC, the 5 disciplines worked, and verified impact statistics. The right column is independently scrollable, containing the documentary video reel and the complete visual campaign archive.
- **Mobile/Tablet Portrait:** A responsive vertical cascade where the left context column introduces the project, immediately followed by the video player and high-resolution campaign assets.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- Deliver a dedicated case study route at `/work/population-media-center`.
- Implement a 1:1 split layout matching `tilderesearch.com/join` / `InquiriesPage.tsx` (`md:w-5/12` static left, `md:w-7/12` independently scrolling right).
- Ground the narrative in the core theme of **"Transformative"** social impact.
- Present all 5 required disciplines with specific, concrete deliverables:
  1. *Brand Strategy*
  2. *Campaign Ideation*
  3. *Storytelling and Narrative Development*
  4. *Graphic Design*
  5. *PR and Media Strategy*
- Prominently feature verified impact statistics (including the 1.5x *Siñalamba* HIV risk dialogue metric, 500M+ global audience, 50+ countries reached, 25 years of social behavioral change).
- Embed the documentary video reel (`/population-media-center.mp4`) with smooth, accessible playback controls.
- Showcase all 8 uploaded campaign artworks with contextual captions, dates, and thematic badges.
- Ensure seamless keyboard accessibility, clean Framer Motion entrance animations, and flawless navigation back to `/work`.

### Non-Goals
- Changing the global navigation or footer styles of the rest of the portfolio.
- Altering the archived status of other past case studies in `researchData.ts`.

### Anti-Goals
- Allowing the left column to scroll on desktop screens.
- Overcrowding the layout with generic multi-colored AI gradients that fight the portfolio's refined `#191817` / `#F3F3F4` editorial palette.
- Downplaying the impact metrics into generic body text rather than prominent typographic figures.

---

## 3. Architecture & User Experience

### 3.1 Split Screen Layout (`PopulationMediaCenterPage.tsx`)

```
+-----------------------------------------------------------------------------------+
| Navbar (Fixed, col-12 grid, Home / About / Work / Inquiries, Abuja NG, Lagos Time)|
+-----------------------------------------+-----------------------------------------+
| LEFT PANE (md:w-5/12, Static, No Scroll)| RIGHT PANE (md:w-7/12, Scrollable Y)     |
|                                         |                                         |
| [Badge: CASE STUDY // 2026]             | [FEATURED VIDEO CARD]                   |
| H1: Population Media Center             |  16:9 Video Player (mp4)                |
| Tagline: 25 Years of Transformative      |  Play/Pause, Mute/Unmute, Time Scrub    |
| Entertainment-Education                 |  Caption: Documentary & Global Broadcast|
|                                         |                                         |
| WHO POPULATION MEDIA CENTER ARE         | [CAMPAIGN ARTIFACT STREAM]              |
| - 25 years of global impact             |  Grid / Stack of 8 Campaign Posters:    |
| - Entertainment-education (Sabido)      |  1. 25 Years Celebration (Founder/Art)  |
| - Nigeria & global community change     |  2. Siñalamba Impact Metric (1.5x)      |
|                                         |  3. Nelson Mandela Day (Emancipation)   |
| 5 CORE DISCIPLINES WORKED               |  4. Doughnut Economics (Earth Graphic)  |
| 1. Brand Strategy                       |  5. Ending FGM (UNHCR Collaboration)    |
| 2. Campaign Ideation                    |  6. World Mental Health Day (Silhouette)|
| 3. Storytelling & Narrative Dev         |  7. Civic Voice (Your Vote Amplifies)   |
| 4. Graphic Design                       |  8. World Environment Day (Community)   |
| 5. PR & Media Strategy                  |                                         |
|                                         |                                         |
| IMPACT STATISTICS BENTO                 |                                         |
| - 1.5x Likelihood of HIV discussion     |                                         |
| - 500M+ Audience Reached                |                                         |
| - 50+ Countries Worldwide               |                                         |
|                                         |                                         |
| OUTBOUND LINKS & NAVIGATION             | [RIGHT FOOTER]                          |
| - populationmedia.org ->                |  Footer component aligned at scroll end |
| - Back to Work                          |                                         |
+-----------------------------------------+-----------------------------------------+
```

### 3.2 Detailed Content Specifications

#### Left Static Column:
1. **Metadata & Breadcrumbs:**
   - Pill badge: `CASE STUDY // 2026`
   - Outbound pill: `NONPROFIT & SOCIAL IMPACT`
2. **Title & Lead:**
   - Title: `Population Media Center` (in `font-serif`, 28px-34px)
   - Lead: *"Harnessing mass-media entertainment and the Sabido methodology to spark measurable, long-term human behavior change across Nigeria and 50+ countries."*
3. **Who Population Media Center Are:**
   - Editorial overview detailing PMC’s unique model: using full-scale popular culture—radio serial dramas, televised series, and localized digital narratives—to address entrenched challenges including women’s emancipation, reproductive rights, maternal health, FGM eradication, and civic participation without being preachy.
4. **Areas Worked (The 5 Pillars):**
   - **Brand Strategy:** Defining the narrative architecture for PMC’s 25th-anniversary positioning; framing entertainment-education not merely as media production, but as a proven engine for sustainable social transformation.
   - **Campaign Ideation:** Conceptualizing multi-channel seasonal and issue-driven initiatives—from voter mobilization ("Your Vote Amplifies Your Voice") to ecological boundaries ("Doughnut Economics") and destigmatizing mental health support.
   - **Storytelling and Narrative Development:** Collaborating on character progression arcs and community conflict scripts modeled after the Sabido methodology, allowing audiences to learn through negative, transitional, and positive role models.
   - **Graphic Design:** Crafting visual systems, typographic layouts, and striking cultural metaphors (the puzzle-piece mind for mental health, the planetary cradle against FGM, bespoke Afrocentric geometric borders).
   - **PR and Media Strategy:** Architecting dissemination strategies across radio networks, digital syndication, and international advocacy touchpoints in partnership with entities like UNHCR.
5. **Verified Impact Statistics:**
   - **`1.5x`**: *Siñalamba* listeners were 1.5 times more likely than non-listeners to openly discuss HIV risk with partners, spouses, and community members.
   - **`500M+`**: Cumulative audience reached across more than 50 countries worldwide.
   - **`25 Years`**: Sustained track record of scientifically evaluated, entertainment-driven behavioral transformation.
   - **`50+`**: International broadcast markets mobilized.
6. **Action & External Links:**
   - Outbound link to PMC official site: `populationmedia.org →`
   - Internal backlink to `/work`: `← Back to all work`

#### Right Scrollable Column:
1. **Documentary Video Player:**
   - Source: `/population-media-center.mp4`
   - Aspect ratio 16:9, rounded border with subtle hairline outline (`border-white/10`).
   - Integrated custom video controls: play/pause toggle, mute/unmute toggle, time scrubber, and full-screen button.
   - Caption detailing the broadcast scale and documentary storytelling.
2. **Campaign Artifacts Gallery:**
   Each poster card presented with high-definition rendering, title, year, category pill, and brief contextual caption:
   - `pmc-25-years.jpg`: *25 Years of Transformative Storytelling* — Sabido methodology pioneer tribute with geometric African patterns.
   - `sinalamba-stat.jpg`: *Siñalamba Behavioral Impact* — Quantified 1.5x increase in critical HIV risk dialogues.
   - `mandela-day.jpg`: *Nelson Mandela Day Campaign* — Emancipation of women as the cornerstone of human freedom.
   - `doughnut-economics.jpg`: *What Is Doughnut Economics?* — Visual metaphor communicating planetary boundaries and social foundations.
   - `fgm-global-problem.jpg`: *Ending Female Genital Mutilation* — Global human rights advocacy in partnership with UNHCR.
   - `mental-health-day.jpg`: *World Mental Health Day* — Destigmatizing emotional vulnerability: "It's okay to ask for help."
   - `vote-amplifies-voice.jpg`: *Civic Participation Campaign* — Youth and grassroots electoral empowerment: "Your Vote Amplifies Your Voice."
   - `world-environment-day.jpg`: *World Environment Day* — Intersectional community, climate, and maternal well-being.
3. **Column Footer:**
   - Embedded `Footer.tsx` cleanly terminating the scrollable feed.

---

## 4. Technical Specifications & File Changes

1. **`src/pages/PopulationMediaCenterPage.tsx`**:
   - New page component implementing the split-screen view.
   - Uses `Navbar` (fixed header).
   - Left side: static flex container with overflow-hidden on desktop (`md:h-[calc(100vh-80px)]` or structured container matching `InquiriesPage`).
   - Right side: independently scrollable container with customized scrollbar styling (`overflow-y-auto`).
   - Mobile: gracefully cascades into a natural single-column scroll.

2. **`src/App.tsx`**:
   - Register route `<Route path="/work/population-media-center" element={<PopulationMediaCenterPage />} />`.

3. **`src/data/researchData.ts`**:
   - Update `researchItems[0].link` to point to `/work/population-media-center`.

4. **`src/components/ResearchCard.tsx`**:
   - Update link handling: if `item.link.startsWith("/")`, render React Router `<Link to={item.link}>` instead of `<a href={item.link} target="_blank">`.

5. **Assets**:
   - Video at `public/population-media-center.mp4`
   - Images in `public/pmc/` (8 optimized JPEG files).

---

## 5. Constraints & Quality Criteria

- **Aesthetic Alignment:** Match the existing typography (`Serrif` for headings, `Another Sans` for body, `Flexa Mono` / `Geist Mono` for metadata) and color values (`#191817` void background, `#F3F3F4` primary text, `#8E8F94` muted text).
- **No Layout Regressions:** `HomePage`, `AboutPage`, `WorkPage`, and `InquiriesPage` remain completely intact.
- **Strict Verification:** Build pass via `npm run build` (`tsc -b && vite build`) and lint pass via `npx oxlint`.

---

## 6. What's Left to the Implementer

- Micro-interactions: Framer motion subtle staggered reveal of cards on the right side as they enter view.
- Video control styling: Custom minimalist play/pause/mute overlay controls that seamlessly blend with the `#191817` theme.
- Responsive breakpoint tuning: Ensuring that on smaller laptops (e.g., 1024x768 or 1280x800) the left column doesn't clip important text, allowing internal scrolling if screen height is constrained.