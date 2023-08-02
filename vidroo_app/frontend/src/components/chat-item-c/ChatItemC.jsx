import React from "react";
import "./ChatItemC.scss";

const ChatItemC = ({ children, username, other }) => {
  return (
    <div className={`chat-item-c ${other ? "chat-item-c--other" : ""}`}>
      <span className="chat-item-c__username">{username}</span>

      <p className="chat-item-c__txt">{children}</p>
    </div>
  );
};

export default ChatItemC;
