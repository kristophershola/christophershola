import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { ResearchItem } from "@/data/researchData";
import { Badge } from "@/components/ui/badge";

interface ResearchCardProps {
  item: ResearchItem;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const handleMouseEnter = () => {
    if (!item.video) return;

    if (!shouldLoadVideo) {
      // Lazy-load the video on first hover intent
      setShouldLoadVideo(true);
    } else if (videoRef.current) {
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

  const content = (
    <>
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[2px] border border-white/10 bg-[#222120]">
        <img
          src={item.image}
          alt={`Diagram visualization for ${item.title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] group-hover:brightness-95"
        />

        {item.video && shouldLoadVideo && (
          <video
            ref={videoRef}
            src={item.video}
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            onPlaying={() => setIsPlaying(true)}
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
          <h2 className="font-serif text-[18px] sm:text-[19px] font-normal leading-[1.2] tracking-[-0.01em] text-[#F3F3F4] group-hover:text-white transition-colors">
            {item.title}
          </h2>

          {/* Description in Another Sans */}
          <p className="font-sans text-[13px] font-light leading-[1.38] text-[#8E8F94] line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Metadata: Category Badge & Date */}
        <div className="pt-3 flex items-center justify-between border-t border-white/10">
          <Badge variant="default" className="text-[10px]">
            {item.category}
          </Badge>
          <span className="font-mono text-[11px] text-[#F3F3F4]/50">
            {item.date}
          </span>
        </div>
      </div>
    </>
  );

  const sharedClassName =
    "group block relative flex flex-col justify-between space-y-4 p-0 select-none cursor-pointer focus:outline-none";

  if (item.link.startsWith("/")) {
    return (
      <Link
        to={item.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={sharedClassName}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={sharedClassName}
    >
      {content}
    </a>
  );
};

export default ResearchCard;
