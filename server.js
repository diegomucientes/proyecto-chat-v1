const express = require('express');
const socketio = require ('socket.io');
const http = require ('http');


const {addUser,removeUser,getUser,getUsersInRoom} = require ('./server/users');

const PORT=process.env.PORT || 5000;
const router=require('./router');


const app = express();
const server = http.createServer(app);
const io = socketio(server);


io.on('connection',(socket)=>{
    socket.on('join',({name,room},callback)=>{
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
});

app.use(router);

server.listen(PORT,()=>console.log(`Server has started on port ${PORT}`));


// const cors = require('cors');
// require('dotenv').config(); 

// const cookieParser = require('cookie-parser');

// app.use(cookieParser());
 
// require('./server/config/connectMongo')(); 
 
// app.use(cors());


// if (process.env.NODE_ENV !== 'production') {
//   const allowCrossDomain = (req, res) => {
//       res.header('Access-Control-Allow-Origin', '*');
//       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//       res.header(
//           'Access-Control-Allow-Headers',
//           'Origin, X-Requested-With, Content-Type, Accept, Cache-Control',
//       );

//       app.use(allowCrossDomain);
//   };
// // }

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// require('./server/routes/user.routes')(app);
