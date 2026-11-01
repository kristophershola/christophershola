import React from "react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden text-[#F3F3F4] select-none">
      {/* Global Navigation */}
      <Navbar />

      {/* Bottom-Left Editorial Content */}
      <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 md:bottom-8 md:left-10 z-20 max-w-[378px] pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Headline in Serrif Thin */}
          <h1 className="font-serif text-[28px] sm:text-[30px] font-normal leading-[1.05] tracking-[-0.02em] text-[#F3F3F4]">
            Hi! I'm Shola
          </h1>

          {/* Body Rationale in Another Sans Thin - Grey tone */}
          <div className="space-y-2 font-sans text-[13.5px] sm:text-[14px] font-light leading-[1.35] tracking-[0.01em] text-[#8E8F94]">
            <p>
              I run an independent creative practice specializing in high-impact, cross-channel campaigns. Known for turning data into culture-shaping narratives.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom-Right Social Outbound Links */}
      <Footer variant="fixed" />
    </div>
  );
};

export default HomePage;
