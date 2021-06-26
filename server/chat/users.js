const chatUsers = [];

const addUser = (id, room, name, picture) => {
    if (!name || !room) return { error: "Username and room are required." };

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = chatUsers.find(
        (user) => user.room === room && user.name === name
    );
    if (existingUser) {
        return { error: 'Username is already exist' }
    }

    const user = { id, room, name, picture };
    chatUsers.push(user);
    
    return { user };
    //return { id, name: user.name, picture: user.picture };
};

const removeUser = (id) => {
    const index = chatUsers.findIndex((user) => user.id === id);
    if (index !== -1) {
        return chatUsers.splice(index, 1)[0];
    }
};

const getUser = (id) => {
    return chatUsers.find(
        (user) => user.id === id
    );
};

const getUsersInRoom = (room) => {
    return chatUsers.filter((user) => {
        user.room === room;
    });
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };