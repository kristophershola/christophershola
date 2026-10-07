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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="w-full px-4 md:px-6 flex items-center justify-between">
        <button
          type="button"
          data-cal-link="shola-x-cc7czl/30min"
          data-cal-namespace="30min"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-mono font-medium tracking-wider text-white uppercase backdrop-blur-md transition-all duration-200 hover:bg-black/80 hover:scale-105 active:scale-95 shadow-sm"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={14} color="currentColor" strokeWidth={2} />
          Start A Project
        </button>
        {/* Location + time */}
        <span className="flex items-center font-mono font-medium text-sm tracking-widest uppercase text-primary">
          <AbujaClock />
        </span>
      </div>
    </header>
  );
}
