import { useState, useMemo, useEffect, useCallback } from "react";
import { useSprings, animated, to } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import { cn } from "@/lib/utils";
import { PICTURE_STACK_DATA, type StackPicture } from "./data";

interface PictureStackProps {
  items?: StackPicture[];
  className?: string;
}

// Organic resting rotation angles for stacked cards
const RESTING_ROTATIONS = [-4.2, 3.8, -2.5, 4.6, -3.6, 2.9, -1.8, 3.5];

// Helper: target spring configuration for resting position
const toSpring = (i: number) => ({
  x: 0,
  y: i * -2.5,
  scale: 1 - i * 0.015,
  rot: RESTING_ROTATIONS[i % RESTING_ROTATIONS.length],
  opacity: 1,
  delay: i * 80,
});

// Helper: initial spring configuration (cards dropping in from top)
const fromSpring = (_i: number) => ({
  x: 0,
  rot: 0,
  scale: 1.2,
  y: -700,
  opacity: 0,
});

// 3D perspective CSS interpolation function
const trans = (r: number, s: number) =>
  `perspective(1400px) rotateX(10deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

export default function PictureStack({
  items = PICTURE_STACK_DATA,
  className,
}: PictureStackProps) {
  const [swipedList, setSwipedList] = useState<number[]>([]);
  const goneSet = useMemo(() => new Set(swipedList), [swipedList]);

  // Create springs for all cards
  const [springs, api] = useSprings(items.length, (i) => ({
    ...toSpring(i),
    from: fromSpring(i),
    config: { friction: 32, tension: 350 },
  }));

  // Re-deal and reset the deck
  const handleReset = useCallback(() => {
    setSwipedList([]);
    api.start((i) => ({
      ...toSpring(i),
      from: fromSpring(i),
      config: { friction: 30, tension: 380 },
    }));
  }, [api]);

  // Programmatic swipe (flick card off screen)
  const handleSwipe = useCallback(
    (direction: -1 | 1 = 1) => {
      const topIdx = items.findIndex((_, idx) => !goneSet.has(idx));
      if (topIdx === -1) return;

      const nextSwiped = [...swipedList, topIdx];
      setSwipedList(nextSwiped);

      api.start((i) => {
        if (i !== topIdx) return;
        const x = (typeof window !== "undefined" ? window.innerWidth / 2 + 450 : 800) * direction;
        const rot = direction * 24;
        return {
          x,
          y: -25,
          rot,
          scale: 0.95,
          opacity: 0,
          delay: undefined,
          config: { friction: 34, tension: 240 },
        };
      });

      if (nextSwiped.length === items.length) {
        setTimeout(handleReset, 650);
      }
    },
    [api, goneSet, handleReset, items, swipedList]
  );

  // Undo last swiped card
  const handleUndo = useCallback(() => {
    if (swipedList.length === 0) return;
    const lastIdx = swipedList[swipedList.length - 1];
    setSwipedList((prev) => prev.slice(0, -1));

    api.start((i) => {
      if (i !== lastIdx) return;
      return {
        ...toSpring(i),
        delay: undefined,
        config: { friction: 28, tension: 450 },
      };
    });
  }, [api, swipedList]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSwipe(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSwipe(-1);
      } else if (e.key === "z" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleUndo();
      } else if (e.key === "r" && !e.metaKey && !e.ctrlKey) {
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSwipe, handleUndo, handleReset]);

  // Find topmost visible card index
  const topVisibleIndex = items.findIndex((_, idx) => !goneSet.has(idx));

  // Drag gesture binding
  const bind = useDrag(
    ({
      args: [index],
      active,
      movement: [mx, my],
      velocity: [vx, vy],
      direction: [xDir, yDir],
    }) => {
      // Only permit dragging the top visible card
      if (index !== topVisibleIndex) return;

      const trigger =
        Math.hypot(vx, vy) > 0.35 || Math.abs(mx) > 100 || Math.abs(my) > 100;
      const dirX = xDir !== 0 ? Math.sign(xDir) : mx > 0 ? 1 : -1;
      const dirY = yDir !== 0 ? Math.sign(yDir) : my > 0 ? 1 : 0;

      const willBeGone = !active && trigger;
      if (willBeGone) {
        const nextList = [...swipedList, index];
        setSwipedList(nextList);
        if (nextList.length === items.length) {
          setTimeout(handleReset, 650);
        }
      }

      api.start((i) => {
        if (index !== i) return;
        const isGone = willBeGone || goneSet.has(index);
        const winWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
        const x = isGone ? (winWidth / 2 + 450) * dirX : active ? mx : 0;
        const y = isGone ? my + dirY * 160 : active ? my : i * -2.5;
        const rot =
          RESTING_ROTATIONS[i % RESTING_ROTATIONS.length] +
          (active ? mx / 14 : isGone ? dirX * 28 * Math.max(vx, 0.4) : 0);
        const scale = active ? 1.05 : 1 - i * 0.015;

        return {
          x,
          y,
          rot,
          scale,
          opacity: isGone ? 0 : 1,
          delay: undefined,
          config: {
            friction: active ? 42 : 32,
            tension: active ? 850 : isGone ? 220 : 380,
          },
        };
      });
    }
  );

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center select-none py-4",
        className
      )}
    >
      {/* 3D Stack Container */}
      <div className="relative flex items-center justify-center w-[280px] h-[380px] sm:w-[320px] sm:h-[430px] md:w-[340px] md:h-[450px] lg:w-[360px] lg:h-[470px]">
        {springs.map(({ x, y, rot, scale, opacity }, i) => {
          const item = items[i];
          const isGone = goneSet.has(i);
          const isTop = i === topVisibleIndex;

          return (
            <animated.div
              key={item.id}
              className="absolute inset-0 will-change-transform flex items-center justify-center"
              style={{
                x,
                y,
                opacity,
                zIndex: isGone ? 0 : items.length - i,
                pointerEvents: isGone ? "none" : isTop ? "auto" : "none",
              }}
            >
              <animated.div
                {...bind(i)}
                style={{
                  transform: to([rot, scale], trans),
                }}
                className={cn(
                  "group relative h-full w-full touch-none rounded-3xl border border-neutral-200/90 bg-white/95 p-3.5 shadow-2xl backdrop-blur-sm",
                  "transition-[border-color] duration-200 dark:border-neutral-800 dark:bg-zinc-900/95",
                  "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]",
                  isTop ? "cursor-grab active:cursor-grabbing hover:border-neutral-400 dark:hover:border-neutral-700" : "cursor-default"
                )}
              >
                {/* Photo frame */}
                <div className="relative h-[78%] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-mono tracking-wider text-white uppercase backdrop-blur-md">
                    <span>{item.category}</span>
                  </div>
                  {/* Year Pill */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-mono tracking-wider text-white backdrop-blur-md">
                    <span>{item.year}</span>
                  </div>
                </div>

                {/* Card Meta & Caption */}
                <div className="flex h-[22%] w-full flex-col justify-center px-1 pt-2">
                  <h3 className="truncate font-sans font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h3>
                  <p className="truncate font-sans text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </p>
                </div>
              </animated.div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}
