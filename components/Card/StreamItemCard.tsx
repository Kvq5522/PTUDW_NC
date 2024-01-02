import React, { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RiFileListLine } from "react-icons/ri";
import { GrScorecard } from "react-icons/gr";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { useCommentModal } from "@/hooks/comment-modal";
import CommentModal from "../Modal/CommentModal";

interface streamItemCardProps {
  idCard: number;
  itemType: string;
  title: string;
  createdAt: string;
  commentCount: number;
  classroomId: number;
  onOpenComment: (cid:number, iid:number, itype:string) => void;
}

const StreamItemCard = (props: streamItemCardProps) => {
  const linkTo =
    props.itemType === "GRADE_REVIEW"
      ? `/classroom/${props.classroomId}/stream/${props.idCard}/stream-detail`
      : props.itemType === "GRADE_ANNOUNCEMENT"
      ? `/classroom/${props.classroomId}/grade/transcript`
      : "";
  const [isOpen, setIsOpen] = useState(false);
  const commentModal = useCommentModal();
  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className="announce-box-  hover:bg-[#e6f4ea]">
      <div className="announceCard-content">
        <Link href={linkTo} className="h-full w-full">
          <div className="announce-main">
            <div className="announce-avt">
              <Avatar className="h-[36px] w-[36px]">
                <AvatarImage className="object-cover" />
                <AvatarFallback className=" bg-[#3e9e3e]">
                  {(() => {
                    switch (props.itemType) {
                      case "GRADE_REVIEW":
                        return <GrScorecard size={20} color="white" />;
                      case "GRADE_ANNOUNCEMENT":
                        return <RiFileListLine size={20} color="white" />;
                      default:
                        return null;
                    }
                  })()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="announce-txt">
              <div className="announce-content">{props.title}</div>
              <div className="daytime-created">
                {new Date(props.createdAt).toDateString()}
              </div>
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
            <DropdownMenuItem onClick={handleOpenDialog}>
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {props.commentCount === 0 ? (
        <></>
      ) : (
        <>
          <div
            className="announce-comments hover:underline"
            onClick={() => props.onOpenComment(props.classroomId, props.idCard, props.itemType)}
          >
            <span className="ml-[1.3rem]">
              {props.commentCount} class comments
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default StreamItemCard;
