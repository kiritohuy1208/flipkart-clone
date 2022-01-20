import React from "react";
import { IoIosSend } from "react-icons/io";
import "./style.css";
const Newsletter = () => {
  return (
    <div>
      <div className="ctnNewsletter">
        <h1>Newsletter</h1>
        <span>Get timely update your favorite products</span>
        <div className="inputCtn">
          <input placeholder="Your email"></input>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
