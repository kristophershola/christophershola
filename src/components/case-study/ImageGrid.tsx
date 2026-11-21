import React from "react";
import type { CaseStudyGalleryItem } from "@/data/caseStudies";

export interface ImageGridProps {
  items: CaseStudyGalleryItem[];
  onSelectPhoto: (src: string, alt: string) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ items, onSelectPhoto }) => {
  if (!items || items.length === 0) return null;

  // Split into 2 columns for natural masonry layout matching PMC
  const col1 = items.filter((_, idx) => idx % 2 === 0);
  const col2 = items.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="pt-3 border-t border-white/10">
      <div className="grid grid-cols-2 gap-2.5 items-start">
        <div className="flex flex-col gap-2.5">
          {col1.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              type="button"
              onClick={() => onSelectPhoto(item.src, item.alt)}
              className="group cursor-pointer overflow-hidden rounded-[2px] border border-white/10 bg-[#222120] transition-all hover:border-white/30 text-left focus:outline-none focus:ring-1 focus:ring-white/40"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          {col2.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              type="button"
              onClick={() => onSelectPhoto(item.src, item.alt)}
              className="group cursor-pointer overflow-hidden rounded-[2px] border border-white/10 bg-[#222120] transition-all hover:border-white/30 text-left focus:outline-none focus:ring-1 focus:ring-white/40"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;
