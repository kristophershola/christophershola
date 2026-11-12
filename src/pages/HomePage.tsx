import React from "react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import usePageMeta from "@/lib/usePageMeta";

export const HomePage: React.FC = () => {
  usePageMeta(
    "Christopher Shola | Brand and Campaign Creative, Abuja",
    "Christopher Shola is a brand and campaign creative in Abuja, Nigeria. Stories, identities and design that make people feel seen. See the work."
  );

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
              {/* Animated Headline: Tito Adegbamigbe Framer spring physics & kinetic sweep */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  opacity: { duration: 0.25, ease: "easeOut" },
                  scale: {
                    delay: 0.72,
                    type: "spring",
                    stiffness: 480,
                    damping: 46,
                    mass: 1,
                  },
                }}
                className="origin-bottom-left inline-block"
              >
                <h1 className="relative font-serif text-[28px] sm:text-[30px] font-normal leading-[1.05] tracking-[-0.02em] select-none">
                  {/* Base Muted Grey Layer */}
                  <span className="text-[#8E8F94]">
                    Hi! I'm Shola
                  </span>

                  {/* High-Velocity White Fill Sweep */}
                  <motion.span
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{
                      delay: 0.3,
                      duration: 0.75,
                      ease: [0.84, 0, 0.24, 1],
                    }}
                    className="absolute inset-0 text-[#F3F3F4]"
                    aria-hidden="true"
                  >
                    Hi! I'm Shola
                  </motion.span>
                </h1>
              </motion.div>

              {/* Body Rationale in Another Sans Thin - Enters smoothly as headline settles */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.05,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="space-y-2 font-sans text-[13.5px] sm:text-[14px] font-light leading-[1.35] tracking-[0.01em] text-[#8E8F94]"
              >
                <p>
                  I help brands and causes make people feel something first. Understanding comes after. Brand, story and design from Abuja.
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
