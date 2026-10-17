import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ResearchPage from "@/pages/ResearchPage";
import JoinPage from "@/pages/JoinPage";

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
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
