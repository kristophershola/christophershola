import { useState, useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { cn } from "@/lib/utils";
import AbujaClock from "@/components/AbujaClock";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const initializeCal = async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#1224f5" },
          dark: { "cal-brand": "#1224f5" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };

    void initializeCal();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm py-0"
          : "bg-transparent border-transparent py-0.5"
      )}
    >
      <div className="w-full px-4 md:px-6 flex items-center justify-between">
        {/* Location + time */}
        <span className="flex items-center font-mono font-medium text-sm tracking-widest uppercase text-primary">
          <AbujaClock />
        </span>
        <button
          type="button"
          aria-haspopup="dialog"
          data-cal-namespace="30min"
          data-cal-link="shola-x-cc7czl/30min"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-transparent bg-gradient-to-r from-primary via-primary/60 to-primary px-3 font-mono text-xs font-medium tracking-wide text-primary-foreground transition-[background-position,transform] duration-300 [background-size:200%_auto] hover:bg-transparent hover:bg-[position:99%_center] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-4 sm:text-sm"
        >
          Start A Project
        </button>
      </div>
    </header>
  );
}
