import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { GrScorecard } from "react-icons/gr";

const StreamCardtoGrade = () => {
  const avatar = useAppSelector(
    (state: any) => state.userInfoReducer.value?.userInfo?.avatar
  );

  return (
    <div className="announce-box">
      <div className="announceCard-content">
        <Link href="/grade" className="h-full w-full">
          <div className="announce-main">
            <div className="announce-avt">
              <Avatar className="h-[36px] w-[36px]">
                <AvatarImage className="object-cover" />
                <AvatarFallback className=" bg-[#3e9e3e]">
                  <GrScorecard size={20} color="white" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="announce-content">
              <div className="daytime-created"></div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StreamCardtoGrade;
