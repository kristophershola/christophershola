import React from "react";
import { motion } from "motion/react";

interface FooterProps {
  className?: string;
  variant?: "fixed" | "static" | "inline";
  duration?: number;
}

export const Footer: React.FC<FooterProps> = ({
  className = "",
  variant = "static",
  duration = 1.5,
}) => {
  const links = [
    { label: "Twitter", href: "https://x.com/kristophershola" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kristophershola" },
    { label: "GitHub", href: "https://github.com/kristophershola" },
  ];

  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-5 sm:gap-6 ${className}`}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-[12px] font-mono font-normal tracking-[0.01em] text-[#F3F3F4]/80 hover:text-white transition-colors duration-200"
          >
            <span>{link.label}</span>
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full" />
          </a>
        ))}
      </div>
    );
  }

  const baseClasses =
    variant === "fixed"
      ? "fixed bottom-0 left-0 right-0 z-30 pointer-events-none pb-5 sm:pb-6 md:pb-8"
      : "w-full flex justify-end py-6 px-5 sm:px-6 md:px-10 z-20 pointer-events-auto";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      className={`${baseClasses} ${className}`}
    >
      <div className="flex items-center gap-5 sm:gap-6 pointer-events-auto">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-[12px] font-mono font-normal tracking-[0.01em] text-[#F3F3F4]/80 hover:text-white transition-colors duration-200"
          >
            <span>{link.label}</span>
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-white transition-all duration-200 group-hover:w-full" />
          </a>
        ))}
      </div>
    </motion.footer>
  );
};

export default Footer;
