import { useState, useMemo, useEffect, useCallback } from "react";
import { useSpring } from "@react-spring/web";
import { cn } from "@/lib/utils";
import DisciplineEmphasis from "@/components/typewriter/DisciplineEmphasis";

interface Segment {
  type: "text" | "link" | "discipline";
  text: string;
  url?: string;
  startIndex: number;
  endIndex: number;
  discipline?: {
    color: string;
    number: string;
    summary: string;
  };
}

const DISCIPLINES: {
  keyword: string;
  color: string;
  number: string;
  summary: string;
}[] = [
  {
    keyword: "strategy",
    color: "#e3001c",
    number: "01",
    summary: "Brand & market positioning",
  },
  {
    keyword: "verbal Identity",
    color: "#aa0055",
    number: "02",
    summary: "Voice, naming & narrative systems",
  },
  {
    keyword: "visual identity",
    color: "#8e0071",
    number: "03",
    summary: "Design systems & art direction",
  },
  {
    keyword: "digital experience",
    color: "#71008e",
    number: "04",
    summary: "Bespoke digital platforms & UI",
  },
  {
    keyword: "go to market strategy",
    color: "#5500aa",
    number: "05",
    summary: "Launch narrative & product growth",
  },
  {
    keyword: "future evolution",
    color: "#0000ff",
    number: "06",
    summary: "Continuous scale & next-gen evolution",
  },
];

const RAW_BIO =
  "Shola runs an independent digital and creative practice specializing in strategy, verbal Identity, visual identity, digital experience, go to market strategy, future evolution.";

export default function TypewriterBio({ className }: { className?: string }) {
  // Parse bio into segments identifying plain text, links, and emphasized disciplines
  const { segments, totalLength } = useMemo(() => {
    let currIdx = 0;
    let textIndex = 0;
    const segs: Segment[] = [];

    // Match disciplines in sequential order
    for (const disc of DISCIPLINES) {
      const matchIdx = RAW_BIO.indexOf(disc.keyword, textIndex);
      if (matchIdx !== -1) {
        // Plain text leading up to this discipline
        if (matchIdx > textIndex) {
          const chunk = RAW_BIO.slice(textIndex, matchIdx);
          segs.push({
            type: "text",
            text: chunk,
            startIndex: currIdx,
            endIndex: currIdx + chunk.length,
          });
          currIdx += chunk.length;
        }

        // Emphasized discipline
        segs.push({
          type: "discipline",
          text: disc.keyword,
          startIndex: currIdx,
          endIndex: currIdx + disc.keyword.length,
          discipline: {
            color: disc.color,
            number: disc.number,
            summary: disc.summary,
          },
        });
        currIdx += disc.keyword.length;
        textIndex = matchIdx + disc.keyword.length;
      }
    }

    // Trailing punctuation / text
    if (textIndex < RAW_BIO.length) {
      const tail = RAW_BIO.slice(textIndex);
      segs.push({
        type: "text",
        text: tail,
        startIndex: currIdx,
        endIndex: currIdx + tail.length,
      });
      currIdx += tail.length;
    }

    return { segments: segs, totalLength: currIdx };
  }, []);

  const [charCount, setCharCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // React Spring driver for character-by-character typing
  const [, api] = useSpring(() => ({
    from: { count: 0 },
    to: { count: totalLength },
    config: {
      duration: Math.max(totalLength * 26, 2500),
    },
    onChange: ({ value }) => {
      const current = Math.floor(value.count);
      setCharCount(current);
      if (current >= totalLength) {
        setIsDone(true);
      }
    },
  }));

  // Fast-forward / complete typing on click
  const handleFastForward = useCallback(() => {
    if (!isDone) {
      api.set({ count: totalLength });
      setCharCount(totalLength);
      setIsDone(true);
    }
  }, [api, isDone, totalLength]);

  useEffect(() => {
    // Start animation upon mount
    api.start();
  }, [api]);

  return (
    <div
      onClick={handleFastForward}
      className={cn(
        "relative text-left font-sans text-sm sm:text-base md:text-lg",
        "leading-[1.6] text-foreground/90 select-text transition-colors tracking-normal font-normal",
        !isDone && "cursor-pointer",
        className
      )}
    >
      <p className="inline">
        {segments.map((seg, idx) => {
          if (charCount <= seg.startIndex) return null;

          const visibleChars = Math.min(
            charCount - seg.startIndex,
            seg.text.length
          );
          const textSlice = seg.text.slice(0, visibleChars);
          const isCurrentlyTyping =
            charCount >= seg.startIndex && charCount < seg.endIndex;
          const isCompleted = charCount >= seg.endIndex;

          if (seg.type === "discipline" && seg.discipline) {
            return (
              <DisciplineEmphasis
                key={idx}
                text={seg.text}
                visibleChars={visibleChars}
                isCurrentlyTyping={isCurrentlyTyping}
                isCompleted={isCompleted}
                color={seg.discipline.color}
                number={seg.discipline.number}
                summary={seg.discipline.summary}
              />
            );
          }

          if (seg.type === "link") {
            return (
              <span key={idx}>
                <a
                  href={seg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-medium text-foreground underline underline-offset-4 decoration-primary/50 transition-all hover:decoration-primary hover:text-primary"
                >
                  {textSlice}
                </a>
                {isCurrentlyTyping && (
                  <span aria-hidden="true" className="blinking-cursor" />
                )}
              </span>
            );
          }

          return (
            <span key={idx}>
              {textSlice}
              {isCurrentlyTyping && (
                <span aria-hidden="true" className="blinking-cursor" />
              )}
            </span>
          );
        })}
        {isDone && <span aria-hidden="true" className="blinking-cursor" />}
      </p>
    </div>
  );
}
