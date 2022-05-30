const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 5001;
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

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
server.listen(port, () => {
  console.log("listening on *:5000");
});
