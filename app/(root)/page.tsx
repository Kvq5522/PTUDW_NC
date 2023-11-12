import React from "react";
import Image from "next/image";
import LandingPageDashboard from "@/components/Navbar/LandingPageDashboard";
import FirstSection from "@/components/first-section/page";

const page = () => {
  return (
    <main>
      <LandingPageDashboard />
      <FirstSection />
    </main>
  );
};

export default page;
