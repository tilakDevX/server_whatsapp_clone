const { createServer } =require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
const { userRouter } = require("./routes/UserRoute");

const app = express();
app.use(express.json());
app.use(cors());


app.use("/user", userRouter);


const httpServer = createServer(app); // Use the 'express' app for the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://ui-whatsapp-clone.netlify.app/"],
  },
});

let users = [];

const addUser = (userData, socketId) => {
  !users.some((user) => user.sub === userData.sub) &&
    users.push({ ...userData, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.sub === userId);
};

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("addUser", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users); // Notify clients about updated user list
  });

  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);
    if(user){

      io.to(user.socketId).emit("getMessage", data);
    }else{
      console.log("User not found.");
    }
  });
});

const PORT = process.env.PORT || 8500;

connection.once("open", () => {
  console.log("Successfully connected to db.");

  httpServer.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
});

connection.on("error", (error) => {
  console.error("Error connecting to db:", error);
});
