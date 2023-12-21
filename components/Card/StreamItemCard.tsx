import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RiFileListLine } from "react-icons/ri";
import { GrScorecard } from "react-icons/gr";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";

interface streamItemCardProps {
  itemType: string;
}

const StreamItemCard = (props: streamItemCardProps) => {
  const itemIcon =
    props.itemType === "grade-material" ? (
      <GrScorecard size={20} color="white" />
    ) : (
      <RiFileListLine size={20} color="white" />
    );
  const linkTo =
    props.itemType === "grade-material" ? "/grade" : "/stream-detail";
  return (
    <div className="announce-box-  hover:bg-[#e6f4ea]">
      <div className="announceCard-content">
        <Link href={linkTo} className="h-full w-full">
          <div className="announce-main">
            <div className="announce-avt">
              <Avatar className="h-[36px] w-[36px]">
                <AvatarImage className="object-cover" />
                <AvatarFallback className=" bg-[#3e9e3e]">
                  {itemIcon}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="announce-txt">
              <div className="announce-content">
                announce-actionsKhánh Nguyễn Huy posted a new material: Midterm
                project Deadline Nov 15 10pm
              </div>
              <div className="daytime-created">Dec 21</div>
            </div>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="announce-actions">
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30">
            <DropdownMenuItem>
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="announce-comments hover:underline">
        <span className="ml-[1.3rem]">1 class comments</span>
      </div>
    </div>
  );
};

export default StreamItemCard;
