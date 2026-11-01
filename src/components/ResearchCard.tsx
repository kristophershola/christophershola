import React, { useRef, useState } from "react";
import type { ResearchItem } from "@/data/researchData";
import { Badge } from "@/components/ui/badge";

interface ResearchCardProps {
  item: ResearchItem;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (item.video && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay was prevented or interrupted, handle silently
          });
      }
    }
  };

  const handleMouseLeave = () => {
    if (item.video && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group block relative flex flex-col justify-between space-y-4 p-0 select-none cursor-pointer focus:outline-none"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[2px] border border-black/10 bg-neutral-100">
        <img
          src={item.image}
          alt={`Diagram visualization for ${item.title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] group-hover:brightness-95"
        />

        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            muted
            playsInline
            loop
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out group-hover:scale-[1.02] ${
              isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        )}

        {/* Read More Hover Reveal */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="font-serif text-xs font-normal text-white bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-[2px] border border-white/20">
            Read More
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Title in Serif */}
          <h2 className="font-serif text-[18px] sm:text-[19px] font-normal leading-[1.2] tracking-[-0.01em] text-black group-hover:text-blue-600 transition-colors">
            {item.title}
          </h2>

          {/* Description in Another Sans */}
          <p className="font-sans text-[13px] font-light leading-[1.38] text-neutral-600 line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Metadata: Category Badge & Date */}
        <div className="pt-3 flex items-center justify-between border-t border-black/5">
          <Badge variant="default" className="text-[10px] bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-200">
            {item.category}
          </Badge>
          <span className="font-mono text-[11px] text-neutral-500">
            {item.date}
          </span>
        </div>
      </div>
    </a>
  );
};

export default ResearchCard;
