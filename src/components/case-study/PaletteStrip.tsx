import React from "react";

export interface PaletteStripProps {
  palette?: string[];
}

export const PaletteStrip: React.FC<PaletteStripProps> = ({ palette }) => {
  if (!palette || palette.length === 0) return null;

  return (
    <div className="pt-3 border-t border-white/10 space-y-2">
      <p className="font-mono text-[11px] uppercase tracking-wider text-[#8E8F94]">
        Color Palette System
      </p>
      <div className="flex items-center gap-2">
        {palette.map((hex, i) => (
          <div key={`${hex}-${i}`} className="flex flex-col items-center gap-1 group">
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-[2px] border border-white/20 transition-transform group-hover:scale-110 shadow-sm"
              style={{ backgroundColor: hex }}
              title={hex}
            />
            <span className="font-mono text-[9.5px] text-[#8E8F94] group-hover:text-[#F3F3F4] transition-colors">
              {hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteStrip;
