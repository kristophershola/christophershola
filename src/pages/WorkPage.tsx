import React from "react";
import { motion } from "motion/react";
import CoordinateGrid from "@/components/CoordinateGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResearchCard from "@/components/ResearchCard";
import { researchItems } from "@/data/researchData";

export const WorkPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-transparent text-[#78350F] select-none flex flex-col justify-between overflow-x-hidden">
      {/* 6x12 Coordinate Grid */}
      <CoordinateGrid className="opacity-40 [&>div>div]:!bg-[#78350F]" />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Work Catalog */}
      <main className="relative z-10 flex-1 px-5 sm:px-6 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-[#78350F]/15 pb-5 flex items-baseline justify-between"
          >
            <h1 className="font-serif text-[28px] sm:text-[32px] font-normal tracking-[-0.02em] text-[#78350F]">
              Work
            </h1>
            <span className="font-mono text-xs text-[#92400E]/70">
              {researchItems.length} CASE STUDIES
            </span>
          </motion.div>

          {/* 3-Column Responsive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
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
      <Footer variant="static" className="[&_a]:!text-[#78350F]/80 [&_a:hover]:!text-[#78350F] [&_span.bg-white]:!bg-[#78350F]" />
    </div>
  );
};

export default WorkPage;
