import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AnnounceForm from "../Form/AnnounceForm";
import { ArrowLeftRight } from "lucide-react";

interface announceCardProps {
  isTeacher?: boolean;
}

const AnnounceCard = (props: announceCardProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  return (
    <div className="announce-box">
      <div className="announceCard-content">
        <div
          className={"inactive-announceContent " + (isActive ? "hidden" : "")}
        >
          <div className="announce-avt">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="iaAnnounce-text" onClick={handleClick}>
            Announce something to your class
          </div>
        </div>

        <div
          className={
            isActive
              ? "active-announceContent"
              : "active-announceContent hidden"
          }
        >
          <AnnounceForm onCancel={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default AnnounceCard;
