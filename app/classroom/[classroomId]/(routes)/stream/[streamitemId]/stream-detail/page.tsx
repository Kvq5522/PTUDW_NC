import React from "react";
import "@/Styles/stream-detail.css";

import { RiFileListLine } from "react-icons/ri";
import { GrScorecard } from "react-icons/gr";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface streamDetailProps {
  classID: string;
  itemId: string;
  itemType: string;
}

const StreamContentDetail = (props: streamDetailProps) => {
  const itemIcon =
    props.itemType === "grade-material" ? (
      <GrScorecard size={20} color="white" />
    ) : (
      <RiFileListLine size={20} color="white" />
    );

  return (
    <div className="stream-detail-container">
      <div className="stream-detail-icon">
        <Avatar className="h-[36px] w-[36px]">
          <AvatarImage className="object-cover" />
          <AvatarFallback className=" bg-[#3e9e3e]">{itemIcon}</AvatarFallback>
        </Avatar>
        ;
      </div>
      <div className="stream-detail-main">
        <div className="stream-detail-content"></div>
        <div className="stream-detail-files"></div>
        <div className="stream-detail-comment"></div>
      </div>
    </div>
  );
};

export default StreamContentDetail;
