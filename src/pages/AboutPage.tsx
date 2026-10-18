import React from "react";
import { motion } from "motion/react";
import CoordinateGrid from "@/components/CoordinateGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BilateralWing from "@/components/BilateralWing";

export const AboutPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#001f3f] text-[#F3F3F4] select-none flex flex-col justify-between overflow-x-hidden">
      {/* 6x12 Coordinate Dot Grid */}
      <CoordinateGrid />

      {/* Global Navigation */}
      <Navbar />

      {/* Main About Framing */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-5 sm:px-6 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-6 lg:gap-12">
          {/* Left Input Network Wing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:block w-[160px] lg:w-[220px] xl:w-[280px] shrink-0"
          >
            <BilateralWing />
          </motion.div>

          {/* Central Manifesto Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex-1 max-w-[620px] mx-auto text-left space-y-8"
          >
            {/* Semantic H1 Headline */}
            <h1 className="font-serif text-[26px] sm:text-[30px] lg:text-[32px] font-normal leading-[1.15] tracking-[-0.02em] text-[#F3F3F4]">
              Our mission at Christopher Shola is to deeply understand the inner mechanisms of models in order to advance the frontier of intelligence
            </h1>

            {/* Semantic Paragraphs */}
            <div className="space-y-6 font-sans text-[13.5px] sm:text-[14.5px] font-light leading-[1.4] tracking-[0.01em] text-[#F3F3F4]/90">
              <p>
                Models compress the universe into their weights through beautiful, intricate, and complex mechanisms. We understand much less than we can build – and that tension leaves us in the compelling position of having many more questions than answers.
              </p>

              <p>
                To make progress on that gap, we believe you must first understand intelligence itself in order to even pose the right questions. As we build more and more capable models, the search space for principled ideas to test grows exponentially; mechanistic insights provide the A* heuristic that guides us toward better model design.
              </p>

              <p>
                The future of intelligent systems is profoundly exciting, and we’re eager to shape it together. Ultimately, there is no greater pursuit than understanding – not as a means to an end, but as an end in and of itself.
              </p>
            </div>
          </motion.div>

          {/* Right Output Network Wing (Mirrored) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:block w-[160px] lg:w-[220px] xl:w-[280px] shrink-0"
          >
            <BilateralWing mirrored />
          </motion.div>
        </div>
      </main>

      {/* Footer Social Outbound Links */}
      <Footer variant="static" />
    </div>
  );
};

export default AboutPage;
