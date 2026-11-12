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
  Tv,
  X,
} from "lucide-react";

interface CampaignPhoto {
  id: string;
  image: string;
  title: string;
  label: string;
}

const campaignPhotos: CampaignPhoto[] = [
  {
    id: "stats",
    image: "/pmc/pmc-stats-card.jpg",
    title: "Empirical Clinic Attendance & Behavioral Shift Metrics",
    label: "Impact Metrics",
  },
  {
    id: "rights",
    image: "/pmc/pmc-human-rights-day.jpg",
    title: "International Human Rights Day // 25-Year Anniversary Campaign",
    label: "Human Rights Day",
  },
  {
    id: "patriotism",
    image: "/pmc/pmc-patriotism-okon.jpg",
    title: "Patriotism & Community Leadership Initiative // Ephraim Victor Okon",
    label: "Civic Outreach",
  },
  {
    id: "jangala",
    image: "/pmc/pmc-jangala-radio.jpg",
    title: "Jangala Radio Serial Drama // Live on Sparkling 92.3 FM Calabar",
    label: "Radio Drama",
  },
];

export const PopulationMediaCenterPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [activePhoto, setActivePhoto] = useState<CampaignPhoto | null>(null);

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
    if (!newMuted) {
      videoRef.current.volume = 1.0;
    }
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

      {/* Main Split Layout: Fixed Left, Static Right on Desktop */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row w-full md:h-full md:overflow-hidden">
        {/* Left Section: Agency-Style Case Narrative & Impact Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-5/12 xl:w-5/12 shrink-0 pt-20 sm:pt-24 md:pt-28 pb-8 md:pb-12 px-5 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-between pointer-events-auto md:overflow-y-auto md:h-full scrollbar-none"
        >
          <div className="space-y-6 sm:space-y-7 max-w-xl">
            {/* Back to Work Navigation */}
            <div>
              <Link
                to="/work"
                className="group inline-flex items-center gap-1.5 font-mono text-[11.5px] uppercase tracking-wider text-[#8E8F94] hover:text-[#F3F3F4] transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Work</span>
              </Link>
            </div>

            {/* Title & Introduction */}
            <div className="space-y-3">
              <h1 className="font-serif text-[30px] sm:text-[34px] lg:text-[38px] font-normal leading-[1.08] tracking-[-0.02em] text-[#F3F3F4]">
                Population Media Center
              </h1>

              <p className="font-sans text-[13.5px] sm:text-[14px] font-light leading-[1.45] text-[#8E8F94]">
                Population Media Center (PMC) has undertaken significant work in Nigeria, focusing on social and behavior change communication (SBCC). Through long-running serialized radio dramas, PMC addresses critical social issues—including reproductive health, family planning, and gender equality—specifically designed to engage and educate audiences across Nigeria, particularly in rural and hard-to-reach communities. By leveraging the power of culturally grounded storytelling, PMC drives positive shifts in attitudes and behaviors to foster healthier, more equitable societies.
              </p>
            </div>

            {/* Disciplines / Services (Anakle Header Style) */}
            <div className="pt-2 border-t border-white/10">
              <p className="font-sans text-[13px] font-medium text-[#F3F3F4]/90 tracking-[0.01em]">
                Brand Strategy, Campaign Ideation, Storytelling & Narrative Development, Graphic Design, PR & Media Strategy
              </p>
            </div>

            {/* The Core Challenge */}
            <div className="space-y-2 pt-2">
              <p className="font-sans text-[13px] sm:text-[13.5px] font-light leading-[1.45] text-[#8E8F94]">
                The core challenge was shifting entrenched cultural norms and taboos without triggering community resistance. In Nigeria, critical issues surrounding reproductive health, family planning, and gender equality are often met with institutional hesitation, social silence, or resistance. Traditional top-down public service announcements frequently encounter skepticism or defensiveness, especially across rural and hard-to-reach communities. The campaign needed to educate, engage, and shift mindsets organically from within the community fabric.
              </p>
            </div>

            {/* Editorial Pull Quote (H4 in Anakle) */}
            <div className="py-2">
              <h4 className="font-serif text-[17px] sm:text-[19px] font-normal italic leading-[1.3] text-[#F3F3F4]/95 border-l-2 border-white/30 pl-3.5">
                “Entertainment that mirrors reality, shifting social norms from within the community.”
              </h4>
            </div>

            {/* Strategic Approach */}
            <div className="space-y-2">
              <p className="font-sans text-[13px] sm:text-[13.5px] font-light leading-[1.45] text-[#8E8F94]">
                We built the campaign around serialized radio drama broadcasting and the scientifically validated Sabido methodology. By engineering multi-layered narrative arcs with relatable positive, negative, and transitional characters, the dramas allowed audiences across Nigeria to confront real-world health and moral dilemmas without feeling judged—prompting personal reflection, household dialogue, and measurable community adoption of healthier practices.
              </p>
            </div>

            {/* Campaign Artifacts & Field Photography Grid (2x2) */}
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#F3F3F4]/70">
                  Campaign Artifacts // Field Communications
                </span>
                <span className="font-mono text-[10px] text-[#8E8F94]/50">
                  04 Plates
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {campaignPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setActivePhoto(photo)}
                    className="group relative cursor-pointer overflow-hidden rounded-[2px] border border-white/10 bg-[#222120] transition-all hover:border-white/30"
                  >
                    <div className="aspect-square w-full overflow-hidden">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-left opacity-90 transition-opacity group-hover:opacity-100">
                      <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#F3F3F4]/90 block truncate">
                        {photo.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Bridge Statement & Stat Grid (Verbatim Anakle Format) */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <p className="font-sans text-[13px] font-normal text-[#F3F3F4]/90">
                These shifts translated into measurable improvements:
              </p>

              <div className="grid grid-cols-2 gap-3.5 pt-1">
                {/* Stat 1 */}
                <div className="space-y-1">
                  <div className="font-serif text-[26px] sm:text-[28px] font-normal leading-none text-[#F3F3F4]">
                    1.5×
                  </div>
                  <p className="font-sans text-[11.5px] font-light leading-[1.35] text-[#8E8F94]">
                    <em>Siñalamba</em> listeners were 1.5 times more likely than non-listeners to discuss HIV risk with their partner, spouse, or relatives.
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="space-y-1">
                  <div className="font-serif text-[26px] sm:text-[28px] font-normal leading-none text-[#F3F3F4]">
                    +500m
                  </div>
                  <p className="font-sans text-[11.5px] font-light leading-[1.35] text-[#8E8F94]">
                    Over 500 million people reached globally across serialized dramas, with Nigeria serving as a cornerstone for community-level behavior change.
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="space-y-1">
                  <div className="font-serif text-[26px] sm:text-[28px] font-normal leading-none text-[#F3F3F4]">
                    50+
                  </div>
                  <p className="font-sans text-[11.5px] font-light leading-[1.35] text-[#8E8F94]">
                    Countries with localized broadcast interventions, proving the model across distinct linguistic and cultural landscapes.
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="space-y-1">
                  <div className="font-serif text-[26px] sm:text-[28px] font-normal leading-none text-[#F3F3F4]">
                    25 Yrs
                  </div>
                  <p className="font-sans text-[11.5px] font-light leading-[1.35] text-[#8E8F94]">
                    A quarter-century of documented social and behavioral change, setting the benchmark for entertainment-education worldwide.
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

        {/* Right Section: Static Video Reel Only (Not Scrollable) */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-7/12 xl:w-7/12 shrink-0 pt-4 sm:pt-6 md:pt-28 pb-8 md:pb-12 px-5 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-between pointer-events-auto md:h-full md:overflow-hidden"
        >
          {/* Featured Video Container & Header */}
          <div className="space-y-4 my-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#F3F3F4]/70">
                <Tv className="w-3.5 h-3.5 text-[#F3F3F4]/50" />
                <span>Featured Documentary Reel // 16:9 Video</span>
              </div>
              <Badge variant="outline" className="text-[10px] tracking-wider text-emerald-400/90 border-emerald-500/30">
                ACTIVE REEL
              </Badge>
            </div>

            {/* 16:9 Video Player */}
            <div className="relative w-full aspect-video rounded-[2px] overflow-hidden border border-white/10 bg-[#222120] group shadow-2xl">
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
          </div>

          {/* Bottom Right Aligned Footer */}
          <div className="flex justify-end pt-4">
            <Footer variant="inline" />
          </div>
        </motion.section>
      </main>
      {/* Lightbox / Zoom Modal for Field Plates */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#191817] border border-white/15 rounded-[4px] p-3 sm:p-4 space-y-3 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#F3F3F4]/70">
                {activePhoto.label}
              </span>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="p-1 rounded text-[#8E8F94] hover:text-[#F3F3F4] transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full max-h-[65vh] flex items-center justify-center overflow-hidden rounded-[2px] bg-[#111]">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[65vh] w-auto object-contain rounded-[2px]"
              />
            </div>
            <p className="font-serif text-[13.5px] sm:text-[14px] text-[#F3F3F4]/90">
              {activePhoto.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopulationMediaCenterPage;
