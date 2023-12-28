import React from "react";
import Logo from "./Logo";
import ActionButton from "./action-button";

const LandingPageDashboard = () => {
  return (
    <div className="flex justify-between items-center py-2 px-10 border-b">
      <Logo />
      <ActionButton />
    </div>
  );
};

export default LandingPageDashboard;
