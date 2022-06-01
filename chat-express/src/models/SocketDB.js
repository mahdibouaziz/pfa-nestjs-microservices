const mongoose = require("mongoose");

const socketDBSchema = new mongoose.Schema({
  userId: { type: mongoose.ObjectId, required: true },
  socketId: { type: String, required: true },
});

const SocketDB = mongoose.model("SocketDB", socketDBSchema);

module.exports = SocketDB;
