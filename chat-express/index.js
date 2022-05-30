const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5001;
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

//DB
const mongoURI = `mongodb+srv://mahdi:mahdi123@cluster0.jltg5.mongodb.net/chat-express?retryWrites=true&w=majority`;

// middlewares
dotenv.config();
app.use(express.json());
app.use(cors());

// socket io part
io.on("connection", (socket) => {
  console.log("connected");
  console.log(socket.id, "Has joined");
  socket.on("signin", (id) => {
    console.log("id: ", id);
    //
  });
});

// http part
server.listen(port, async () => {
  await mongoose.connect(mongoURI);
  console.log("connected to the DB");
  console.log("listening on PORT 5000");
});
