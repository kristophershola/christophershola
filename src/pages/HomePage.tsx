import React from "react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden text-[#F3F3F4] select-none">
      {/* Global Navigation */}
      <Navbar />

      {/* Bottom Bar: Aligned 1:1 with Navbar's left and right vertical axes */}
      <div className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none pb-5 sm:pb-6 md:pb-8">
        <div className="w-full max-w-[1400px] mx-auto px-5 flex items-end justify-between gap-6">
          {/* Bottom-Left Editorial Content */}
          <div className="max-w-[378px] pointer-events-auto">
            <div className="space-y-4">
              {/* Animated Headline: Starts in grey & smaller font, fills white left-to-right, then scales up */}
              <motion.div
                initial={{ opacity: 0, scale: 0.76 }}
                animate={{
                  opacity: [0, 1, 1, 1],
                  scale: [0.76, 0.76, 0.76, 1],
                }}
                transition={{
                  duration: 2.2,
                  times: [0, 0.16, 0.64, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="origin-bottom-left inline-block"
              >
                <h1 className="relative font-serif text-[28px] sm:text-[30px] font-normal leading-[1.05] tracking-[-0.02em] select-none">
                  {/* Base Grey Layer */}
                  <span className="text-[#8E8F94]">
                    Hi! I'm Shola
                  </span>

                  {/* Animated White Fill Overlay */}
                  <motion.span
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{
                      delay: 0.45,
                      duration: 0.85,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    className="absolute inset-0 text-[#F3F3F4]"
                    aria-hidden="true"
                  >
                    Hi! I'm Shola
                  </motion.span>
                </h1>
              </motion.div>

              {/* Body Rationale in Another Sans Thin - Neutral grey tone */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2 font-sans text-[13.5px] sm:text-[14px] font-light leading-[1.35] tracking-[0.01em] text-[#8E8F94]"
              >
                <p>
                  I run an independent creative practice specializing in high-impact, cross-channel campaigns. Known for turning data into culture-shaping narratives.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom-Right Social Outbound Links */}
          <div className="pointer-events-auto">
            <Footer variant="inline" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
