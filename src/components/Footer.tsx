import React from "react";
import { motion } from "motion/react";

interface FooterProps {
  className?: string;
  variant?: "fixed" | "static";
}

export const Footer: React.FC<FooterProps> = ({ className = "", variant = "static" }) => {
  const links = [
    { label: "Twitter", href: "https://x.com/kristophershola" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kristophershola" },
    { label: "GitHub", href: "https://github.com/kristophershola" },
  ];

  const baseClasses =
    variant === "fixed"
      ? "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 md:bottom-8 md:right-10 z-30 pointer-events-auto"
      : "w-full flex justify-end py-6 px-5 sm:px-6 md:px-10 z-20 pointer-events-auto";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`${baseClasses} ${className}`}
    >
      <div className="flex items-center gap-5 sm:gap-6">
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
