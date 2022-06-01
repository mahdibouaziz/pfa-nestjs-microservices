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

io.on("connection", (socket) => {
  const userid = socket.handshake.headers.userid;
  console.log("userrrr", userid);
  socket.join(userid);
  socket.on("private_message", (data) => {
    console.log(data);
    socket.to(userid).to(data.targetId).emit("private message", {
      content: data.message,
      from: userid,
      to: data.targetId,
    });
  });
});

// http part
server.listen(port, async () => {
  await mongoose.connect(mongoURI);
  console.log("connected to the DB");
  console.log("listening on PORT 5000");
});
