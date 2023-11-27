import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@mui/material";
import { useState } from "react";

const AnnounceCard = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive((current) => !current);
  };
  return (
    <div className="announce-box">
      <div className="announceCard-content">
        <div
          className={
            isActive
              ? "inactive-announceContent hidden"
              : "inactive-announceContent"
          }
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
        <div className={ isActive ? "active-announceContent" :  "active-announceContent hidden" }>
          <Button onClick={handleClick}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default AnnounceCard;
