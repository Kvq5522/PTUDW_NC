import React, { useState } from "react";

import { Send, Users } from "lucide-react";
import { Input } from "./ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

const CommentArea = () => {
  const [dmCount, setDmCount] = useState();
  const [commentItems, setCommentItems] = useState([]);

  return (
    <div className="comment-container">
      <div className="comment-count">
        <Users className="h-5 w-5" />
        {commentItems.length === 0 ? <></> : <>commentItems.length</>}
        class comment
      </div>

      {commentItems.length === 0 ? (
        <></>
      ) : (
        <>
          <div className="comment-show"></div>
        </>
      )}
      <div className="comment-show"></div>

      <div className="comment-box">
        <div className="comment-box-wrapper">
          <Avatar className="h-[2rem] w-[2rem] cmtbavt">
            <AvatarImage className="object-cover" />
            <AvatarFallback className=" bg-[#3e9e3e]"></AvatarFallback>
          </Avatar>
          <Input placeholder="Add class comment ..." className="comment-chatbox" />
          <Button variant="ghost" size="icon" className="chatbox-send">
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentArea;
