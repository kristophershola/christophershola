import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs font-mono font-normal transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        pill: "rounded-full border border-white/25 bg-transparent text-[#F3F3F4] hover:bg-white hover:text-black hover:border-white px-4 py-1.5",
        solid: "rounded-full bg-white text-black border border-white hover:bg-white/90 px-4 py-1.5",
        ghost: "bg-transparent text-[#F3F3F4]/80 hover:text-white hover:bg-white/5 px-2 py-1",
        link: "text-[#F3F3F4]/70 hover:text-white underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "h-7 text-[12px]",
        sm: "h-6 text-[11px] px-3",
        lg: "h-9 text-[13px] px-5",
      },
    },
    defaultVariants: {
      variant: "pill",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
