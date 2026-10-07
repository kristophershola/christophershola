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
  "Multidisciplinary creative with nearly a decade in art direction, design, branding, 3D, animation, and visual storytelling. I create purposeful identities for brands and agencies. Clients include Kuda, Empire, Universal Music Group, Chivas, Smirnoff, Uber, and LVMH. Featured in Okay Africa, Dazed, Fubiz, Print Mag, and The Guardian. Led design at Thrill Digital for Astraverse, a metaverse retail experience. Previously Head of Brand at [Brass](https://trybrass.com/). Co-own [David Blackmoore](https://davidblackmoore.com/), [Studio Unruly](https://www.studiounruly.com/), and co-founder at [Hungry Creative](https://linktr.ee/thehungrycreativepod?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnz-xLE1P4DDXQr3jprx2oQ5SOo6Z07fwVw1qZTuFxF7HtsEly1ATV0Gsbl9A_aem_RtTZEU7d6ONFN45Kf9G9OQ), a design education platform. I use clarity, strong concepts, and reductionist thinking for effective solutions. I experiment through The Sunflower Department. Shortlisted for the 2021 Future Awards Africa Prize for Art and Literature.";

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
      duration: totalLength * 14, // ~10.5 seconds for natural pacing
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

  // Restart typing
  const handleRestart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsDone(false);
      setCharCount(0);
      api.start({
        from: { count: 0 },
        to: { count: totalLength },
        reset: true,
      });
    },
    [api, totalLength]
  );

  useEffect(() => {
    // Start animation upon mount
    api.start();
  }, [api]);

  return (
    <div
      onClick={handleFastForward}
      className={cn(
        "relative text-left font-sans text-base sm:text-lg md:text-[1.05rem] lg:text-[1.125rem]",
        "leading-relaxed text-foreground/80 select-text transition-colors",
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

      {/* Subtle replay action if completed */}
      {isDone && (
        <span className="inline-block ml-3">
          <button
            type="button"
            onClick={handleRestart}
            title="Replay typing animation"
            className="text-xs font-mono text-muted-foreground/60 transition-colors hover:text-foreground"
          >
            [replay]
          </button>
        </span>
      )}
    </div>
  );
}
