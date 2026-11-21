import type { CaseStudyCategory } from "./caseStudies";

export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  category: CaseStudyCategory;
  date: string;
  link: string;
  image: string;
  video?: string;
}

export const researchItems: ResearchItem[] = [
  {
    id: "population-media-center",
    title: "Population Media Center: Stories That Sound Like Home",
    description:
      "The story of 25 years of Population Media Center's radio drama, and the brand, campaign and design work that carried it to the people it was made for.",
    category: "UNDERSTOOD",
    date: "8.3.26",
    link: "/work/population-media-center",
    image: "/population-media-center.png",
    video: "/population-media-center.mp4",
  },
  {
    id: "mathevia",
    title: "Mathevia: Maths Without the Dread",
    description:
      "An online maths platform and tutoring service for students who have learned to dread the subject. Visual lessons, simpler ideas and a tutor on their side.",
    category: "CAPABLE",
    date: "8.11.26",
    link: "/work/mathevia",
    image: "/work/mathevia/01_mathevia_desktop_hero.png",
    video: "/work/mathevia/mathevia_scene.mp4",
  },
  {
    id: "lorewa",
    title: "Lorewa: A Brand That Speaks Her Language",
    description:
      "Brand identity, strategy and a learning platform for Hausa women, built to teach in a voice that feels like their own.",
    category: "SEEN",
    date: "7.25.26",
    link: "/work/lorewa",
    image: "/work/lorewa/lorewa-hero.jpg",
    video: "/work/lorewa/lorewa-reel.mp4",
  },
  {
    id: "wrapa-gender-online-academy",
    title: "WRAPA Gender Online Academy: Learning With the Door Open",
    description:
      "An e-learning platform opening STEM, life skills and digital entrepreneurship to Nigerian girls and women, with no barriers at the door.",
    category: "WELCOME",
    date: "7.30.26",
    link: "/work/wrapa-gender-online-academy",
    image: "/work/wrapa/wrapa-hero.jpg",
    video: "/work/wrapa/wrapa.mp4",
  },
  {
    id: "juno-boutique-hotel",
    title: "Juno: A Hotel Website That Lets You Exhale",
    description:
      "Translating architectural calm into digital pacing: luxury suite showcases, Thai wellness menus, and responsive direct booking in Maitama.",
    category: "UNHURRIED",
    date: "9.7.26",
    link: "/work/juno-boutique-hotel",
    image: "/work/juno/juno-hero.webp",
  },
];

export const archivedWorkItems: ResearchItem[] = [];
