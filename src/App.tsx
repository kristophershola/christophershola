import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import WorkPage from "@/pages/WorkPage";
import InquiriesPage from "@/pages/InquiriesPage";
import HoneyEmberBackgroundDemo from "@/pages/HoneyEmberBackgroundDemo";
import { HoneyEmberBackground } from "@/components/ui/honey-ember-background";

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
    <HoneyEmberBackground className="min-h-screen w-full">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/research" element={<WorkPage />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
        <Route path="/join" element={<InquiriesPage />} />
        <Route path="/demo" element={<HoneyEmberBackgroundDemo />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </HoneyEmberBackground>
  );
};

export default App;
