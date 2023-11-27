"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./button";

interface ProfileButtonProps {
  className?: string;
  avatarSrc?: string;
}

const signOutHandler = () => {
  localStorage.removeItem("access-token");
  window.location.href = "/";
};

export const ProfileButton: React.FC<ProfileButtonProps> = (
  props: ProfileButtonProps
) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={props.avatarSrc ?? "https://github.com/shadcn.png"}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="dashboard/user-info">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={signOutHandler}
          >
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
