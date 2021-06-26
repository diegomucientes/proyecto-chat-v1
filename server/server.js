require('dotenv').config();

const express = require('express');
const cors = require("cors");
const http = require ('http');

const socketio = require ('socket.io');

const {addUser,removeUser,getUser,getUsersInRoom} = require ('./chat/users');
const { addMessage, getMessagesInRoom } = require("./chat/messages");
const router=require('./router');

const PORT=process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(router);

const server = http.createServer(app);
//const io = socketio(server);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

io.on('connection',(socket)=>{
    console.log(`${socket.id} connected`);

    // Join a conversation
    const { room, name, picture } = socket.handshake.query;
    socket.join(room);

    const user = addUser(socket.id, room, name, picture);
    //console.log("user ->", user);
    io.in(room).emit(USER_JOIN_CHAT_EVENT, user);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        const message = addMessage(room, data);
        io.in(room).emit(NEW_CHAT_MESSAGE_EVENT, message);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.in(room).emit(USER_LEAVE_CHAT_EVENT, user);
        socket.leave(room);
    });
    
});

server.listen(PORT,()=>console.log(`Server has started on port ${PORT}`));
