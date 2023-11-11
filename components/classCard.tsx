import { IconButton } from "@mui/material";
import { AssignmentIndOutlined, FolderOpenOutlined } from "@mui/icons-material";
import React from "react";
// import { useHistory } from "react-router-dom";
import "@/Styles/classCard.css";

function ClassCard() {
  //   const history = useHistory();
  //   const goToClass = () => {
  //     history.push(`/class/${id}`);
  //   };
  return (
    <div className="classCard">
      <div className="classCard__upper">
        <div className="classCard__className">20KTPM02</div>
        <div className="classCard__creatorName">Huy Ha</div>
        <img className="classCard__creatorPhoto" />
      </div>
      <div className="classCard__middle"></div>
      <div className="classCard__lower">
        <IconButton>
          <FolderOpenOutlined />
        </IconButton>
        <IconButton>
          <AssignmentIndOutlined />
        </IconButton>
      </div>
    </div>
  );
}
export default ClassCard;
