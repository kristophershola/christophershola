import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import AbujaClock from "@/components/AbujaClock";
import Button31 from "@/components/button/variant-31";

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
        <Button31 />
      </div>
    </header>
  );
}
