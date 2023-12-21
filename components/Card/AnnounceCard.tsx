import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import AnnounceForm from "../Form/AnnounceForm";
import Image from "next/image";

import { useAppSelector } from "@/redux/store";

interface announceCardProps {
  isTeacher?: boolean;
}

const AnnounceCard = (props: announceCardProps) => {
  const [isActive, setIsActive] = useState(false);

  const avatar = useAppSelector(
    (state: any) => state.userInfoReducer.value?.userInfo?.avatar
  );

  const handleClick = () => {
    setIsActive((current) => !current);
    console.log(isActive);
  };

  return (
    <div className="announce-box">
      <div className="announceCard-content">
        <div
          className={"inactive-announceContent"}
          style={{ display: isActive ? "none" : "" }}
        >
          <div className="announce-avt">
            <Avatar className="h-[36px] w-[36px]">
              <AvatarImage src={avatar} className="object-cover" />
              <AvatarFallback>
                <Image
                  src="/images/user-default-avatar.png"
                  fill
                  className="w-full h-full"
                  alt="User Avatar"
                />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="iaAnnounce-text" onClick={handleClick}>
            Announce something to your class
          </div>
        </div>

        <div
          className={"active-announceContent"}
          style={{ display: isActive ? "" : "none" }}
        >
          <AnnounceForm onCancel={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default AnnounceCard;
