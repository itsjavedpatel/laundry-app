const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const universityRouter = require("./routes/universityRoutes");
const studentRouter = require("./routes/studentRoutes");

// import server from socket.io
const { Server } = require("socket.io");

const app = express();
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
//? store io for reuse
global.io = io;

// Allow frontend request
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// parse JSON requests
app.use(express.json());
// using cookie parser middleware
app.use(cookieParser());

//! Implement socket connections
io.on("connection", (socket) => {
  console.log("⚡ Socket connected:", socket.id);

  socket.on("join", ({ userId }) => {
    if (userId) {
      socket.join(userId); // Join room with user ID
      console.log(`User ${userId} joined their room`);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// create PORT
app.get("/", (req, res) => {
  res.send("Hello");
});
const PORT = process.env.PORT || 3000;
//? middleware:passing form data
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
    console.log("Db connected succesfully");
  })
  .catch((error) => {
    console.log("Db is not connected", error);
  });

app.use("/auth", authRouter);
app.use("/university", universityRouter);
app.use("/student", studentRouter);
