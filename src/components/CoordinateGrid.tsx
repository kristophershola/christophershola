import React from "react";

interface CoordinateGridProps {
  className?: string;
}

export const CoordinateGrid: React.FC<CoordinateGridProps> = ({ className = "" }) => {
  // 6 rows x 12 columns
  const rows = 6;
  const cols = 12;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 flex flex-col justify-between p-6 md:p-10 lg:p-14 overflow-hidden select-none ${className}`}
    >
      {Array.from({ length: rows }).map((_, rIndex) => (
        <div key={rIndex} className="flex w-full justify-between items-center">
          {Array.from({ length: cols }).map((_, cIndex) => {
            // Responsive visibility matching Framer breakpoints:
            // Mobile (under 810px): only show subset of central/key columns
            // Tablet (810px - 1200px): show medium subset
            const isOuterOnMobile = cIndex > 4 && cIndex < 11;
            const isHiddenOnTablet = cIndex === 0 || cIndex === 1 || cIndex === 10 || cIndex === 11;

            return (
              <div
                key={cIndex}
                className={`w-[3px] h-[3px] rounded-full bg-white/25 transition-opacity duration-500 ${
                  isOuterOnMobile ? "hidden md:block" : ""
                } ${isHiddenOnTablet ? "hidden lg:block" : ""}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CoordinateGrid;
