import React from "react";
import type { CaseStudyStat } from "@/data/caseStudies";

export interface StatGridProps {
  impactIntro?: string;
  stats?: CaseStudyStat[];
}

export const StatGrid: React.FC<StatGridProps> = ({ impactIntro, stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="space-y-3 pt-4 border-t border-white/10">
      {impactIntro && (
        <p className="font-sans text-[13px] font-normal text-[#F3F3F4]/90">
          {impactIntro}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3.5 pt-1">
        {stats.map((stat, i) => (
          <div key={`${stat.value}-${i}`} className="space-y-1">
            <div className="font-serif text-[26px] sm:text-[28px] font-normal leading-none text-[#F3F3F4]">
              {stat.value}
            </div>
            <p className="font-sans text-[11.5px] font-light leading-[1.35] text-[#8E8F94]">
              {stat.italicPrefix && (
                <>
                  <em>{stat.italicPrefix}</em>{" "}
                </>
              )}
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatGrid;
