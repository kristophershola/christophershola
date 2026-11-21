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
  date: string;
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
  palette?: string[];
  media: CaseStudyMediaConfig;
  outboundLink?: {
    label: string;
    href: string;
  };
  published: boolean;
  isCompact?: boolean;
}

export const caseStudies: CaseStudy[] = [
  // 1. Population Media Center (Live Benchmark)
  {
    slug: "population-media-center",
    title: "Population Media Center",
    category: "UNDERSTOOD",
    date: "8.3.26",
    client: "Population Media Center",
    metaDescription:
      "How I helped carry Population Media Center's radio dramas to the people they were made for: brand, campaign, design and media. A case study.",
    intro:
      "Population Media Center (PMC) makes radio dramas that get people talking about the things they have gone quiet on. My job was to help those stories travel further: the brand, the campaign ideas, the visuals and the media that put the dramas in front of the right people and made them feel like their own.",
    disciplines: [
      "Brand Strategy",
      "Campaign Ideation",
      "Storytelling & Narrative Development",
      "Graphic Design",
      "PR & Media Strategy",
    ],
    challenge:
      "The brief sounded simple and was not: how do you say something to people who have already decided not to hear it? A message that arrives as instruction gets defended against. The work had to feel like it came from inside the room, not from outside it.",
    quote: "Nobody argues with a story that sounds like their own life.",
    approach:
      "So I built the communications around the dramas, not on top of them. I shaped the narrative and campaign ideas around characters people already recognize: the one doing the right thing, the one doing the wrong thing, and the one still deciding. Then I designed the visuals and planned the media to keep that voice the same wherever someone met it, from a radio schedule to a social card to a press line.",
    impactIntro:
      "The stories did the changing. My job was getting people to hear them. Here is what happened.",
    stats: [
      {
        value: "1.5×",
        label:
          "listeners were 1.5 times more likely than non-listeners to open up a hard health conversation with a partner, spouse or relative.",
        italicPrefix: "Siñalamba",
      },
      {
        value: "+500m",
        label:
          "Over 500 million people reached by PMC dramas around the world. Nigeria is a cornerstone of that reach.",
      },
      {
        value: "50+",
        label:
          "Countries with dramas made locally, each in its own language and culture.",
      },
      {
        value: "25 Yrs",
        label:
          "A quarter century of documented change in how people think, talk and act.",
      },
    ],
    gallery: [
      {
        src: "/pmc/pmc-stats-card.jpg",
        alt: "Four impact figures from Population Media Center campaigns, including 41% of new clinic visitors in Nigeria citing the Jolokoto drama as their reason for coming in",
      },
      {
        src: "/pmc/pmc-human-rights-day.jpg",
        alt: "International Human Rights Day graphic with raised hands, from Population Media Center's 25th anniversary year",
      },
      {
        src: "/pmc/pmc-patriotism-okon.jpg",
        alt: "Book cover for Patriotism by Ephraim Victor Okon, shared by Population Media Center",
      },
      {
        src: "/pmc/pmc-jangala-radio.jpg",
        alt: "Poster for Jangala, a radio serial drama on Sparkling 92.3 FM in Calabar, Cross River State",
      },
    ],
    media: {
      type: "video",
      primaryMediaSrc: "/population-media-center.mp4",
      videoAriaLabel:
        "Documentary on 25 years of Population Media Center radio drama in Nigeria",
    },
    outboundLink: {
      label: "populationmedia.org",
      href: "https://www.populationmedia.org",
    },
    published: true,
  },

  // 2. Mathevia (Active Publication)
  {
    slug: "mathevia",
    title: "Mathevia: Maths Without the Dread",
    category: "CAPABLE",
    date: "8.11.2026",
    client: "Mathevia UK",
    metaDescription:
      "Visual learning architecture and digital product experience for students who dread mathematics. A case study by Christopher Shola.",
    intro:
      "Mathevia is an online mathematics platform and 1-on-1 tutoring service built for secondary students who have learned to dread the subject. My role was designing the complete responsive web platform—restructuring dense curriculum topics into visual, step-by-step modular lessons and creating a supportive interface that builds student confidence before testing it.",
    disciplines: [
      "Product Design",
      "Information Architecture",
      "UX/UI Design",
      "Design Systems",
      "Curriculum Structuring",
    ],
    challenge:
      "Mathematics anxiety is an emotional blocker before it is an academic one. Most learning interfaces amplify intimidation by front-loading formulas, rigid timers, and red-pen failure states. The challenge was designing a learning environment that lowers cortisol and makes problem-solving feel intuitive and paced.",
    quote: "Students don't hate math; they hate feeling cornered by it.",
    approach:
      "I designed a student-centered interface that deconstructs abstract formulas into interactive visual steps. Lessons are structured around low-stakes diagnostic checks rather than punitive tests, accompanied by clear monthly progress reports for parents and tutors. The design system uses clear typographic hierarchy, calm neutral tones with warm accents, and responsive layouts calibrated for desktop workstations and tablet study.",
    impactIntro:
      "The platform reframed mathematics from an obstacle into a structured habit. Key deliverable milestones include:",
    stats: [
      {
        value: "11",
        label:
          "Production screens designed and specified across desktop, tablet, and mobile breakpoints.",
      },
      {
        value: "3",
        label:
          "Core feature systems delivered: interactive lesson modules, diagnostic progress tracking, and parent reports.",
      },
      {
        value: "100%",
        label:
          "Component coverage across typography, buttons, lesson cards, and pricing tiers in the design system.",
      },
      {
        value: "Tablet-First",
        label:
          "Calibrated specifically for split-screen tablet multitasking and desktop study environments.",
      },
    ],
    gallery: [
      {
        src: "/work/mathevia/01_mathevia_desktop_hero.png",
        alt: "Mathevia desktop landing hero with headline: Our students aren't good at math; they're great at it",
      },
      {
        src: "/work/mathevia/02_mathevia_feature_learning_platform.png",
        alt: "Mathevia interactive learning platform feature screen with step-by-step lesson breakdown",
      },
      {
        src: "/work/mathevia/03_mathevia_feature_student_centred.png",
        alt: "Mathevia student-centered interface showcasing visual explanations and supportive feedback",
      },
      {
        src: "/work/mathevia/04_mathevia_feature_monthly_reports.png",
        alt: "Mathevia monthly report dashboard illustrating student mastery and growth metrics",
      },
    ],
    media: {
      type: "scrollable-page",
      primaryMediaSrc: "/work/mathevia/07_mathevia_full_landing_page.png",
      videoAriaLabel: "Complete Mathevia landing page and platform overview",
    },
    outboundLink: {
      label: "mathevia.co.uk",
      href: "https://mathevia.co.uk",
    },
    published: true,
  },

  // 3. Lorewa (Active Publication)
  {
    slug: "lorewa",
    title: "Lorewa: A Brand That Speaks Her Language",
    category: "SEEN",
    date: "7.25.26",
    client: "Lorewa Women's Learning Initiative",
    metaDescription:
      "Brand identity, typography, and cultural voice for a Hausa women's educational initiative. A case study by Christopher Shola.",
    intro:
      "Lorewa is an educational initiative and digital community created to provide northern Nigerian Hausa women with practical vocational skills, financial literacy, and entrepreneurship training in their own language. I developed the comprehensive visual identity, brand strategy, typography system, and initial editorial campaign assets.",
    disciplines: [
      "Brand Strategy",
      "Visual Identity",
      "Typography Design",
      "Art Direction",
      "Content Strategy",
    ],
    challenge:
      "Mainstream educational branding in Nigeria defaults to formal colonial English and corporate styling that feels distant and exclusionary to women in northern communities. The brand needed to express warmth, cultural pride, and intellectual dignity without looking like an NGO pamphlet or an academic lecture.",
    quote:
      "Representation is not just wearing the attire; it is designing with the language, cadence, and dignity of the women you serve.",
    approach:
      "I crafted a bilingual typographic identity anchored in Fraunces Bold and Nunito Sans, with a custom wordmark that subtly integrates a woman wearing a traditional turban inside the letterform. The color system pairs deep berry and warm terracotta with energetic lime and soft rose. I then established layout templates for social masterclasses, vocational guides, and community discussions that preserve high editorial beauty across low-bandwidth mobile feeds.",
    palette: ["#561C24", "#6D2932", "#E8D8C8", "#9BB068", "#C75D68"],
    impactIntro:
      "The identity established an instantly recognizable visual home for northern women learners. Concrete design deliverables:",
    stats: [
      {
        value: "5-Tone",
        label:
          "Calibrated color system balancing northern cultural warmth with modern editorial clarity.",
      },
      {
        value: "Bilingual",
        label:
          "Dual-language hierarchy built to render seamlessly in both Hausa and English without awkward breaks.",
      },
      {
        value: "Identity",
        label:
          "Complete brand book delivered including logo marks, clearspace rules, and typography pairings.",
      },
      {
        value: "Omnichannel",
        label:
          "Social templates, masterclass slide decks, and community announcement standards.",
      },
    ],
    gallery: [
      {
        src: "/work/lorewa/post-01.jpg",
        alt: "Lorewa vocational education social campaign graphic in Hausa",
      },
      {
        src: "/work/lorewa/post-02.jpg",
        alt: "Lorewa community learning announcement graphic with custom typography",
      },
      {
        src: "/work/lorewa/post-03.jpg",
        alt: "Lorewa empowerment and entrepreneurship quote card",
      },
      {
        src: "/work/lorewa/lorewa-hero.jpg",
        alt: "Lorewa brand identity hero featuring wordmark and Hausa cultural styling",
      },
    ],
    media: {
      type: "video",
      primaryMediaSrc: "/work/lorewa/lorewa-reel.mp4",
      videoAriaLabel: "Brand motion reel and identity showcase for Lorewa",
    },
    outboundLink: {
      label: "instagram.com/thelorewa",
      href: "https://www.instagram.com/thelorewa",
    },
    published: true,
  },

  // 4. WRAPA Gender Online Academy (Active Publication)
  {
    slug: "wrapa-gender-online-academy",
    title: "WRAPA Gender Online Academy: Learning With the Door Open",
    category: "WELCOME",
    date: "7.30.26",
    client: "Women's Rights Advancement and Protection Alternative",
    metaDescription:
      "Digital learning platform communications, social campaigns, and inclusive access strategy for Nigerian women. A case study by Christopher Shola.",
    intro:
      "The Women's Rights Advancement and Protection Alternative (WRAPA) launched the Gender Online Academy to democratize access to digital entrepreneurship, human rights awareness, and STEM education for Nigerian women and girls. I led communications design, digital campaign collateral, motion content, and outreach strategy to introduce the platform across diverse states.",
    disciplines: [
      "Digital Campaign Strategy",
      "Art Direction",
      "Motion Design",
      "Social Content",
      "Public Interest Comms",
    ],
    challenge:
      "E-learning initiatives often face severe drop-off when audiences perceive them as technically demanding, expensive, or culturally disconnected from daily responsibilities. The outreach had to make e-learning feel immediate, free, and accessible on basic mobile devices without demanding high technical literacy.",
    quote:
      "Opening a digital door requires convincing people that the room inside was built with them in mind.",
    approach:
      "I developed an approachable, high-clarity visual communication system using authentic community photography, relatable case scenarios, and concise educational quote cards. I animated social reels illustrating how micro-lessons could be taken on mobile phones during daily transit or downtime, demystifying the registration process and emphasizing zero tuition barriers.",
    impactIntro:
      "The campaign drove broad community registration across multiple northern and north-central states. Key campaign facts:",
    stats: [
      {
        value: "0-Cost",
        label:
          "Positioned prominently as free public interest training to eliminate hesitation at registration.",
      },
      {
        value: "Mobile",
        label:
          "All creative assets optimized specifically for low-bandwidth mobile networks and WhatsApp sharing.",
      },
      {
        value: "Multi-Topic",
        label:
          "Campaigns spanned fundamental human rights, financial literacy, and vocational computing.",
      },
      {
        value: "Archive",
        label:
          "Preserved in the digital public record as a landmark gender-inclusion initiative.",
      },
    ],
    gallery: [
      {
        src: "/work/wrapa/wrapa-hero.jpg",
        alt: "WRAPA Gender Online Academy launch banner featuring smiling Nigerian female learner",
      },
      {
        src: "/work/wrapa/wrapa-post-01.webp",
        alt: "WRAPA Gender Online Academy campaign graphic highlighting inclusive digital classrooms",
      },
      {
        src: "/work/wrapa/wrapa-post-02.webp",
        alt: "WRAPA social poster emphasizing free registration and life skills modules",
      },
      {
        src: "/work/wrapa/wrapa-post-03.webp",
        alt: "WRAPA community post encouraging girls to pursue STEM careers",
      },
    ],
    media: {
      type: "video",
      primaryMediaSrc: "/work/wrapa/wrapa.mp4",
      videoAriaLabel:
        "WRAPA Gender Online Academy motion campaign and platform introduction",
    },
    outboundLink: {
      label: "Platform Archive (Wayback Machine)",
      href: "https://web.archive.org/web/20230505001522/https://www.wrapagenderonlineacademy.com/",
    },
    published: true,
  },

  // 5. Juno Boutique Hotel (Active Publication)
  {
    slug: "juno-boutique-hotel",
    title: "Juno: A Hotel Website That Lets You Exhale",
    category: "UNHURRIED",
    date: "9.7.26",
    client: "Juno Boutique Hotel, Maitama",
    metaDescription:
      "Digital hospitality design, spatial pacing, and responsive suite booking experience for a luxury boutique hotel in Abuja. A case study by Christopher Shola.",
    intro:
      "Juno is an intimate boutique hotel, fine dining destination, and Thai wellness spa located on Sangha Street in Maitama, Abuja. I designed the complete digital experience—from the visual art direction and spatial photography direction to the interactive suite showcases, spa menus, and responsive direct booking flow.",
    disciplines: [
      "Hospitality Web Design",
      "Art Direction",
      "UX Architecture",
      "Typography Systems",
      "Interaction Design",
    ],
    challenge:
      "Luxury hotel websites in West Africa frequently suffer from cluttered promotional popups, chaotic color palettes, and aggressive booking widgets that contradict the feeling of physical calm guests are paying for. The digital interface needed to deliver an immediate sense of quiet, spacious breathing room before guests even set foot in Maitama.",
    quote: "Hospitality design begins when the website lets you exhale.",
    approach:
      "I designed an editorial layout defined by generous negative space, refined serif typography, and tactile photography highlighting Juno's five suite tiers, Thai wellness treatments, and Sai dining. The navigation stays whisper-quiet while keeping the direct reservation CTA accessible. I built dedicated desktop and mobile viewports that preserve rich imagery without slowing down mobile booking performance.",
    impactIntro:
      "The digital experience translated architectural tranquility into digital ease. Key deliverables produced:",
    stats: [
      {
        value: "5 Suites",
        label:
          "Tailored showcase screens designed for Standard, Deluxe, Executive, Executive Suite, and The Juno Suite.",
      },
      {
        value: "3 Spa Tiers",
        label:
          "Structured wellness menus covering Anti-Stress, Body & Soul, and Royal Thai packages.",
      },
      {
        value: "Dual View",
        label:
          "Complete dedicated desktop and mobile interface viewports engineered for frictionless booking.",
      },
      {
        value: "Maitama",
        label:
          "Positioned as Abuja's sanctuary for unhurried luxury and genuine physical restoration.",
      },
    ],
    gallery: [
      {
        src: "/work/juno/juno-hero.webp",
        alt: "Juno boutique hotel tranquil room interior and soft linen styling",
      },
      {
        src: "/work/juno/juno-suite.webp",
        alt: "The Juno Executive Suite showcasing warm timber architectural finishes",
      },
      {
        src: "/work/juno/juno-wellness.webp",
        alt: "Juno Thai wellness spa treatment room and aromatherapy atmosphere",
      },
      {
        src: "/work/juno/juno-dining.webp",
        alt: "Sai fine dining table setting with contemporary culinary presentation",
      },
    ],
    media: {
      type: "device-toggle",
      desktopSrc: "/work/juno/juno-desktop-screen.png",
      mobileSrc: "/work/juno/juno-mobile-screen.png",
      videoAriaLabel:
        "Interactive desktop and mobile viewports for Juno Boutique Hotel",
    },
    outboundLink: {
      label: "4 Sangha Street, Maitama, Abuja",
      href: "https://www.google.com/maps/search/?api=1&query=Juno+Hotel+Maitama+Abuja",
    },
    published: true,
  },

  // 6. ISMPH (Staged Draft)
  {
    slug: "ismph",
    title: "ISMPH: Telling Health Stories Right",
    category: "HEARD",
    date: "10.15.26",
    client: "International Society of Media in Public Health",
    metaDescription:
      "In-house communications for a health-and-media NGO: website redesign, campaigns, and motion storytelling.",
    intro:
      "Communications design and media strategy for the International Society of Media in Public Health (ISMPH), amplifying grassroots health narratives into high-level policy action.",
    disciplines: [
      "Health Communications",
      "Campaign Design",
      "Motion Graphics",
      "Media Strategy",
    ],
    challenge:
      "Translating complex public health surveillance data into urgent human stories that mobilize government legislators and community elders alike.",
    approach:
      "Structured health media storytelling across broadcast interviews, event quote cards, and social awareness campaigns.",
    gallery: [],
    media: {
      type: "video",
    },
    published: false,
  },

  // 7. Lavish Apartments (Staged Draft)
  {
    slug: "lavish-apartments",
    title: "Lavish Apartments: Showing the Stay Before the Booking",
    category: "INVITED",
    date: "10.22.26",
    client: "Lavish Apartments & Cinema",
    metaDescription:
      "Video-first content and digital showcases for a short-let and private cinema business in Gwarimpa.",
    intro:
      "Video-first digital content and spatial storytelling for an upscale short-let and private cinema retreat in Gwarimpa, Abuja.",
    disciplines: [
      "Visual Direction",
      "Short-Form Video Production",
      "Hospitality Content",
    ],
    challenge:
      "Communicating the atmosphere and privacy of boutique short-lets before guests make a financial commitment.",
    approach:
      "High-definition walkthroughs, cinematic lighting, and clear booking transparency.",
    gallery: [],
    media: {
      type: "video",
    },
    published: false,
  },

  // 8. Event Flyers (Staged Draft — Withheld Per Approval)
  {
    slug: "event-flyers",
    title: "Event Flyers: Programmes People Actually Read",
    category: "READY",
    date: "9.20.26",
    client: "Selected Clients",
    metaDescription:
      "Information design and typography systems for high-profile summits, forums, and institutional programmes.",
    intro:
      "Information design for event programmes, led by the Fusion Digital Marketing Summit in Lagos.",
    disciplines: ["Print Design", "Typography", "Editorial Layout"],
    challenge:
      "Organizing dense speaker lineups, complex schedules, and sponsor tiers without visual friction.",
    approach:
      "Strict typographic hierarchy and bold Swiss grids that make itineraries immediately scannable.",
    gallery: [],
    media: {
      type: "stack",
    },
    published: false,
    isCompact: true,
  },

  // 9. Enviovic (Staged Draft — Withheld Per Approval)
  {
    slug: "enviovic",
    title: "Enviovic: Corporate Brand & Stationery",
    category: "TRUSTED",
    date: "8.18.26",
    client: "Enviovic",
    metaDescription: "Corporate stationery and compact identity design.",
    intro:
      "Compact corporate stationery and visual identity system for Enviovic.",
    disciplines: ["Brand Identity", "Stationery Design"],
    challenge:
      "Establishing corporate authority and clean visual balance across physical business collateral.",
    approach:
      "Restrained typography, subtle tactile finishes, and masked confidential data points.",
    gallery: [],
    media: {
      type: "stack",
    },
    published: false,
    isCompact: true,
  },

  // 10. 3D Visuals (Staged Draft — Withheld Per Approval)
  {
    slug: "3d-visuals",
    title: "3D Visuals: Spatial Studies",
    category: "TANGIBLE",
    date: "7.14.26",
    client: "Studio Practice",
    metaDescription:
      "Spatial exploration, lighting, and dimensional form rendering.",
    intro:
      "Exploratory dimensional renderings studying physical materials, ambient occlusion, and lighting contrast.",
    disciplines: ["3D Rendering", "Material Design", "Spatial Modeling"],
    challenge:
      "Balancing render fidelity with minimal load weight across digital devices.",
    approach: "Refined clay renders, studio lighting, and tactile texture maps.",
    gallery: [],
    media: {
      type: "stack",
    },
    published: false,
    isCompact: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((item) => item.published);
}
