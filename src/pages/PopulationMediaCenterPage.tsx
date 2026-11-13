import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import usePageMeta from "@/lib/usePageMeta";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowUpRight,
  ChevronLeft,
  X,
} from "lucide-react";

const campaignPhotos: string[] = [
  "/pmc/pmc-stats-card.jpg",
  "/pmc/pmc-human-rights-day.jpg",
  "/pmc/pmc-patriotism-okon.jpg",
  "/pmc/pmc-jangala-radio.jpg",
];

const campaignAlts: string[] = [
  "Four impact figures from Population Media Center campaigns, including 41% of new clinic visitors in Nigeria citing the Jolokoto drama as their reason for coming in",
  "International Human Rights Day graphic with raised hands, from Population Media Center's 25th anniversary year",
  "Book cover for Patriotism by Ephraim Victor Okon, shared by Population Media Center",
  "Poster for Jangala, a radio serial drama on Sparkling 92.3 FM in Calabar, Cross River State",
];

export const PopulationMediaCenterPage: React.FC = () => {
  usePageMeta(
    "Population Media Center Case Study | Christopher Shola",
    "How I helped carry Population Media Center's radio dramas to the people they were made for: brand, campaign, design and media. A case study."
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

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
                Population Media Center (PMC) makes radio dramas that get people talking about the things they have gone quiet on. My job was to help those stories travel further: the brand, the campaign ideas, the visuals and the media that put the dramas in front of the right people and made them feel like their own.</p>
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
                The brief sounded simple and was not: how do you say something to people who have already decided not to hear it? A message that arrives as instruction gets defended against. The work had to feel like it came from inside the room, not from outside it.</p>
            </div>

            {/* Editorial Pull Quote (H4 in Anakle) */}
            <div className="py-2">
              <h4 className="font-serif text-[17px] sm:text-[19px] font-normal italic leading-[1.3] text-[#F3F3F4]/95 border-l-2 border-white/30 pl-3.5">
                Nobody argues with a story that sounds like their own life.
              </h4>
            </div>

            {/* Strategic Approach */}
            <div className="space-y-2">
              <p className="font-sans text-[13px] sm:text-[13.5px] font-light leading-[1.45] text-[#8E8F94]">
                So I built the communications around the dramas, not on top of them. I shaped the narrative and campaign ideas around characters people already recognize: the one doing the right thing, the one doing the wrong thing, and the one still deciding. Then I designed the visuals and planned the media to keep that voice the same wherever someone met it, from a radio schedule to a social card to a press line.</p>
            </div>

            {/* Campaign Photography Grid (Natural Source Aspect Ratios, No Tags/Subtext/Headings) */}
            <div className="pt-3 border-t border-white/10">
              <div className="grid grid-cols-2 gap-2.5 items-start">
                <div className="flex flex-col gap-2.5">
                  <div
                    onClick={() => setActivePhoto(campaignPhotos[0])}
                    className="group cursor-pointer overflow-hidden rounded-[2px] border border-white/10 bg-[#222120] transition-all hover:border-white/30"
                  >
                    <img
                      src={campaignPhotos[0]}
                      alt={campaignAlts[0]}
                      loading="lazy"
                      className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <div
                    onClick={() => setActivePhoto(campaignPhotos[2])}
                    className="group cursor-pointer overflow-hidden rounded-[2px] border border-white/10 bg-[#222120] transition-all hover:border-white/30"
                  >
                    <img
                      src={campaignPhotos[2]}
                      alt={campaignAlts[2]}
                      loading="lazy"
                      className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div
                    onClick={() => setActivePhoto(campaignPhotos[1])}
                    className="group cursor-pointer overflow-hidden rounded-[2px] border border-white/10 bg-[#222120] transition-all hover:border-white/30"
                  >
                    <img
                      src={campaignPhotos[1]}
                      alt={campaignAlts[1]}
                      loading="lazy"
                      className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <div
                    onClick={() => setActivePhoto(campaignPhotos[3])}
                    className="group cursor-pointer overflow-hidden rounded-[2px] border border-white/10 bg-[#222120] transition-all hover:border-white/30"
                  >
                    <img
                      src={campaignPhotos[3]}
                      alt={campaignAlts[3]}
                      loading="lazy"
                      className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Bridge Statement & Stat Grid (Verbatim Anakle Format) */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <p className="font-sans text-[13px] font-normal text-[#F3F3F4]/90">
                The stories did the changing. My job was getting people to hear them. Here is what happened.
              </p>

              <div className="grid grid-cols-2 gap-3.5 pt-1">
                {/* Stat 1 */}
                <div className="space-y-1">
                  <div className="font-serif text-[26px] sm:text-[28px] font-normal leading-none text-[#F3F3F4]">
                    1.5×
                  </div>
                  <p className="font-sans text-[11.5px] font-light leading-[1.35] text-[#8E8F94]">
                    <em>Siñalamba</em> listeners were 1.5 times more likely than non-listeners to open up a hard health conversation with a partner, spouse or relative.</p>
                </div>

                {/* Stat 2 */}
                <div className="space-y-1">
                  <div className="font-serif text-[26px] sm:text-[28px] font-normal leading-none text-[#F3F3F4]">
                    +500m
                  </div>
                  <p className="font-sans text-[11.5px] font-light leading-[1.35] text-[#8E8F94]">
                    Over 500 million people reached by PMC dramas around the world. Nigeria is a cornerstone of that reach.
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="space-y-1">
                  <div className="font-serif text-[26px] sm:text-[28px] font-normal leading-none text-[#F3F3F4]">
                    50+
                  </div>
                  <p className="font-sans text-[11.5px] font-light leading-[1.35] text-[#8E8F94]">
                    Countries with dramas made locally, each in its own language and culture.
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="space-y-1">
                  <div className="font-serif text-[26px] sm:text-[28px] font-normal leading-none text-[#F3F3F4]">
                    25 Yrs
                  </div>
                  <p className="font-sans text-[11.5px] font-light leading-[1.35] text-[#8E8F94]">
                    A quarter century of documented change in how people think, talk and act.
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
                More work
              </Link>
            </div>
          </div>

          {/* Bottom Left Subtle Indicator */}
          <div className="hidden md:block pt-8 text-[11px] font-mono text-[#8E8F94]/50">
            CHRISTOPHER SHOLA // POPULATION MEDIA CENTER CASE STUDY
          </div>
        </motion.section>

        {/* Right Section: Static Video Reel Only (Not Scrollable) */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-7/12 xl:w-7/12 shrink-0 pt-4 sm:pt-6 md:pt-28 pb-8 md:pb-12 px-5 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-between pointer-events-auto md:h-full md:overflow-hidden"
        >
          {/* Featured Video Container (No Headings, Tags, or Subtext) */}
          <div className="my-auto w-full">
            {/* 16:9 Video Player */}
            <div className="relative w-full aspect-video rounded-[2px] overflow-hidden border border-white/10 bg-[#222120] group shadow-2xl">
              <video
                ref={videoRef}
                src="/population-media-center.mp4"
                aria-label="Documentary on 25 years of Population Media Center radio drama in Nigeria"
                playsInline
                loop
                muted={isMuted}
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Minimalist Controls Overlay (No Tags / No Subtext) */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
                <div className="flex justify-end items-center">
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
          </div>

          {/* Bottom Right Aligned Footer */}
          <div className="flex justify-end pt-4">
            <Footer variant="inline" />
          </div>
        </motion.section>
      </main>

      {/* Lightbox / Zoom Modal (No Tags / No Subtext) */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-[#191817] border border-white/15 rounded-[4px] p-2 sm:p-3 shadow-2xl"
          >
            <div className="flex justify-end pb-2">
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="p-1 rounded text-[#8E8F94] hover:text-[#F3F3F4] transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full max-h-[80vh] flex items-center justify-center overflow-hidden rounded-[2px] bg-[#111]">
              <img
                src={activePhoto}
                alt="Population Media Center campaign artwork, enlarged"
                className="max-h-[80vh] w-auto h-auto object-contain rounded-[2px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopulationMediaCenterPage;
