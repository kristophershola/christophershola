import React from "react";
import { motion } from "motion/react";
import CoordinateGrid from "@/components/CoordinateGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobRole {
  title: string;
  type: "FULL-TIME" | "INTERNSHIP";
  link: string;
}

const jobs: JobRole[] = [
  {
    title: "ML Engineer",
    type: "FULL-TIME",
    link: "https://jobs.ashbyhq.com/tilderesearch/b2e145db-0111-47c1-9d9f-e856a057d8ef",
  },
  {
    title: "ML Researcher",
    type: "FULL-TIME",
    link: "https://jobs.ashbyhq.com/tilderesearch/e850d5b0-a5d6-4b9c-9898-f7addb441508/application",
  },
  {
    title: "Hardware/Kernel Engineer",
    type: "FULL-TIME",
    link: "https://jobs.ashbyhq.com/tilderesearch/bc4e4071-cf64-4460-8265-b1e5a603d6b8",
  },
  {
    title: "ML Engineer",
    type: "INTERNSHIP",
    link: "https://jobs.ashbyhq.com/tilderesearch/b2e145db-0111-47c1-9d9f-e856a057d8ef",
  },
  {
    title: "ML Researcher",
    type: "INTERNSHIP",
    link: "https://jobs.ashbyhq.com/tilderesearch/e850d5b0-a5d6-4b9c-9898-f7addb441508/application",
  },
  {
    title: "Hardware/Kernel Engineer",
    type: "INTERNSHIP",
    link: "https://jobs.ashbyhq.com/tilderesearch/bc4e4071-cf64-4460-8265-b1e5a603d6b8",
  },
];

export const InquiriesPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden bg-[#010204] text-[#F3F3F4] select-none flex flex-col justify-between">
      {/* 6x12 Coordinate Grid */}
      <CoordinateGrid />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Split Layout: Fixed Left, Independently Scrolling Right on Desktop & Tablet */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row w-full md:h-full md:overflow-hidden">
        {/* Left Section: Static / Non-scrolling Mission & Backing */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-5/12 xl:w-5/12 shrink-0 pt-20 sm:pt-24 md:pt-28 pb-8 md:pb-12 px-5 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-between pointer-events-auto"
        >
          <div className="space-y-6 sm:space-y-8 max-w-lg">
            <h1 className="font-serif text-[28px] sm:text-[32px] font-normal tracking-[-0.02em] text-[#F3F3F4]">
              Inquiries
            </h1>

            <div className="space-y-5 font-sans text-[13.5px] sm:text-[14px] font-light leading-[1.4] tracking-[0.01em] text-[#F3F3F4]/90">
              <p>
                At Christopher Shola, we believe achieving true progress in interpretability requires innovation across the entire stack. From uncovering the fundamental building blocks of model computation to enabling precise steering of their behavior, we're driven by the fascinating scientific and mathematical problems that underlie true understanding of intelligence.
              </p>

              <p className="text-[#8E8F94]">
                We are backed by Khosla Ventures, researchers at OpenAI and Anthropic, Yufei Zhao, and others.
              </p>

              <div className="pt-2">
                <a
                  href="mailto:inquiries@christophershola.com"
                  className="group inline-flex items-center gap-1.5 font-mono text-[13px] text-[#F3F3F4] hover:text-white transition-colors"
                >
                  <span className="underline underline-offset-4 decoration-white/40 group-hover:decoration-white">
                    inquiries@christophershola.com
                  </span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Left Subtle Indicator on Desktop */}
          <div className="hidden md:block pt-8 text-[11px] font-mono text-[#8E8F94]/50">
            CHRISTOPHER SHOLA // INQUIRIES
          </div>
        </motion.section>

        {/* Right Section: Independently Scrollable Stacked Positions */}
        <section className="w-full md:w-7/12 xl:w-7/12 md:h-full md:overflow-y-auto pt-4 sm:pt-6 md:pt-28 pb-16 px-5 sm:px-6 md:px-8 lg:px-10 pointer-events-auto scrollbar-thin scrollbar-thumb-white/10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="divide-y divide-white/10 max-w-2xl"
          >
            {jobs.map((job, idx) => (
              <div
                key={`${job.title}-${job.type}-${idx}`}
                className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-colors"
              >
                <div className="space-y-1">
                  <h2 className="font-serif text-[19px] sm:text-[21px] font-normal tracking-[-0.01em] text-[#F3F3F4] group-hover:text-white transition-colors">
                    {job.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3.5 shrink-0">
                  <Badge variant="outline" className="text-[10px] tracking-widest text-[#F3F3F4]/60 font-mono py-0.5 px-2">
                    {job.type}
                  </Badge>

                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none"
                  >
                    <Button variant="pill" size="sm">
                      Read more
                    </Button>
                  </a>
                </div>
              </div>
            ))}

            {/* Footer Inside the Right Scrollable Column */}
            <div className="pt-10 pb-6 border-t border-white/10">
              <Footer variant="static" className="p-0 justify-start sm:justify-end" />
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default InquiriesPage;
