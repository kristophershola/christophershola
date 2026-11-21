import React, { useState } from "react";
import type { CaseStudyMediaConfig } from "@/data/caseStudies";
import VideoPlayer from "./VideoPlayer";
import { Monitor, Smartphone } from "lucide-react";

export interface MediaPanelProps {
  media: CaseStudyMediaConfig;
}

export const MediaPanel: React.FC<MediaPanelProps> = ({ media }) => {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");

  if (media.type === "video" && media.primaryMediaSrc) {
    return (
      <div className="my-auto w-full">
        <VideoPlayer
          src={media.primaryMediaSrc}
          poster={media.posterSrc}
          ariaLabel={media.videoAriaLabel}
          aspectRatio={media.aspectRatio}
        />
      </div>
    );
  }

  if (media.type === "device-toggle") {
    const activeSrc = deviceMode === "desktop" ? media.desktopSrc : media.mobileSrc;

    return (
      <div className="my-auto w-full flex flex-col items-center gap-4">
        {/* Toggle Bar */}
        <div className="inline-flex items-center gap-1 p-1 rounded-[4px] border border-white/10 bg-[#222120]/80 backdrop-blur-sm self-end">
          <button
            type="button"
            onClick={() => setDeviceMode("desktop")}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-colors ${
              deviceMode === "desktop"
                ? "bg-white text-black font-medium"
                : "text-[#8E8F94] hover:text-[#F3F3F4]"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode("mobile")}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] font-mono text-[11px] uppercase tracking-wider transition-colors ${
              deviceMode === "mobile"
                ? "bg-white text-black font-medium"
                : "text-[#8E8F94] hover:text-[#F3F3F4]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Viewport Frame */}
        {deviceMode === "desktop" ? (
          <div className="relative w-full aspect-video rounded-[3px] overflow-hidden border border-white/10 bg-[#222120] shadow-2xl overflow-y-auto scrollbar-none max-h-[70vh]">
            {activeSrc ? (
              <img
                src={activeSrc}
                alt="Desktop interface preview"
                className="w-full h-auto block"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[#8E8F94] font-mono text-[12px]">
                No desktop preview available
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-[280px] sm:w-[320px] aspect-[9/19.5] rounded-[24px] p-2 border-2 border-white/20 bg-[#111] shadow-2xl overflow-hidden">
            <div className="w-full h-full rounded-[18px] overflow-y-auto scrollbar-none bg-[#191817]">
              {activeSrc ? (
                <img
                  src={activeSrc}
                  alt="Mobile interface preview"
                  className="w-full h-auto block"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[#8E8F94] font-mono text-[12px]">
                  No mobile preview
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (media.type === "scrollable-page" && media.primaryMediaSrc) {
    return (
      <div className="my-auto w-full">
        {/* Browser Mockup Window */}
        <div className="relative w-full rounded-[3px] overflow-hidden border border-white/10 bg-[#222120] shadow-2xl flex flex-col max-h-[72vh]">
          {/* Subtle Top Browser Header */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-[#1d1c1b]">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="mx-auto font-mono text-[10px] text-[#8E8F94]/60 tracking-wider">
              INTERACTIVE VIEW
            </div>
          </div>

          {/* Scrollable Document Area */}
          <div className="overflow-y-auto scrollbar-none w-full max-h-[64vh]">
            <img
              src={media.primaryMediaSrc}
              alt={media.videoAriaLabel || "Complete landing page interface"}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
    );
  }

  // Fallback: Primary image or item stack
  return (
    <div className="my-auto w-full">
      {media.primaryMediaSrc && (
        <div className="relative w-full rounded-[2px] overflow-hidden border border-white/10 bg-[#222120] shadow-2xl">
          <img
            src={media.primaryMediaSrc}
            alt={media.videoAriaLabel || "Featured visual"}
            className="w-full h-auto block"
          />
        </div>
      )}
    </div>
  );
};

export default MediaPanel;
