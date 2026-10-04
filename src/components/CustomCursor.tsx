import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import LogoIcon from "@/components/LogoIcon";

const CLICKABLE_SELECTOR = "a, button, [role='button'], [data-cursor-pointer]";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [finePointer] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!finePointer) return;

    const handleMove = (event: MouseEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      setVisible(true);
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest?.(CLICKABLE_SELECTOR)));
    };

    const handleOut = (event: MouseEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [finePointer]);

  if (!finePointer) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[100] transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0"
      )}
      style={{ willChange: "transform" }}
    >
      <div
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 transition-transform duration-300",
          hovering ? "scale-125" : "scale-100"
        )}
      >
        <LogoIcon className={cn("h-7 w-7 text-primary", hovering && "animate-cursor-spin")} />
      </div>
    </div>
  );
}
