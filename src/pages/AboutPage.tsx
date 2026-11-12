import React from "react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BilateralWing from "@/components/BilateralWing";

export const AboutPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen text-[#F3F3F4] select-none flex flex-col justify-between overflow-x-hidden">
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
            <BilateralWing className="[&_svg]:text-white/20" />
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
              Good campaigns start with the truths communities already live by, then build the words, visuals, and media to carry them.
            </h1>

            {/* Semantic Paragraphs */}
            <div className="space-y-6 font-sans text-[13.5px] sm:text-[14.5px] font-light leading-[1.45] tracking-[0.01em] text-[#8E8F94]">
              <p>
                Most communication fails because it treats people as audiences to be persuaded rather than communities with their own culture, humor, and habits. Whether addressing reproductive health in northern Nigeria or building digital platforms for students, I start by listening to how people talk when no broadcast microphone is on.
              </p>

              <p>
                My practice covers brand strategy, narrative development, and visual direction. That work has meant writing serialized radio dramas for Population Media Center, building barrier-free learning platforms for women with WRAPA, and shaping brand identities for independent ventures. I keep the output focused: clear positioning, restrained typography, and stories built on real human stakes.
              </p>

              <p>
                I work with founders, non-profits, and creative agencies from initial strategy through production-ready delivery. I live and work in Abuja, collaborating with partners across Nigeria and internationally.
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
            <BilateralWing mirrored className="[&_svg]:text-white/20" />
          </motion.div>
        </div>
      </main>

      {/* Footer Social Outbound Links */}
      <Footer variant="static" />
    </div>
  );
};

export default AboutPage;
