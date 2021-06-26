var uuid = require("uuid");

const chatMessages = [];

const addMessage = (room, message) => {
    const msg = { id: uuid.v4(), room, ...message };
    chatMessages.push(msg);
    return msg;
};

const removeMessage = (id) => {
    const index = chatMessages.findIndex(
        (message) => message.id === id
    );

    if (index !== -1) {
        return chatMessages.splice(index, 1)[0];
    }
};

const getMessage = (id) => {
    return chatMessages.find((message) => message.id === id);
}

const getMessagesInRoom = (room) => {
    return chatMessages.filter((message) => message.room === room);
}    

module.exports = { addMessage, removeMessage, getMessage, getMessagesInRoom };