import React, { useEffect, useState } from "react";

import "../chat.css";

import ChatUser from "../components/ChatUser";
import Avatar from "../components/Avatar";
import Messages from "../components/Messages";
import FormSendMessage from "../components/FormSendMessage";

const Chat = (props) => {
    const { room = "global" } = props;
    const [newMessage, setNewMessage] = useState("");

    const {
        user,
        users,
        messages,
        sendMessage,
    } = ChatUser(room);

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        //cancelTyping();
        sendMessage(newMessage);
        setNewMessage("");
    };

    return (
        <main className="chat-wrapper">
            <section>
                <div className="chat-top-bar">
                    {/* <h1 className="room-name">Room: {room}</h1> */}
                    {user && <Avatar user={user}></Avatar>}
                </div>
                {/* <Users users={users}></Users> */}
                <div className="messages-container">
                    <ol className="messages-list">
                        {messages.map((message, i) => (
                            <li key={i}>
                                <Messages message={message}></Messages>
                            </li>
                        ))}

                        {/* {typingUsers.map((user, i) => (
                        <li key={messages.length + i}>
                            <TypingMessage user={user}></TypingMessage>
                        </li>
                    ))} */}

                    </ol>
                </div>
                <FormSendMessage
                    newMessage={newMessage}
                    handleNewMessageChange={handleNewMessageChange}
                    //handleStartTyping={startTyping}
                    //handleStopTyping={stopTyping}
                    handleSendMessage={handleSendMessage}
                ></FormSendMessage>
            </section>
        </main>
    );
};

export default Chat;