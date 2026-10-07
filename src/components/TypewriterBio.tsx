import { useState, useMemo, useEffect, useCallback } from "react";
import { useSpring } from "@react-spring/web";
import { cn } from "@/lib/utils";

interface Segment {
  type: "text" | "link";
  text: string;
  url?: string;
  startIndex: number;
  endIndex: number;
}

const RAW_BIO =
  "A global digital and creative agency crafting bold brands and digital experiences through motion, clarity, and timeless craft. We help ambitious teams show the world who they are.";

export default function TypewriterBio({ className }: { className?: string }) {
  // Parse markdown links into structured segments with absolute character offsets
  const { segments, totalLength } = useMemo(() => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIdx = 0;
    const segs: Segment[] = [];
    let match: RegExpExecArray | null;
    let currIdx = 0;

    while ((match = regex.exec(RAW_BIO)) !== null) {
      if (match.index > lastIdx) {
        const textChunk = RAW_BIO.slice(lastIdx, match.index);
        segs.push({
          type: "text",
          text: textChunk,
          startIndex: currIdx,
          endIndex: currIdx + textChunk.length,
        });
        currIdx += textChunk.length;
      }

      const linkText = match[1];
      const linkUrl = match[2];
      segs.push({
        type: "link",
        text: linkText,
        url: linkUrl,
        startIndex: currIdx,
        endIndex: currIdx + linkText.length,
      });
      currIdx += linkText.length;
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < RAW_BIO.length) {
      const tailChunk = RAW_BIO.slice(lastIdx);
      segs.push({
        type: "text",
        text: tailChunk,
        startIndex: currIdx,
        endIndex: currIdx + tailChunk.length,
      });
      currIdx += tailChunk.length;
    }

    return { segments: segs, totalLength: currIdx };
  }, []);

  const [charCount, setCharCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // React Spring driver for the typing animation
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
        "relative text-left font-sans text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem]",
        "leading-[1.32] text-foreground/90 select-text transition-colors tracking-tight font-normal",
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
