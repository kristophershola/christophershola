import { useState, useEffect } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import { cn } from "@/lib/utils";

interface DisciplineEmphasisProps {
  text: string;
  visibleChars: number;
  isCurrentlyTyping: boolean;
  isCompleted: boolean;
  color: string;
  number: string;
  summary: string;
}

function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}`;
}

export default function DisciplineEmphasis({
  text,
  visibleChars,
  isCurrentlyTyping,
  isCompleted,
  color,
  number,
  summary,
}: DisciplineEmphasisProps) {
  const [isHovered, setIsHovered] = useState(false);

  // React Spring physics configuration
  const [spring, api] = useSpring(() => ({
    scale: 1,
    y: 0,
    underlineWidth: 0,
    bgOpacity: 0,
    pillOpacity: 0,
    pillY: 4,
    config: { tension: 380, friction: 22 },
  }));

  // Trigger arrival bounce and underline draw once typing reaches completion
  useEffect(() => {
    if (isCompleted) {
      api.start({
        from: { scale: 1.07, y: -2, underlineWidth: 0 },
        to: { scale: 1, y: 0, underlineWidth: 100 },
        config: { tension: 300, friction: 18 },
      });
    }
  }, [isCompleted, api]);

  // Handle interactive hover and press
  const handleMouseEnter = () => {
    if (!isCompleted) return;
    setIsHovered(true);
    api.start({
      scale: 1.03,
      y: -2,
      bgOpacity: 0.08,
      pillOpacity: 1,
      pillY: 0,
      config: { tension: 420, friction: 24 },
    });
  };

  const handleMouseLeave = () => {
    if (!isCompleted) return;
    setIsHovered(false);
    api.start({
      scale: 1,
      y: 0,
      bgOpacity: 0,
      pillOpacity: 0,
      pillY: 4,
      config: { tension: 350, friction: 22 },
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isCompleted) return;
    e.stopPropagation();
    api.start({
      scale: 0.96,
      y: 0,
      config: { tension: 500, friction: 16 },
    });
  };

  const handleMouseUp = () => {
    if (!isCompleted) return;
    api.start({
      scale: isHovered ? 1.03 : 1,
      y: isHovered ? -2 : 0,
      config: { tension: 420, friction: 22 },
    });
  };

  const textSlice = text.slice(0, visibleChars);

  // During typing: render completely inline without layout shifts or transform
  if (!isCompleted) {
    return (
      <span className="font-medium text-foreground">
        {textSlice}
        {isCurrentlyTyping && (
          <span aria-hidden="true" className="blinking-cursor" />
        )}
      </span>
    );
  }

  // Once fully typed: spring-powered interactive keyword
  return (
    <animated.span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        transform: to(
          [spring.scale, spring.y],
          (s, yVal) => `scale(${s}) translateY(${yVal}px)`
        ),
        backgroundColor: spring.bgOpacity.to(
          (o) => `rgba(${hexToRgb(color)}, ${o})`
        ),
        verticalAlign: "baseline",
      }}
      className={cn(
        "relative inline-block cursor-pointer font-medium select-text",
        "px-1 py-0.5 -mx-1 -my-0.5 rounded-none transition-colors",
        "group"
      )}
    >
      {/* Emphasized Text */}
      <span
        className="relative z-10 transition-colors duration-200"
        style={{ color: isHovered ? color : "inherit" }}
      >
        {text}
      </span>

      {/* Spring Underline in Discipline's Spectrum Color */}
      <animated.span
        aria-hidden="true"
        style={{
          backgroundColor: color,
          width: spring.underlineWidth.to((w) => `${w}%`),
        }}
        className="absolute bottom-0 left-0 h-[2px] pointer-events-none"
      />

      {/* Monospace Index Tag (e.g. [01] in IBM Plex Mono) that springs in on hover */}
      <animated.span
        aria-hidden="true"
        style={{
          opacity: spring.pillOpacity,
          transform: spring.pillY.to((py) => `translateY(${py}px)`),
          color: color,
          borderColor: color,
        }}
        className={cn(
          "pointer-events-none absolute -top-5 left-0 z-20 flex items-center gap-1.5",
          "font-mono text-[9px] font-semibold tracking-widest uppercase",
          "bg-background/95 px-1.5 py-0.5 border border-current shadow-xs"
        )}
      >
        <span>[{number}]</span>
        <span className="hidden sm:inline font-sans font-normal text-[8.5px] opacity-80 whitespace-nowrap text-foreground">
          {summary}
        </span>
      </animated.span>
    </animated.span>
  );
}
