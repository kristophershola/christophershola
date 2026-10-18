import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// Timing easing curve copied 1:1 from chrisrodriguez.me
const TRANSITION_EASE = [0.66, 0, 0.34, 1] as const;

const characterVariants = {
  initial: (delay: number) => ({
    y: 3,
    scale: 0.85,
    opacity: 0,
    filter: "blur(2px)",
    transition: { duration: 0.4, ease: TRANSITION_EASE, delay },
  }),
  animate: (delay: number) => ({
    y: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: TRANSITION_EASE, delay },
  }),
  exit: (delay: number) => ({
    y: -3,
    scale: 0.85,
    opacity: 0,
    filter: "blur(2px)",
    transition: { duration: 0.4, ease: TRANSITION_EASE, delay },
  }),
};

interface CharacterProps {
  char: string;
  index: number;
  delay: number;
}

function Character({ char, index, delay }: CharacterProps) {
  // Static non-alphanumeric punctuation (like ':' or non-breaking spaces)
  if (!/[\dA-Za-z]/.test(char)) {
    return <span className="inline-block">{char}</span>;
  }

  // Digits use 0.6em width, letters (AM/PM) use 0.7em width
  const widthClass = /\d/.test(char) ? "w-[0.6em]" : "w-[0.7em]";

  return (
    <span
      className={`relative inline-block overflow-visible align-baseline leading-[inherit] ${widthClass}`}
    >
      {/* Invisible placeholder for natural layout sizing */}
      <span className="invisible block w-full text-center" aria-hidden="true">
        {char}
      </span>
      <AnimatePresence initial={false} custom={delay}>
        <motion.span
          key={`${index}-${char}`}
          className="absolute inset-0 block w-full text-center will-change-[transform,opacity,filter]"
          custom={delay}
          variants={characterVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export interface TickerProps {
  value: string;
  className?: string;
}

export function Ticker({ value, className }: TickerProps) {
  const [state, setState] = useState({ previousValue: value, value });
  let previousValue = state.previousValue;

  if (state.value !== value) {
    previousValue = state.value;
    setState({ previousValue: state.value, value });
  }

  // Determine which digit indices changed to stagger animation delays
  const changedIndices = value.split("").reduce<number[]>((acc, char, idx) => {
    if (/\d/.test(char) && previousValue[idx] !== char) {
      acc.push(idx);
    }
    return acc;
  }, []);

  const hasMultiple = changedIndices.length > 1;
  const delayMap = new Map(
    changedIndices.map((idx, pos) => [idx, hasMultiple ? 0.04 * pos : 0])
  );

  return (
    <span
      className={`inline-flex items-baseline tabular-nums font-[inherit] ${
        className ?? ""
      }`}
    >
      {value.split("").map((char, idx) => (
        <Character
          key={idx}
          char={char}
          index={idx}
          delay={delayMap.get(idx) ?? 0}
        />
      ))}
    </span>
  );
}

function useVisibleInterval(
  callback: () => void,
  delay: number,
  ref: React.RefObject<HTMLElement | null>
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    const element = ref.current;
    if (!element) return;

    let isIntersecting = true;

    const updateTimer = () => {
      if (timer !== undefined) {
        clearInterval(timer);
        timer = undefined;
      }
      const isHidden =
        typeof document !== "undefined" &&
        document.hidden &&
        !navigator.webdriver;
      if (isIntersecting && !isHidden) {
        callbackRef.current();
        timer = setInterval(() => callbackRef.current(), delay);
      }
    };

    // Immediately start interval on mount
    updateTimer();

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting !== isIntersecting) {
          isIntersecting = entry.isIntersecting;
          updateTimer();
        }
      });
      observer.observe(element);
    }

    document.addEventListener("visibilitychange", updateTimer);

    return () => {
      if (timer !== undefined) clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updateTimer);
    };
  }, [delay, ref]);
}

function formatCurrentTime(timeZone: string = "America/Los_Angeles"): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone,
  });

  const parts = formatter.formatToParts(new Date());
  const getPart = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${getPart("hour")}:${getPart("minute")}:${getPart(
    "second"
  )}\u00A0${getPart("dayPeriod")}`;
}

export interface ClockProps {
  className?: string;
  timeZone?: string;
  location?: string;
  locationClassName?: string;
}

export const Clock: React.FC<ClockProps> = ({
  className,
  timeZone = "America/Los_Angeles",
  location,
  locationClassName,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [time, setTime] = useState<string>(() => formatCurrentTime(timeZone));

  useVisibleInterval(
    () => {
      setTime(formatCurrentTime(timeZone));
    },
    1000,
    ref
  );

  if (!location) {
    return (
      <span
        ref={ref}
        className={`whitespace-nowrap ${className ?? ""}`}
        suppressHydrationWarning
      >
        <Ticker value={time} />
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-4 sm:gap-5 ${className ?? ""}`}>
      <span
        className={`whitespace-nowrap hidden [@media(min-width:360px)]:inline ${
          locationClassName ?? ""
        }`}
      >
        {location}
      </span>
      <span
        ref={ref}
        className="whitespace-nowrap"
        suppressHydrationWarning
      >
        <Ticker value={time} />
      </span>
    </div>
  );
};

export default Clock;
