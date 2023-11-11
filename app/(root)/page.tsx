import React from "react";
import Image from "next/image";
import HeroLandingPage from "@/components/Hero-section/HeroLandingPage";
import ContentLandingPage from "@/components/Content/ContentLandingPage";
import FeatureLandingPage from "@/components/Feature/FeatureLandingPage";

const page = () => {
  return (
    <main>
      <HeroLandingPage />
      <ContentLandingPage />
      <FeatureLandingPage />
    </main>
  );
};

export default page;
