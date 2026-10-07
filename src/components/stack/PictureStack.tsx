import { useState, useMemo, useEffect, useCallback, useRef } from "react";
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

// Helper: target spring configuration for resting / hovered position
// In hovered state, each card tilts in its opposite direction
const toSpring = (i: number, hovered = false, isTop = false) => ({
  x: 0,
  y: i * -2.5 + (hovered && isTop ? -6 : 0),
  scale: (1 - i * 0.015) * (hovered && isTop ? 1.03 : hovered ? 1.01 : 1),
  rot: hovered
    ? -RESTING_ROTATIONS[i % RESTING_ROTATIONS.length] * 1.25
    : RESTING_ROTATIONS[i % RESTING_ROTATIONS.length],
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

  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const isFirstMount = useRef(true);

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
      ...toSpring(i, isHoveredRef.current, i === 0),
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
        ...toSpring(i, isHoveredRef.current, true),
        delay: undefined,
        config: { friction: 28, tension: 450 },
      };
    });
  }, [api, swipedList]);

  // Hover handlers for the card stack
  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    setIsHovered(false);
  }, []);

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

  // Update card tilt orientations when hover state changes or top card changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    api.start((i) => {
      if (goneSet.has(i)) return;
      const isTop = i === topVisibleIndex;
      return {
        x: 0,
        y: i * -2.5 + (isHovered && isTop ? -6 : 0),
        rot: isHovered
          ? -RESTING_ROTATIONS[i % RESTING_ROTATIONS.length] * 1.25
          : RESTING_ROTATIONS[i % RESTING_ROTATIONS.length],
        scale: (1 - i * 0.015) * (isHovered && isTop ? 1.03 : isHovered ? 1.01 : 1),
        delay: undefined,
        config: { friction: isHovered ? 26 : 30, tension: isHovered ? 280 : 350 },
      };
    });
  }, [api, isHovered, topVisibleIndex, goneSet]);

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
        const targetY = isHoveredRef.current ? index * -2.5 - 6 : index * -2.5;
        const y = isGone ? my + dirY * 160 : active ? my : targetY;
        const targetRot = isHoveredRef.current
          ? -RESTING_ROTATIONS[index % RESTING_ROTATIONS.length] * 1.25
          : RESTING_ROTATIONS[index % RESTING_ROTATIONS.length];
        const rot = active
          ? targetRot + mx / 14
          : isGone
          ? dirX * 28 * Math.max(vx, 0.4)
          : targetRot;
        const targetScale = (1 - index * 0.015) * (isHoveredRef.current ? 1.03 : 1);
        const scale = active ? 1.05 : targetScale;

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
      {/* Floating 3D Stack Container */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col items-center justify-center animate-float-deck cursor-pointer"
      >
        <div className="relative flex items-center justify-center w-[270px] h-[360px] sm:w-[300px] sm:h-[400px] md:w-[330px] md:h-[440px] lg:w-[350px] lg:h-[470px]">
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
                  "group relative h-full w-full touch-none overflow-hidden rounded-2xl",
                  "ring-1 ring-black/10 dark:ring-white/10",
                  isTop ? "cursor-grab active:cursor-grabbing" : "cursor-default"
                )}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                />
              </animated.div>
            </animated.div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
