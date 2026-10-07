import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import AbujaClock from "@/components/AbujaClock";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Topmost razor-thin accent gradient line */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-accent-gradient-h pointer-events-none"
      />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 border-b",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="w-full px-4 md:px-6 flex items-center justify-between">
          {/* Location + time */}
          <span className="flex items-center font-mono font-medium text-sm tracking-widest uppercase text-primary">
            <AbujaClock />
          </span>
          <button
            type="button"
            data-cal-link="shola-x-cc7czl/30min"
            data-cal-namespace="30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="group relative inline-flex items-center rounded-full p-[1px] transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(0,142,113,0.35)]"
          >
            {/* Accent gradient ring */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-accent-gradient-h opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            />
            {/* Inner frosted pill */}
            <span className="relative inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 text-xs font-mono tracking-wider text-white uppercase backdrop-blur-md transition-colors group-hover:bg-black/75">
              <span className="inline-flex text-[#00ff00] transition-transform duration-300 group-hover:rotate-90">
                <HugeiconsIcon icon={PlusSignIcon} size={14} color="currentColor" strokeWidth={2.5} />
              </span>
              Start A Project
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
