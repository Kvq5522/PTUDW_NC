import React, { useState } from "react";

import { Send, Users } from "lucide-react";

const CommentArea = () => {
  const [dmCount, setDmCount] = useState();
  const [commentItems, setCommentItems] = useState([]);

  return (
    <div className="comment-container">
      {commentItems.length === 0 ? (
        <></>
      ) : (
        <>
          <div className="comment-count">
            <Users />
            {commentItems.length}
            class comment
          </div>
          <div className="comment-show"></div>
        </>
      )}

      <div className="comment-box"></div>
    </div>
  );
};

export default CommentArea;
