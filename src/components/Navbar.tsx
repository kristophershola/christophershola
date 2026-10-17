import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "About", num: "(1)", path: "/about" },
    { name: "Research", num: "(2)", path: "/research" },
    { name: "Join", num: "(3)", path: "/join" },
  ];

  return (
    <>
      {/* Animated slide down on entry */}
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 md:px-8 md:py-5 pointer-events-none"
      >
        {/* Christopher Shola Wordmark */}
        <Link
          to="/"
          aria-label="Christopher Shola Home"
          className="pointer-events-auto flex items-center transition-opacity duration-200 hover:opacity-80"
        >
          <span className="font-serif text-[18px] sm:text-[20px] font-normal tracking-[-0.02em] text-[#F3F3F4] whitespace-nowrap">
            Christopher Shola
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 md:gap-7 pointer-events-auto"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-baseline gap-1 text-[13.5px] font-sans font-normal tracking-[0.01em] transition-opacity duration-200 ${
                  isActive ? "text-[#F3F3F4] opacity-100" : "text-[#F3F3F4] opacity-75 hover:opacity-100"
                }`}
              >
                <span>{item.name}</span>
                <span className="text-[11px] font-sans font-light tracking-[0.08em] opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.num}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden pointer-events-auto flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
        >
          <span
            className={`block w-5 h-[1px] bg-[#F3F3F4] transition-transform duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1px] bg-[#F3F3F4] transition-transform duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </motion.header>

      {/* Mobile Fullscreen Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-[#010204] flex flex-col justify-center px-8 sm:px-12 md:hidden"
          >
            <nav className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-baseline gap-3 text-3xl font-serif text-[#F3F3F4] hover:opacity-75 transition-opacity"
                >
                  <span>{item.name}</span>
                  <span className="text-sm font-sans opacity-50 font-light tracking-widest">
                    {item.num}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
