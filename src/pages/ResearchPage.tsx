import React from "react";
import { motion } from "motion/react";
import CoordinateGrid from "@/components/CoordinateGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResearchCard from "@/components/ResearchCard";
import { researchItems } from "@/data/researchData";

export const ResearchPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#010204] text-[#F3F3F4] select-none flex flex-col justify-between overflow-x-hidden">
      {/* 6x12 Coordinate Grid */}
      <CoordinateGrid />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Research Catalog */}
      <main className="relative z-10 flex-1 px-6 py-28 md:py-36 lg:py-40">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="border-b border-white/10 pb-6 flex items-baseline justify-between"
          >
            <h1 className="font-serif text-[28px] sm:text-[32px] font-normal tracking-[-0.02em] text-[#F3F3F4]">
              Research
            </h1>
            <span className="font-mono text-xs text-[#F3F3F4]/50">
              {researchItems.length} RELEASES
            </span>
          </motion.div>

          {/* 3-Column Responsive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {researchItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.5), ease: "easeOut" }}
              >
                <ResearchCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer variant="static" />
    </div>
  );
};

export default ResearchPage;
