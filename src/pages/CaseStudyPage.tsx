import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { getCaseStudy } from "@/data/caseStudies";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import usePageMeta from "@/lib/usePageMeta";

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;

  // Review Focus check: direct navigation to unknown or unpublished slug redirects to /work
  if (!study || !study.published) {
    return <Navigate to="/work" replace />;
  }

  return <CaseStudyContent study={study} />;
};

interface CaseStudyContentProps {
  study: NonNullable<ReturnType<typeof getCaseStudy>>;
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ study }) => {
  usePageMeta(`${study.title} | Christopher Shola`, study.metaDescription);

  return <CaseStudyLayout study={study} />;
};

export default CaseStudyPage;
