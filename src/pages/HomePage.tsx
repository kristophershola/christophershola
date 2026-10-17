import React from "react";
import { motion } from "motion/react";
import CoordinateGrid from "@/components/CoordinateGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden bg-[#010204] text-[#F3F3F4] select-none flex flex-col justify-between">
      {/* 6x12 Coordinate Grid */}
      <CoordinateGrid />

      {/* Global Navigation */}
      <Navbar />

      {/* Center Ambient Bipartite Neural Network Video */}
      <div className="relative md:absolute md:inset-0 flex items-center justify-center pointer-events-none z-10 pt-24 pb-8 md:p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-[82vw] max-w-[340px] sm:max-w-[420px] md:max-w-[540px] lg:max-w-[640px] aspect-[660/787] flex items-center justify-center overflow-hidden"
        >
          <video
            src="https://framerusercontent.com/assets/Ig3rUMsiJFPn7k8TrUMqck7OdoA.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-contain pointer-events-none mix-blend-screen"
          />
        </motion.div>
      </div>

      {/* Bottom-Left Editorial Content */}
      <div className="relative z-20 px-6 pb-12 md:px-10 md:pb-8 lg:px-14 lg:pb-10 md:absolute md:bottom-0 md:left-0 max-w-[440px] pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-4"
        >
          {/* Headline in Serrif Thin */}
          <h1 className="font-serif text-[28px] sm:text-[30px] font-normal leading-[1.05] tracking-[-0.02em] text-[#F3F3F4]">
            Understanding
            <br />
            Intelligence
          </h1>

          {/* Body Rationale in Another Sans Thin */}
          <div className="space-y-2.5 font-sans text-[13.5px] sm:text-[14px] font-light leading-[1.35] tracking-[0.01em] text-[#F3F3F4]/90">
            <p>
              Tilde Research is a moonshot AI lab advancing mechanistic interpretability, new architectures, and pretraining science.
            </p>
            <p>
              We build foundational understanding of models to advance the frontier of intelligence.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom-Right Social Outbound Links */}
      <Footer variant="fixed" className="relative md:fixed px-6 pb-8 md:p-0" />
    </div>
  );
};

export default HomePage;
