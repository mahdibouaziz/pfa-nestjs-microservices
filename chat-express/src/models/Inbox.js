const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema({
  userId: { type: mongoose.ObjectId, required: true },
  senderId: { type: mongoose.ObjectId, required: true },
  lastMessage: { type: String, required: true },
  seen: { type: Boolean, required: true },
  unseenNumbers: { type: Number, required: true },
});

const Inbox = mongoose.model("Inbox", inboxSchema);

module.exports = Inbox;
