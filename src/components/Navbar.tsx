import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Clock from "@/components/Clock";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", num: "(1)", path: "/" },
    { name: "About", num: "(2)", path: "/about" },
    { name: "Work", num: "(3)", path: "/work" },
    { name: "Join", num: "(4)", path: "/join" },
  ];

  return (
    <>
      {/* Animated slide down on entry */}
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 md:px-8 md:py-5 bg-black"
      >
        {/* Top-Left Clock & Home Link */}
        <div className="flex items-center">
          <Link
            to="/"
            aria-label="Home"
            title="Home"
            className="group flex items-center select-none"
          >
            <Clock className="font-sans text-[13.5px] font-normal tracking-[0.01em] text-[#F3F3F4] opacity-75 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 md:gap-7"
        >
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === "/work" && location.pathname === "/research");
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
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
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
            className="fixed inset-0 z-30 bg-black flex flex-col justify-center px-8 sm:px-12 md:hidden"
          >
            <nav className="flex flex-col space-y-8">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === "/work" && location.pathname === "/research");
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-baseline gap-3 text-3xl font-serif text-[#F3F3F4] transition-opacity ${
                      isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-sm font-sans opacity-50 font-light tracking-widest">
                      {item.num}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
