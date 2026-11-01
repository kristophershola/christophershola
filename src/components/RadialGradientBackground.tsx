import React from "react";
import { cn } from "@/lib/utils";

export interface RadialGradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const RadialGradientBackground: React.FC<RadialGradientBackgroundProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn("relative min-h-screen w-full bg-background overflow-x-hidden", className)}
      {...props}
    >
      {/* Ambient Radial Gradient Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_-50%,#c7d2fe_40%,transparent_100%)] dark:[background:radial-gradient(125%_125%_at_50%_-50%,#6366f136_40%,transparent_100%)] z-0"
      />
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export default RadialGradientBackground;
