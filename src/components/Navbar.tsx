import { useState, useEffect } from "react";
import { Menu01Icon, Cancel01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import AbujaClock from "@/components/AbujaClock";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm py-0"
          : "bg-transparent border-transparent py-0.5"
      )}
    >
      <div className="w-full px-4 md:px-6 flex items-center justify-between">
        {/* Location + time */}
        <span className="flex items-center font-mono font-medium text-xs tracking-widest uppercase text-primary">
          <AbujaClock />
        </span>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="flex items-center h-10 font-mono font-medium tracking-widest uppercase px-6 text-xs text-primary hover:text-foreground/60 transition-colors active:scale-[0.96]"
          >
            Start a project
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button
            className="text-foreground p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <Cancel01Icon className="w-6 h-6" /> : <Menu01Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border/50 shadow-lg p-4 flex flex-col gap-4 animate-fade-in-up">
          <a
            href="#contact"
            className="w-full text-center font-mono font-medium tracking-widest uppercase px-4 py-4 text-xs text-primary hover:text-foreground/60 transition-colors active:scale-[0.98]"
          >
            Start a project
          </a>
        </div>
      )}
    </header>
  );
}
