import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BilateralWing from "@/components/BilateralWing";
import usePageMeta from "@/lib/usePageMeta";

const steps = [
  {
    title: "Listen",
    body: "I start with the people you want to reach: how they talk, what they trust, and what they have learned to tune out.",
  },
  {
    title: "Find the feeling",
    body: "Before a single word or visual, I decide what someone should feel in the first five seconds, and why it matters to them.",
  },
  {
    title: "Build it as one thing",
    body: "Strategy, story, identity and design are made together, so nothing sounds like it came from a different brand than the page before.",
  },
  {
    title: "Carry it out",
    body: "Campaigns, content and media that keep the same feeling intact wherever people meet it, to the last file and the last post.",
  },
];

const offerings = [
  "Brand strategy and identity",
  "Storytelling and narrative development",
  "Campaign ideas and creative direction",
  "Graphic design and visual systems",
  "Websites and digital platforms",
  "PR and media strategy",
];

const labelClass = "font-mono text-[11.5px] uppercase tracking-wider text-[#8E8F94]";
const bodyClass = "font-sans text-[13.5px] sm:text-[14.5px] font-light leading-[1.5] tracking-[0.01em] text-[#8E8F94]";
const sectionClass = "grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-3 sm:gap-6 border-t border-white/10 pt-5";

export const AboutPage: React.FC = () => {
  usePageMeta(
    "About Christopher Shola | Brand and Campaign Creative",
    "I listen first, find the feeling, then build the strategy, story and design to carry it. Brand and campaign work for founders, institutions and teams."
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
              I make things people feel before they can explain why.
            </h1>

            {/* Intro */}
            <p className={bodyClass}>
              I'm Christopher Shola. Most communication gets ignored because it talks at people. Mine starts by listening: to how people actually speak, what makes them laugh, and what they have stopped expecting from anyone trying to sell to them, teach them or win them over. Then I build the brand, the story and the campaign that finally sounds like it understands.
            </p>

            {/* How I work */}
            <section className={sectionClass}>
              <h2 className={labelClass}>How I work</h2>
              <ol className="space-y-5">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="font-mono text-[11.5px] text-[#8E8F94]/60 pt-[5px]">0{i + 1}</span>
                    <div className="space-y-1">
                      <h3 className="font-serif text-[18px] font-normal leading-[1.2] text-[#F3F3F4]">{step.title}</h3>
                      <p className={bodyClass}>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* What I make */}
            <section className={sectionClass}>
              <h2 className={labelClass}>What I make</h2>
              <ul className="space-y-1.5 font-sans text-[14px] font-normal text-[#F3F3F4]/90">
                {offerings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Recent work */}
            <section className={sectionClass}>
              <h2 className={labelClass}>Recent work</h2>
              <p className={bodyClass}>
                Radio drama campaigns, learning platforms and brand identities for Population Media Center, WRAPA, Lorewa and Mathevia. Different rooms, same job: make someone feel understood.
              </p>
            </section>

            {/* Who I work with */}
            <section className={sectionClass}>
              <h2 className={labelClass}>Work with me</h2>
              <div className="space-y-4">
                <p className={bodyClass}>
                  Founders, institutions and teams, in any industry. Not sure what you need yet? That is a fine place to start.
                </p>
                <div className="flex items-center gap-4 font-mono text-[12px]">
                  <Link
                    to="/inquiries"
                    className="text-[#F3F3F4] underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                  >
                    Tell me what you're working on
                  </Link>
                  <span className="text-white/20">/</span>
                  <Link to="/work" className="text-[#8E8F94] hover:text-[#F3F3F4] transition-colors">
                    See the work
                  </Link>
                </div>
              </div>
            </section>
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
