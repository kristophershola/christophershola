import { useState, useEffect, useCallback } from "react";
import { useSpring } from "@react-spring/web";
import { cn } from "@/lib/utils";

const BIO_HEADER = "Hey! I'm Shola";
const BIO_BODY = "I help ambitious teams show the world who they are.";

export default function TypewriterBio({ className }: { className?: string }) {
  const [charCount, setCharCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const totalLength = BIO_BODY.length;

  const [, api] = useSpring(() => ({
    from: { count: 0 },
    to: { count: totalLength },
    config: {
      duration: Math.max(totalLength * 38, 2200),
    },
    onChange: ({ value }) => {
      const current = Math.floor(value.count);
      setCharCount(current);
      if (current >= totalLength) {
        setIsDone(true);
      }
    },
  }));

  const handleFastForward = useCallback(() => {
    if (!isDone) {
      api.set({ count: totalLength });
      setCharCount(totalLength);
      setIsDone(true);
    }
  }, [api, isDone, totalLength]);

  useEffect(() => {
    api.start();
  }, [api]);

  const visibleChars = Math.min(charCount, totalLength);
  const visibleText = BIO_BODY.slice(0, visibleChars);

  return (
    <div
      onClick={handleFastForward}
      className={cn(
        "relative text-left select-text transition-colors",
        !isDone && "cursor-pointer",
        className
      )}
    >
      <h1 className="font-heading font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 sm:mb-6 tracking-tight leading-[1.08]">
        {BIO_HEADER}
      </h1>
      <p className="font-sans font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-foreground/90 tracking-tight">
        {visibleText}
        <span aria-hidden="true" className="blinking-cursor" />
      </p>
    </div>
  );
}
