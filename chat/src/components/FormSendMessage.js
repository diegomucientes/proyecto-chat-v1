import React from "react";
import 'font-awesome/css/font-awesome.min.css';

const FormSendMessage = ({
    newMessage,
    handleNewMessageChange,
    //handleStartTyping,
    //handleStopTyping,
    handleSendMessage,
}) => {
    return (
        <div className="send-message-form">
            <form className="">
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Write a message..."
                    className="send-message-input"
                //onKeyPress={handleStartTyping}
                //onKeyUp={handleStopTyping}
                />
                <button
                    type="submit"
                    onClick={handleSendMessage}
                    className="send-message-button"
                >
                    <i className="fa fa-paper-plane"></i>
                </button>
            </form>
        </div>

    );
};

export default FormSendMessage;