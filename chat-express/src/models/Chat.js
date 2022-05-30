const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  senderId: { type: mongoose.ObjectId, required: true },
  receiverId: { type: mongoose.ObjectId, required: true },
  timestamp: { type: String, required: true },
  message: { type: String, required: true },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
