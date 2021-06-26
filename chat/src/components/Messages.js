import React from "react";
import Avatar from "../components/Avatar";

const Messages = ({ message }) => {
  return (
    <div
      className={`message-item ${
        message.currentUser ? "my-message" : "received-message"
      }`}
    >
      {!message.currentUser && (
        <div className="message-avatar-container">
          <Avatar user={message.user}></Avatar>
        </div>
      )}

      <div className="message-body-container">
        {!message.currentUser && (
          <div className="message-user-name">{message.user.name}</div>
        )}
        <div className="message-body">{message.body}</div>
      </div>
    </div>
  );
};

export default Messages;
