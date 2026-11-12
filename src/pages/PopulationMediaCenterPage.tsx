import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowUpRight,
  ChevronLeft,
  Sparkles,
  BarChart3,
  Tv,
  PenTool,
  Layers,
} from "lucide-react";

interface CampaignItem {
  id: string;
  image: string;
  title: string;
  category: string;
  theme: string;
  quote?: string;
  description: string;
  aspect?: string;
}

const campaignArtworks: CampaignItem[] = [
  {
    id: "pmc-25-years",
    image: "/pmc/pmc-25-years.jpg",
    title: "25 Years of Transformative Impact",
    category: "Brand Strategy & Milestone",
    theme: "Retrospective",
    description:
      "Commemorating a quarter-century of pioneering entertainment-education. The visual identity integrates an illustrated portrait of the founding methodology with traditional African geometric borders and vibrant color planes, framing PMC's institutional authority and enduring grassroots trust.",
    aspect: "aspect-[1024/858]",
  },
  {
    id: "sinalamba-stat",
    image: "/pmc/sinalamba-stat.jpg",
    title: "Siñalamba: HIV Dialogue Impact",
    category: "PR & Media Strategy",
    theme: "Behavioral Metric",
    quote: "Siñalamba listeners were 1.5 times more likely than non-listeners to discuss HIV-risk with others, such as their partner, spouse, friend or relatives.",
    description:
      "Translating empirical sociological data into compelling public infographics. Evaluative field studies proved that PMC's hit radio drama Siñalamba broke deep cultural taboos, prompting a 1.5× surge in interpersonal HIV prevention dialogue across target rural communities.",
    aspect: "aspect-square",
  },
  {
    id: "mandela-day",
    image: "/pmc/mandela-day.jpg",
    title: "Nelson Mandela Day: Emancipation of Women",
    category: "Campaign Ideation",
    theme: "Gender Equity",
    quote: "“Freedom cannot be achieved unless women have been emancipated from all forms of oppression” — Nelson Mandela",
    description:
      "A campaign aligning global human rights milestones with PMC's ongoing gender equality mandates. Bold typography and organic brushwork center women's bodily autonomy and systemic emancipation as indispensable prerequisites for societal liberation.",
    aspect: "aspect-square",
  },
  {
    id: "doughnut-economics",
    image: "/pmc/doughnut-economics.jpg",
    title: "What Is Doughnut Economics?",
    category: "Graphic Design",
    theme: "Ecology & Economics",
    description:
      "Translating Kate Raworth's planetary boundary framework into an accessible, viral visual hook. The surreal Earth-doughnut metaphor communicates complex macroeconomic concepts—balancing ecological ceiling limits with essential social foundations—for mainstream digital audiences.",
    aspect: "aspect-square",
  },
  {
    id: "fgm-global-problem",
    image: "/pmc/fgm-global-problem.jpg",
    title: "Ending FGM: A Global Solidarity Crisis",
    category: "PR & Media Strategy",
    theme: "Human Rights (UNHCR Collaboration)",
    quote: "“FGM is a global problem”",
    description:
      "Developed in strategic alignment with UNHCR guidelines, this visual intervention dismantles the misconception that Female Genital Mutilation is an isolated regional practice. Hand-drawn global solidarity motifs elevate bodily integrity to an urgent international human rights priority.",
    aspect: "aspect-square",
  },
  {
    id: "mental-health-day",
    image: "/pmc/mental-health-day.jpg",
    title: "World Mental Health Day: It's Okay to Ask for Help",
    category: "Storytelling & Narrative Development",
    theme: "Mental Wellbeing",
    quote: "“It's okay to ask for help”",
    description:
      "Dismantling mental health stigma through visual empathy. A silhouette composed of interlocking puzzle pieces visualizes the quiet vulnerability of cognitive struggle, encouraging open dialogue in cultural contexts where psychological distress is frequently silenced.",
    aspect: "aspect-square",
  },
  {
    id: "vote-amplifies-voice",
    image: "/pmc/vote-amplifies-voice.jpg",
    title: "Civic Voice: Your Vote Amplifies Your Voice",
    category: "Campaign Ideation",
    theme: "Civic Mobilization",
    description:
      "A high-energy democratic participation campaign built for Nigerian youth. Vibrant pop-line iconography and energetic megaphone linework reframe electoral participation not as a passive civic chore, but as an active loudspeaker for community self-determination.",
    aspect: "aspect-square",
  },
  {
    id: "world-environment-day",
    image: "/pmc/world-environment-day.jpg",
    title: "World Environment Day: Community & Planet",
    category: "Graphic Design",
    theme: "Ecological Stewardship",
    description:
      "Putting a human face on ecological resilience. Centering portraits of Nigerian women, mothers, and children alongside robust condensed editorial typography to demonstrate that planetary health and community survival are inextricably linked.",
    aspect: "aspect-square",
  },
];

