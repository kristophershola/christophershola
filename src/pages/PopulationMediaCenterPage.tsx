import React from "react";
import { Navigate } from "react-router-dom";
import { getCaseStudy } from "@/data/caseStudies";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import usePageMeta from "@/lib/usePageMeta";

export const PopulationMediaCenterPage: React.FC = () => {
  const study = getCaseStudy("population-media-center");

  if (!study) {
    return <Navigate to="/work" replace />;
  }

  return <PopulationMediaCenterContent study={study} />;
};

interface ContentProps {
  study: NonNullable<ReturnType<typeof getCaseStudy>>;
}

const PopulationMediaCenterContent: React.FC<ContentProps> = ({ study }) => {
  usePageMeta(
    "Population Media Center Case Study | Christopher Shola",
    study.metaDescription
  );

  return <CaseStudyLayout study={study} />;
};

export default PopulationMediaCenterPage;
