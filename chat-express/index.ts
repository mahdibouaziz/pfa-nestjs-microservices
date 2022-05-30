import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 5000;
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
io.on("connection", (socket: any) => {
  console.log("connected");
  console.log(socket.id, "Has joined");
  socket.on("signin", (id: any) => {
    console.log("id: ", id);
    //
  });
});

// http part
server.listen(port, () => {
  console.log("listening on *:5000");
});
