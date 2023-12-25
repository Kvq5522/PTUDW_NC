"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ProfileButton } from "../Button/ProfileButton";

import {
  Barcode,
  LayoutDashboard,
  Menu,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { useSidebarContext } from "../Contexts/SideBarContext";
import { useAppSelector } from "@/redux/store";
import { useCreateClassModal } from "@/hooks/create-class-modal";
import { useJoinClassModal } from "@/hooks/join-class-modal";
import CreateClassModal from "../Modal/CreateClassModal";
import JoinClassModal from "../Modal/JoinClassModal";
import { Icon } from "@mui/material";

type PageNavbarSectionProps = {
  hidden?: boolean;
};

const Navbar = () => {
  const isAdmin = true;
  const [user, isUser] = useState(false);
  const createClassModal = useCreateClassModal();
  const joinClassModal = useJoinClassModal();
  const avatar = useAppSelector(
    (state: any) => state.userInfoReducer.value?.userInfo?.avatar
  );

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <CreateClassModal />
      <JoinClassModal />
      <FirstNavbarSection />

      <div className="flex flex-shrink-0 md:gap-2 justify-end ">
        {isAdmin ? (
          <Link
            href="/admin"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded flex cursor-default select-none items-center text-sm outline-none focus:bg-accent data-[state=open]:bg-accent"
          >
            <ShieldCheck />
            Admin
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded flex cursor-default select-none items-center text-sm outline-none focus:bg-accent data-[state=open]:bg-accent"
          >
            <LayoutDashboard />
            Dashboard
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Plus />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => joinClassModal.onOpen()}>
              Join a class
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => createClassModal.onOpen()}>
              Create a class
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ProfileButton avatarSrc={avatar} />
      </div>
    </div>
  );
};

export function FirstNavbarSection({ hidden }: PageNavbarSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div className="flex gap-4 items-center flex-shrink-0">
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <Link href="/dashboard">
        <Logo />
      </Link>
    </div>
  );
}

export default Navbar;
