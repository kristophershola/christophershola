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
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((item) => item.published);
}
