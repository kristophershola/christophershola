import { useState, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import WorkModal from "@/components/WorkModal";

interface NavItem {
  id: "about" | "work";
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
];

export default function Navbar({ className }: { className?: string }) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPillHovered, setIsPillHovered] = useState(false);
  const pillRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pillRef.current) {
      const rect = pillRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleTabClick = (id: "about" | "work") => {
    setActiveTab(id);
    if (id === "work") {
      setIsWorkOpen(true);
    } else if (id === "about") {
      const bioEl = document.querySelector("main");
      if (bioEl) {
        bioEl.scrollIntoView({ behavior: "smooth" });
        bioEl.classList.add("scale-[1.01]");
        setTimeout(() => bioEl.classList.remove("scale-[1.01]"), 300);
      }
    }
  };

  return (
    <>
      <header className={cn("w-full z-40 flex items-center justify-between", className)}>
        {/* Liquid Glass Pill Navbar */}
        <div
          ref={pillRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPillHovered(true)}
          onMouseLeave={() => {
            setIsPillHovered(false);
            setHoveredTab(null);
          }}
          className={cn(
            "group relative inline-flex items-center gap-1 p-1 rounded-full",
            // Frosted Liquid Glass Base
            "bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl backdrop-saturate-150",
            // Glass Edges & Specular Refraction
            "border border-white/80 dark:border-white/15",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.06),0_2px_8px_0_rgba(0,0,0,0.04),inset_0_1px_1px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.04)]",
            "transition-shadow duration-300 hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.1),inset_0_1px_1px_0_rgba(255,255,255,1)]"
          )}
        >
          {/* Dynamic Interactive Liquid Cursor Sheen */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
            style={{
              opacity: isPillHovered ? 1 : 0,
              background: `radial-gradient(circle 65px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.55), transparent 70%)`,
            }}
          />

          {/* Nav Items (About, Work) */}
          <div className="flex items-center gap-0.5 relative z-10 pl-1">
            {NAV_ITEMS.map((item) => {
              const isSelected = activeTab === item.id;
              const isHovered = hoveredTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-mono font-medium tracking-wider uppercase rounded-full transition-colors duration-200 select-none",
                    isSelected || isHovered
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {/* Sliding Liquid Pill Highlight */}
                  {hoveredTab === item.id && (
                    <motion.span
                      layoutId="liquid-nav-highlight"
                      className="absolute inset-0 rounded-full bg-black/[0.06] dark:bg-white/[0.12] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Start a Project (Cal.com Trigger) */}
          <button
            type="button"
            data-cal-link="shola-x-cc7czl/30min"
            data-cal-namespace="30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className={cn(
              "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono font-medium tracking-wider uppercase text-white shadow-sm select-none",
              "bg-black/85 hover:bg-black active:scale-95 transition-all duration-200",
              "shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            )}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={13} color="currentColor" strokeWidth={2.5} />
            Start A Project
          </button>
        </div>
      </header>

      {/* Interactive Work Showcase Modal */}
      <WorkModal isOpen={isWorkOpen} onClose={() => setIsWorkOpen(false)} />
    </>
  );
}
