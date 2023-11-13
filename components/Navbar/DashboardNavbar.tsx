import React from "react";
import Logo from "./Logo";

import ProfileButton from "../ui/ProfileButton";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 border-b">
      <Logo />
      <ProfileButton />
    </div>
  );
};

export default Navbar;
