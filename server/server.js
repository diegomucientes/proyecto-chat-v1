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
    console.log("user ->", user);
    io.in(room).emit(USER_JOIN_CHAT_EVENT, user);

    /*
    socket.on('join',({name,room},callback)=>{
        if (!room) room = "global";

        console.log(name,room);
        const {error,user}=addUser({id:socket.id,name,room});

        if (error) return callback(error);

        socket.emit('message',{user:'admin',text:`${user.name}, welcome to the room ${user.room}`});

        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}, has joined`});
        socket.join(user.room);
    
        callback();
    });

    socket.on('sendMessage', (message,callback)=>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message',{user:user.name, text: message});
        callback();

    })

    socket.on('disconnect',()=>{
        console.log('User had left');
    });
    */
});

server.listen(PORT,()=>console.log(`Server has started on port ${PORT}`));
