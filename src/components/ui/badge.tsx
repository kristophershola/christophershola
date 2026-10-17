import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-[10px] md:text-[11px] font-mono tracking-wider uppercase font-medium select-none transition-colors",
  {
    variants: {
      variant: {
        default: "border border-white/20 bg-white/[0.04] text-[#F3F3F4]/80 px-2 py-0.5 rounded-[2px]",
        outline: "border border-white/20 text-[#F3F3F4]/70 px-2 py-0.5 rounded-[2px]",
        pill: "border border-white/20 bg-white/[0.04] text-[#F3F3F4]/90 px-3 py-1 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
