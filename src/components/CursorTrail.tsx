import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, .cursor-grab, [data-cal-link]";

export default function CursorTrail() {
  const [finePointer] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, fluid spring physics for the trailing circle
  const springConfig = { damping: 26, stiffness: 240, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!finePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as Element | null;
      setIsHovered(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [finePointer, mouseX, mouseY]);

  if (!finePointer) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-50",
        "h-4 w-4 rounded-full bg-neutral-900/90 shadow-sm dark:bg-neutral-100/90",
        "transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0"
      )}
      animate={{
        scale: isHovered ? 1.6 : 1,
      }}
      transition={{
        scale: { type: "spring", stiffness: 350, damping: 25 },
      }}
    />
  );
}
