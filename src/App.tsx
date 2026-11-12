import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import WorkPage from "@/pages/WorkPage";
import InquiriesPage from "@/pages/InquiriesPage";
import PopulationMediaCenterPage from "@/pages/PopulationMediaCenterPage";

// Scroll restoration helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  return (
    <div className="relative isolate min-h-screen w-full bg-[#191817] text-[#F3F3F4]">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/population-media-center" element={<PopulationMediaCenterPage />} />
        <Route path="/research" element={<WorkPage />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
        <Route path="/join" element={<InquiriesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
