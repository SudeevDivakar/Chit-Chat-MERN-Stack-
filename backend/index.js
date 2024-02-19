//Require Express
const express = require("express");

//Require mongoose
const mongoose = require("mongoose");

//Require environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

//Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DATABASE CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("ERROR IN DATABASE CONNECTION", err);
  });

//Require cors
const cors = require("cors");

//Require Routes
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

//Start Express App
const app = express();

//Configure middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/user", userRoutes);

app.use("/chat", chatRoutes);

app.use("/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

//Start Express server
const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chats.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
