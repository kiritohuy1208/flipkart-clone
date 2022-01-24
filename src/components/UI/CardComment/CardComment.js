import React from "react";
import { IoIosStar } from "react-icons/io";
import "./style.css";
const CardComment = (props) => {
  return (
    <div>
      <div className="CardCommentCtn">
        <div className="headerComment">
          <span className="ratingCount">
            4.3 <IoIosStar />
          </span>
          <span className="userNameSpan"> {props.userName}</span>
        </div>
        <div className="comment">{props.comment}</div>
      </div>
    </div>
  );
};

export default CardComment;
