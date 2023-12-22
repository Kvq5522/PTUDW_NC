"use client";

import React, { useState } from "react";
import "@/Styles/stream-detail.css";

import { useParams } from "next/navigation";

import { RiFileListLine } from "react-icons/ri";
import { GrScorecard } from "react-icons/gr";
import { MoreVertical, Dot } from "lucide-react";

import { Button } from "@/components/ui/button";
import CommentArea from "@/components/CommentArea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StreamContentDetail = () => {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const params = useParams();

  const [itemType, setItemType] = useState("detail-material");
  const itemIcon =
    itemType === "grade-material" ? (
      <GrScorecard size={20} color="white" />
    ) : (
      <RiFileListLine size={20} color="white" />
    );

  return (
    <div className="stream-detail-container">
      <div className="stream-detail-icon">
        <Avatar className="h-[36px] w-[36px]">
          <AvatarImage className="object-cover" />
          <AvatarFallback className="bg-[#3e9e3e]">{itemIcon}</AvatarFallback>
        </Avatar>
      </div>
      <div className="stream-detail-main">
        <div className="stream-detail-content">
          <div className="stream-detail-header">
            <div className="stream-detail-label">
              <span>GA01 - Authentication (Dealine 10pm Jan 04)</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="detail-actions">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <MoreVertical />
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-30">
                  <DropdownMenuItem>Copy Link</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="stream-detail-sublabel">
              <div className="detail-creator">Lưu Minh Phát</div>
              <div className="mx-[0.25rem]">•</div>
              <div className="detail-daytime">Dec 21</div>
            </div>
          </div>
          {description === "" ? (
            <></>
          ) : (
            <>
              <div className="stream-detail-description">
                <span>{description}</span>
              </div>
            </>
          )}
        </div>
        <div className="stream-detail-files"></div>
        <div className="stream-detail-comment">
          <CommentArea />
        </div>
      </div>
    </div>
  );
};

export default StreamContentDetail;
