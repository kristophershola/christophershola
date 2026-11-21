import React, { useEffect } from "react";
import { X } from "lucide-react";

export interface LightboxProps {
  activePhoto: string | null;
  altText?: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  activePhoto,
  altText = "Enlarged preview",
  onClose,
}) => {
  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, onClose]);

  if (!activePhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image preview"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-[#191817] border border-white/15 rounded-[4px] p-2 sm:p-3 shadow-2xl"
      >
        <div className="flex justify-end pb-2">
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[#8E8F94] hover:text-[#F3F3F4] transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
            aria-label="Close image preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="relative w-full max-h-[82vh] flex items-center justify-center overflow-hidden rounded-[2px] bg-[#111]">
          <img
            src={activePhoto}
            alt={altText}
            className="max-h-[82vh] w-auto h-auto object-contain rounded-[2px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