export const PopulationMediaCenterPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  // Video playback management
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden text-[#F3F3F4] select-none flex flex-col justify-between bg-[#191817]">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Split Layout: Fixed Left, Independently Scrolling Right on Desktop & Tablet */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row w-full md:h-full md:overflow-hidden">
        {/* Left Section: Static Overview, 5 Pillars & Impact Stats */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-5/12 xl:w-5/12 shrink-0 pt-20 sm:pt-24 md:pt-28 pb-8 md:pb-12 px-5 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-between pointer-events-auto md:overflow-y-auto md:h-full scrollbar-none"
        >
          <div className="space-y-8 max-w-xl">
            {/* Back to Work Link */}
            <div>
              <Link
                to="/work"
                className="group inline-flex items-center gap-1.5 font-mono text-[11.5px] uppercase tracking-wider text-[#8E8F94] hover:text-[#F3F3F4] transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Work</span>
              </Link>
            </div>

            {/* Header Badges & Title */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-[10px] tracking-widest text-[#F3F3F4]/70">
                  CASE STUDY // 2026
                </Badge>
                <Badge variant="default" className="text-[10px] tracking-widest bg-white/5 text-[#F3F3F4]/80">
                  ENTERTAINMENT-EDUCATION
                </Badge>
              </div>

              <h1 className="font-serif text-[30px] sm:text-[34px] lg:text-[38px] font-normal leading-[1.08] tracking-[-0.02em] text-[#F3F3F4]">
                Population Media Center
              </h1>

              <p className="font-sans text-[14px] sm:text-[15px] font-normal leading-[1.35] text-[#8E8F94]">
                25 Years of Transformative Entertainment-Education across Nigeria & Worldwide
              </p>
            </div>

            {/* Introduction: Who Population Media Center Are */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#F3F3F4]/60">
                <Sparkles className="w-3 h-3 text-[#F3F3F4]/40" />
                <span>Who They Are</span>
              </div>
              <div className="space-y-3 font-sans text-[13px] sm:text-[13.5px] font-light leading-[1.45] text-[#8E8F94]">
                <p>
                  <strong className="text-[#F3F3F4] font-medium">Population Media Center (PMC)</strong> is a global nonprofit leader that unleashes the power of mass-media entertainment to spark measurable, enduring behavioral and cultural change.
                </p>
                <p>
                  Rather than broadcasting didactic public service announcements, PMC uses the scientifically validated <strong className="text-[#F3F3F4] font-normal">Sabido methodology</strong> to produce long-running, character-driven radio dramas and televised narratives. Across 50+ nations, PMC storylines address deeply rooted challenges—women's rights, maternal health, FGM eradication, girls' schooling, HIV prevention, and ecological stewardship—by allowing listeners to evolve alongside nuanced characters.
                </p>
              </div>
            </div>

            {/* Areas Worked: The 5 Core Disciplines */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#F3F3F4]/60">
                <Layers className="w-3 h-3 text-[#F3F3F4]/40" />
                <span>Areas of Contribution</span>
              </div>

              <div className="space-y-3.5">
                {/* 1. Brand Strategy */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#F3F3F4]/40">01</span>
                    <h3 className="font-serif text-[15px] text-[#F3F3F4] font-normal">
                      Brand Strategy
                    </h3>
                  </div>
                  <p className="font-sans text-[12.5px] font-light leading-[1.4] text-[#8E8F94] pl-5">
                    Architected the 25th-anniversary retrospective narrative. Repositioned entertainment-education not merely as broadcast programming, but as a proven systemic engine for institutional trust and public health progress.
                  </p>
                </div>

                {/* 2. Campaign Ideation */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#F3F3F4]/40">02</span>
                    <h3 className="font-serif text-[15px] text-[#F3F3F4] font-normal">
                      Campaign Ideation
                    </h3>
                  </div>
                  <p className="font-sans text-[12.5px] font-light leading-[1.4] text-[#8E8F94] pl-5">
                    Conceived cross-cutting cultural interventions translating complex global mandates into resonant grassroots moments—including Nelson Mandela Day women's emancipation, Doughnut Economics, and youth civic voting drives.
                  </p>
                </div>

                {/* 3. Storytelling & Narrative Development */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#F3F3F4]/40">03</span>
                    <h3 className="font-serif text-[15px] text-[#F3F3F4] font-normal">
                      Storytelling & Narrative Development
                    </h3>
                  </div>
                  <p className="font-sans text-[12.5px] font-light leading-[1.4] text-[#8E8F94] pl-5">
                    Leveraged the Sabido entertainment-education model to shape empathetic story arcs. Characters embody realistic positive and transitional behaviors, allowing community listeners to navigate sensitive social taboos without alienating cultural traditions.
                  </p>
                </div>

                {/* 4. Graphic Design */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#F3F3F4]/40">04</span>
                    <h3 className="font-serif text-[15px] text-[#F3F3F4] font-normal">
                      Graphic Design
                    </h3>
                  </div>
                  <p className="font-sans text-[12.5px] font-light leading-[1.4] text-[#8E8F94] pl-5">
                    Established a high-contrast visual system uniting indigenous African border motifs with clean Swiss typography, bold conceptual metaphors (the Earth doughnut, puzzle-piece psyche), and striking community portraiture.
                  </p>
                </div>

                {/* 5. PR and Media Strategy */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#F3F3F4]/40">05</span>
                    <h3 className="font-serif text-[15px] text-[#F3F3F4] font-normal">
                      PR & Media Strategy
                    </h3>
                  </div>
                  <p className="font-sans text-[12.5px] font-light leading-[1.4] text-[#8E8F94] pl-5">
                    Coordinated multi-channel broadcast syndication, radio drama listenership campaigns (such as <em>Siñalamba</em>), and strategic institutional alignment with partners like UNHCR to amplify earned media and civic advocacy.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Statistics Bento Grid */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#F3F3F4]/60">
                <BarChart3 className="w-3 h-3 text-[#F3F3F4]/40" />
                <span>Verified Impact Metrics</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-[2px] bg-[#222120] border border-white/10 space-y-1">
                  <div className="font-serif text-[24px] sm:text-[26px] font-normal leading-none text-[#F3F3F4]">
                    1.5×
                  </div>
                  <div className="font-mono text-[10.5px] uppercase tracking-wider text-[#F3F3F4]/70">
                    HIV Dialogue Surge
                  </div>
                  <p className="font-sans text-[11px] font-light leading-[1.3] text-[#8E8F94]">
                    <em>Siñalamba</em> listeners were 1.5× more likely to discuss HIV risk with partners.
                  </p>
                </div>

                <div className="p-3.5 rounded-[2px] bg-[#222120] border border-white/10 space-y-1">
                  <div className="font-serif text-[24px] sm:text-[26px] font-normal leading-none text-[#F3F3F4]">
                    500M+
                  </div>
                  <div className="font-mono text-[10.5px] uppercase tracking-wider text-[#F3F3F4]/70">
                    Global Audience
                  </div>
                  <p className="font-sans text-[11px] font-light leading-[1.3] text-[#8E8F94]">
                    Individuals reached across award-winning serial dramas worldwide.
                  </p>
                </div>

                <div className="p-3.5 rounded-[2px] bg-[#222120] border border-white/10 space-y-1">
                  <div className="font-serif text-[24px] sm:text-[26px] font-normal leading-none text-[#F3F3F4]">
                    50+
                  </div>
                  <div className="font-mono text-[10.5px] uppercase tracking-wider text-[#F3F3F4]/70">
                    Countries Reached
                  </div>
                  <p className="font-sans text-[11px] font-light leading-[1.3] text-[#8E8F94]">
                    Nations with custom localized broadcast interventions.
                  </p>
                </div>

                <div className="p-3.5 rounded-[2px] bg-[#222120] border border-white/10 space-y-1">
                  <div className="font-serif text-[24px] sm:text-[26px] font-normal leading-none text-[#F3F3F4]">
                    25 Yrs
                  </div>
                  <div className="font-mono text-[10.5px] uppercase tracking-wider text-[#F3F3F4]/70">
                    Sustained Change
                  </div>
                  <p className="font-sans text-[11px] font-light leading-[1.3] text-[#8E8F94]">
                    Transforming social norms through ethical entertainment-education.
                  </p>
                </div>
              </div>
            </div>

            {/* Outbound Action Link & Navigation */}
            <div className="pt-4 pb-2 border-t border-white/10 flex items-center gap-4">
              <a
                href="https://www.populationmedia.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-[12px] text-[#F3F3F4] hover:text-white transition-colors"
              >
                <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white">
                  populationmedia.org
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <span className="text-white/20">/</span>

              <Link
                to="/work"
                className="font-mono text-[12px] text-[#8E8F94] hover:text-[#F3F3F4] transition-colors"
              >
                All Projects
              </Link>
            </div>
          </div>

          {/* Bottom Left Subtle Indicator */}
          <div className="hidden md:block pt-8 text-[11px] font-mono text-[#8E8F94]/50">
            KRISTOPHER SHOLA // POPULATION MEDIA CENTER CASE STUDY
          </div>
        </motion.section>

        {/* Right Section: Independently Scrollable Video Reel & Campaign Posters */}
        <section className="w-full md:w-7/12 xl:w-7/12 md:h-full md:overflow-y-auto pt-4 sm:pt-6 md:pt-28 pb-16 px-5 sm:px-6 md:px-8 lg:px-10 pointer-events-auto scrollbar-thin scrollbar-thumb-white/10 space-y-12">
          {/* Featured Documentary Reel Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#F3F3F4]/70">
                <Tv className="w-3.5 h-3.5 text-[#F3F3F4]/50" />
                <span>Featured Documentary Reel // 16:9 Video</span>
              </div>
              <Badge variant="outline" className="text-[10px] tracking-wider text-emerald-400/90 border-emerald-500/30">
                ACTIVE REEL
              </Badge>
            </div>

            {/* Video Container */}
            <div className="relative w-full aspect-video rounded-[2px] overflow-hidden border border-white/10 bg-[#222120] group">
              <video
                ref={videoRef}
                src="/population-media-center.mp4"
                playsInline
                loop
                muted={isMuted}
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Minimalist Top/Bottom Controls Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[11px] text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-[2px]">
                    PMC: Discovering Nigeria's Impact
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="pointer-events-auto p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white/90 transition-colors"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="pointer-events-auto p-2 rounded-full bg-white text-black hover:scale-105 transition-transform"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  {/* Scrubber Progress Bar */}
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Caption & Analytical Notes */}
            <div className="pt-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
              <span className="font-serif text-[15px] text-[#F3F3F4]">
                Population Media Centre: Discovering Nigeria's Impact
              </span>
              <span className="font-mono text-[11px] text-[#8E8F94]">
                25-Year Retrospective Reel // Broadcast Cut
              </span>
            </div>
          </motion.div>

          {/* Section Divider & Campaign Artwork Stream Heading */}
          <div className="pt-4 space-y-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#F3F3F4]/70">
              <PenTool className="w-3.5 h-3.5 text-[#F3F3F4]/50" />
              <span>Campaign Artifacts & Creative Direction</span>
            </div>
            <p className="font-sans text-[13px] font-light text-[#8E8F94]">
              High-resolution campaign posters, public health communications, and educational artifacts produced across brand strategy, storytelling, and graphic design.
            </p>
          </div>

          {/* Campaign Artworks Stream */}
          <div className="space-y-12">
            {campaignArtworks.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 group"
              >
                {/* Image Container */}
                <div className="relative w-full overflow-hidden rounded-[2px] border border-white/10 bg-[#222120]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                  />
                </div>

                {/* Artwork Metadata & Caption */}
                <div className="space-y-2 pt-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] tracking-wider text-[#F3F3F4]/70 font-mono">
                        {item.category}
                      </Badge>
                      <Badge variant="default" className="text-[10px] tracking-wider bg-white/5 text-[#8E8F94] font-mono">
                        {item.theme}
                      </Badge>
                    </div>

                    <span className="font-mono text-[11px] text-[#8E8F94]/50">
                      0{idx + 1} // 08
                    </span>
                  </div>

                  <h3 className="font-serif text-[19px] sm:text-[21px] font-normal tracking-[-0.01em] text-[#F3F3F4]">
                    {item.title}
                  </h3>

                  {item.quote && (
                    <blockquote className="border-l-2 border-white/20 pl-3 italic font-serif text-[13.5px] text-[#F3F3F4]/90">
                      {item.quote}
                    </blockquote>
                  )}

                  <p className="font-sans text-[13px] font-light leading-[1.45] text-[#8E8F94]">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Footer Inside the Right Scrollable Column */}
          <div className="pt-10 pb-6 border-t border-white/10">
            <Footer variant="static" className="p-0 justify-start sm:justify-end" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PopulationMediaCenterPage;
