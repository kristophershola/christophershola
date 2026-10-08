import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PICTURE_STACK_DATA } from "@/components/archive/stack/data";
import { X, ArrowUpRight } from "lucide-react";

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkModal({ isOpen, onClose }: WorkModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop with frosted blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Liquid Glass Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl bg-white/80 dark:bg-neutral-900/85 backdrop-blur-2xl border border-white/70 dark:border-white/10 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.8)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-heading text-lg font-normal text-foreground">
                  Selected Work
                </span>
                <span className="font-mono text-xs text-foreground/50 tracking-widest uppercase">
                  ({PICTURE_STACK_DATA.length} Projects)
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-full text-foreground/60 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Project Grid */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PICTURE_STACK_DATA.map((work) => (
                <div
                  key={work.id}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 transition-all hover:border-black/20 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={work.image}
                      alt={work.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-foreground/50 mb-1">
                        <span>{work.category}</span>
                        <span>{work.year}</span>
                      </div>
                      <h4 className="font-sans font-medium text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {work.title}
                      </h4>
                    </div>
                    {work.description && (
                      <p className="font-sans text-xs text-foreground/60 mt-1.5 line-clamp-2 leading-relaxed">
                        {work.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
