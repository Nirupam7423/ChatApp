const { Socket } = require('dgram');
const express= require('express');
const http= require('http');
const app= express();
const server= http.createServer(app);

const Server= require('socket.io');

const io=  Server(server,{
    cors:{
        origin: 'http://localhost:3000',
        methods:["GET", "POST"],
        Credentials : true
    }
});

io.on("connection", (socket)=>{

    socket.on('join-room', (room)=>{
        socket.join(room);
        // console.log(`User with id ${socket.id} joined room ${room}`)
    })
    socket.on('user-message', (finalMessage)=>{
        // console.log('Message from Client ',finalMessage);
        socket.to(finalMessage.room).emit('server-message', finalMessage);
        // socket.emit('server-message', finalMessage);
    })
    socket.on("disconnect", () => {
        // console.log("User Disconnected", socket.id);
      });
    // console.log(socket.id);
})

server.listen(4001, ()=>{
    console.log('Server is running on port 4001')
})

