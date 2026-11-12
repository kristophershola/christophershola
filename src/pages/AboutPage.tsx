import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BilateralWing from "@/components/BilateralWing";
import usePageMeta from "@/lib/usePageMeta";

export const AboutPage: React.FC = () => {
  usePageMeta(
    "About Christopher Shola | Brand and Campaign Creative, Abuja",
    "I listen first, then build the stories, brands and visuals that help communities feel seen. Based in Abuja, working across Nigeria and abroad."
  );

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
              People change when a story makes them feel seen.
            </h1>

            {/* Semantic Paragraphs */}
            <div className="space-y-6 font-sans text-[13.5px] sm:text-[14.5px] font-light leading-[1.45] tracking-[0.01em] text-[#8E8F94]">
              <p>
                I'm Christopher Shola, a brand and campaign creative in Abuja. Most communication fails because it talks at people, and nobody who feels talked at feels seen. I start somewhere else. I listen to how a community talks when no broadcast microphone is on, what makes them laugh, and what they have learned not to say.
              </p>

              <p>
                That way of working has meant writing serialized radio dramas for Population Media Center, building a learning platform with WRAPA where girls and women can learn without barriers, and finding a brand voice for Lorewa that speaks to Hausa women in a language that feels like their own. The format changes. What I'm after stays the same: a person who finally feels understood.
              </p>

              <p>
                I work with founders, non-profits and creative agencies, from the first conversation to the final file. Not sure what you need yet? That is a fine place to start. I live in Abuja and work with partners across Nigeria and abroad.
              </p>

              <p>
                <Link
                  to="/inquiries"
                  className="font-mono text-[12px] text-[#F3F3F4] underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                >
                  Tell me what you're working on
                </Link>
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
