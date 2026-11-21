import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { CaseStudy } from "@/data/caseStudies";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import Lightbox from "./Lightbox";
import ImageGrid from "./ImageGrid";
import StatGrid from "./StatGrid";
import PaletteStrip from "./PaletteStrip";
import MediaPanel from "./MediaPanel";

export interface CaseStudyLayoutProps {
  study: CaseStudy;
}

export const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({ study }) => {
  const [activePhoto, setActivePhoto] = useState<{ src: string; alt: string } | null>(
    null
  );

  return (
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden text-[#F3F3F4] select-none flex flex-col justify-between bg-[#191817]">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Split Layout: Fixed Left, Centerpiece Right on Desktop */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row w-full md:h-full md:overflow-hidden">
        {/* Left Section: Case Narrative, Grid & Impact Metrics */}
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
                {study.title}
              </h1>

              <p className="font-sans text-[13.5px] sm:text-[14px] font-light leading-[1.45] text-[#8E8F94]">
                {study.intro}
              </p>
            </div>

            {/* Disciplines / Services */}
            {study.disciplines && study.disciplines.length > 0 && (
              <div className="pt-2 border-t border-white/10">
                <p className="font-sans text-[13px] font-medium text-[#F3F3F4]/90 tracking-[0.01em]">
                  {study.disciplines.join(", ")}
                </p>
              </div>
            )}

            {/* The Core Challenge */}
            {study.challenge && (
              <div className="space-y-2 pt-2">
                <p className="font-sans text-[13px] sm:text-[13.5px] font-light leading-[1.45] text-[#8E8F94]">
                  {study.challenge}
                </p>
              </div>
            )}

            {/* Editorial Pull Quote */}
            {study.quote && (
              <div className="py-2">
                <h4 className="font-serif text-[17px] sm:text-[19px] font-normal italic leading-[1.3] text-[#F3F3F4]/95 border-l-2 border-white/30 pl-3.5">
                  {study.quote}
                </h4>
              </div>
            )}

            {/* Strategic Approach */}
            {study.approach && (
              <div className="space-y-2">
                <p className="font-sans text-[13px] sm:text-[13.5px] font-light leading-[1.45] text-[#8E8F94]">
                  {study.approach}
                </p>
              </div>
            )}

            {/* Optional Palette Strip for identity studies */}
            <PaletteStrip palette={study.palette} />

            {/* Campaign Photography Grid with Lightbox */}
            <ImageGrid
              items={study.gallery}
              onSelectPhoto={(src, alt) => setActivePhoto({ src, alt })}
            />

            {/* Impact Bridge Statement & Stat Grid */}
            <StatGrid impactIntro={study.impactIntro} stats={study.stats} />

            {/* Outbound Action Link & Navigation */}
            <div className="pt-4 pb-2 border-t border-white/10 flex items-center gap-4">
              {study.outboundLink && (
                <>
                  <a
                    href={study.outboundLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-mono text-[12px] text-[#F3F3F4] hover:text-white transition-colors"
                  >
                    <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white">
                      {study.outboundLink.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <span className="text-white/20">/</span>
                </>
              )}

              <Link
                to="/work"
                className="font-mono text-[12px] text-[#8E8F94] hover:text-[#F3F3F4] transition-colors"
              >
                More work
              </Link>
            </div>
          </div>

          {/* Bottom Left Subtle Indicator */}
          <div className="hidden md:block pt-8 text-[11px] font-mono text-[#8E8F94]/50 uppercase">
            CHRISTOPHER SHOLA // {study.title} CASE STUDY
          </div>
        </motion.section>

        {/* Right Section: Media Centerpiece */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-7/12 xl:w-7/12 shrink-0 pt-4 sm:pt-6 md:pt-28 pb-8 md:pb-12 px-5 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-between pointer-events-auto md:h-full md:overflow-hidden"
        >
          {/* Main Media Panel */}
          <MediaPanel media={study.media} />

          {/* Bottom Right Aligned Footer */}
          <div className="flex justify-end pt-4">
            <Footer variant="inline" />
          </div>
        </motion.section>
      </main>

      {/* Lightbox / Zoom Modal */}
      <Lightbox
        activePhoto={activePhoto ? activePhoto.src : null}
        altText={activePhoto ? activePhoto.alt : undefined}
        onClose={() => setActivePhoto(null)}
      />
    </div>
  );
};

export default CaseStudyLayout;
