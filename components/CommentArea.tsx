import React, { useState } from 'react'

const CommentArea = () => {
  const [dmCount, setDmCount] = useState();
  const [commentItems, setCommentItems] = useState([]);
  
  return (
    <div className="comment-container">
      <div className='comment-count'></div>
      <div className='comment-show'></div>
      <div className="comment-box"></div>
    </div>
  )
}

export default CommentArea
