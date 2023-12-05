"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ProfileButton } from "../ui/ProfileButton";

import { Barcode, Menu, Plus } from "lucide-react";
import { useSidebarContext } from "../Contexts/SideBarContext";
import { useAppSelector } from "@/redux/store";

type PageNavbarSectionProps = {
  hidden?: boolean;
};

const Navbar = () => {
  const avatar = useAppSelector(
    (state: any) => state.userInfoReducer.value?.userInfo?.avatar
  );

  return (
    <div className="flex gap-10 lg:gap20 justify-between pt-2 mb-6 mx-4">
      <FirstNabarSection />
      <div className="flex flex-shrink-0 md:gap-2 justify-end">
        <Button size="icon" variant="ghost">
          <Plus />
        </Button>
        <Button size="icon" variant="ghost">
          <Barcode />
        </Button>

        <ProfileButton avatarSrc={avatar} />
      </div>
    </div>
    // <div className="flex gap-10 lg:gap20 justify-between items-center px-10 border-b">
    //   <Logo />
    //   <ProfileButton avatarSrc={avatar} />
    // </div>
  );
};

export function FirstNabarSection({ hidden }: PageNavbarSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div className="flex gap-4 items-center flex-shrink-0">
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <Link href="/">
        <Logo />
      </Link>
    </div>
  );
}

export default Navbar;
