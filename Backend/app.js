const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
require("dotenv").config();

const Server = require("socket.io");

const io = Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    Credentials: true,
  },
});
const Message = require("./model/Message");
const AppDataSource = require("./db/userConnection");
const MessageRepository = AppDataSource.getRepository(Message);

io.on("connection", (socket) => {
  socket.on("join-room", async (room) => {
    socket.join(room);

    // Fetch message history for the room and send to the user who just joined
    try {
      const messageHistory = await MessageRepository.find({
        where: { room },
        order: { timestamp: "ASC" }, // Order messages chronologically
      });

      // Emit message history to the newly joined user only
      socket.emit("message-history", messageHistory);
    } catch (error) {
      console.error("Error fetching message history:", error);
    }
  });
  socket.on("user-message", async (finalMessage) => {
    try {
      // Save the message to the database
      const message = MessageRepository.create({
        room: finalMessage.room,
        user_id: finalMessage.name,
        message: finalMessage.message,
      });

      await MessageRepository.save(message);

      // Emit the saved message to everyone in the room
      io.to(finalMessage.room).emit("server-message", finalMessage);
    } catch (error) {
      console.error("Error saving message to the database:", error);
    }
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
  // console.log(socket.id);
});

server.listen(4001, () => {
  console.log("Server is running on port 4001");
});
