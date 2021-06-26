import React from "react";

const FormSendMessage = ({
    newMessage,
    handleNewMessageChange,
    //handleStartTyping,
    //handleStopTyping,
    handleSendMessage,
  }) => {
    return (
      <form className="send-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Aa"
          className="send-message-input"
          //onKeyPress={handleStartTyping}
          //onKeyUp={handleStopTyping}
        />
        <button
          type="submit"
          onClick={handleSendMessage}
          className="send-message-button"
        >
          Send
        </button>
      </form>
    );
  };
  
  export default FormSendMessage;