import React from "react";
import { motion } from "motion/react";
import CoordinateGrid from "@/components/CoordinateGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HoneyEmberBackground } from "@/components/ui/honey-ember-background";

export const HomePage: React.FC = () => {
  return (
    <HoneyEmberBackground className="relative w-full h-screen overflow-hidden text-[#78350F] select-none">
      {/* 6x12 Coordinate Grid */}
      <CoordinateGrid className="opacity-40 [&>div>div]:!bg-[#78350F]" />

      {/* Global Navigation */}
      <Navbar />

      {/* Center Ambient Bipartite Neural Network Video (Inverted for warm light background) */}
      <div className="absolute inset-x-0 top-[57px] bottom-[56px] flex items-center justify-center pointer-events-none z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full max-h-[460px] sm:max-h-[500px] md:max-h-[540px] aspect-[0.8396/1] w-auto max-w-[85vw] flex items-center justify-center overflow-hidden"
        >
          <video
            src="https://framerusercontent.com/assets/Ig3rUMsiJFPn7k8TrUMqck7OdoA.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-contain pointer-events-none invert mix-blend-multiply opacity-85"
          />
        </motion.div>
      </div>

      {/* Bottom-Left Editorial Content */}
      <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 md:bottom-8 md:left-10 z-20 max-w-[378px] pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Headline in Serrif Thin */}
          <h1 className="font-serif text-[28px] sm:text-[30px] font-normal leading-[1.05] tracking-[-0.02em] text-[#78350F]">
            Hi! I'm Shola
          </h1>

          {/* Body Rationale in Another Sans Thin - Honey amber tone */}
          <div className="space-y-2 font-sans text-[13.5px] sm:text-[14px] font-light leading-[1.35] tracking-[0.01em] text-[#92400E]">
            <p>
              I run an independent creative practice specializing in high-impact, cross-channel campaigns. Known for turning data into culture-shaping narratives.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom-Right Social Outbound Links */}
      <Footer variant="fixed" className="[&_a]:!text-[#78350F]/80 [&_a:hover]:!text-[#78350F] [&_span.bg-white]:!bg-[#78350F]" />
    </HoneyEmberBackground>
  );
};

export default HomePage;
