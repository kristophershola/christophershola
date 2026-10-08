import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

export default function Navbar({ className }: { className?: string }) {
  return (
    <header className={cn("w-full z-50 flex items-center justify-between", className)}>
      <button
        type="button"
        data-cal-link="shola-x-cc7czl/30min"
        data-cal-namespace="30min"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-mono font-medium tracking-wider text-white uppercase backdrop-blur-md transition-all duration-200 hover:bg-black/80 hover:scale-105 active:scale-95 shadow-sm"
      >
        <HugeiconsIcon icon={PlusSignIcon} size={14} color="currentColor" strokeWidth={2} />
        Start A Project
      </button>
    </header>
  );
}
