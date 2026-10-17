import React from "react";

interface FooterProps {
  className?: string;
  variant?: "fixed" | "static";
}

export const Footer: React.FC<FooterProps> = ({ className = "", variant = "static" }) => {
  const links = [
    { label: "Twitter", href: "https://x.com/tilderesearch" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/tilderesearch/" },
    { label: "GitHub", href: "https://github.com/tilde-research" },
  ];

  const baseClasses =
    variant === "fixed"
      ? "fixed bottom-6 right-6 md:bottom-8 md:right-10 lg:bottom-10 lg:right-14 z-30 pointer-events-auto"
      : "w-full flex justify-end py-10 px-6 md:px-10 lg:px-14 z-20 pointer-events-auto";

  return (
    <footer className={`${baseClasses} ${className}`}>
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
    </footer>
  );
};

export default Footer;
