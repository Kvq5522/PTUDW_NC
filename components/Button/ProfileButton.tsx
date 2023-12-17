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
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { resetUserInfo } from "@/redux/slices/user-info-slice";
import { resetClassroomInfo } from "@/redux/slices/classroom-info-slice";

interface ProfileButtonProps {
  className?: string;
  avatarSrc?: string;
}

export const ProfileButton: React.FC<ProfileButtonProps> = (
  props: ProfileButtonProps
) => {
  const dispatch = useDispatch<AppDispatch>();

  const signOutHandler = () => {
    localStorage.removeItem("access-token");
    window.location.href = "/";
    dispatch(resetUserInfo());
    dispatch(resetClassroomInfo());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={props.avatarSrc}
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>
            <Image src="/images/user-default-avatar.png" fill className="w-full h-full" alt="User Avatar" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard/user-info">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button onClick={signOutHandler}>Sign Out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
