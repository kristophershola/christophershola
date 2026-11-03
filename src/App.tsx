import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import WorkPage from "@/pages/WorkPage";
import InquiriesPage from "@/pages/InquiriesPage";
import GhostyRevealCard from "@/components/ghosty-reveal/card";

// Scroll restoration helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "";

  return (
    <div className="relative isolate min-h-screen w-full bg-[#191817] text-[#F3F3F4]">
      <ScrollToTop />

      {/* Ambient Ghosty Reveal Background */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700 ease-out ${
          isHome ? "opacity-85" : "opacity-35"
        }`}
        aria-hidden="true"
      >
        <GhostyRevealCard className="w-full h-full" />
      </div>

      {/* Foreground Routes Layer */}
      <div className="relative z-10 min-h-screen w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/research" element={<WorkPage />} />
          <Route path="/inquiries" element={<InquiriesPage />} />
          <Route path="/join" element={<InquiriesPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
