const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["delivered", "read"],
      default: "delivered",
    },
    emoji: [
      { emoji: String, originalUnified: String, names: Array, unified: String },
    ],
    message: { type: String, required: true },
    messageType: { type: String, required: true },
    chatRoomID: { type: String, required: true },
    sender: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      role: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    receiver: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      role: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
    replayMessage: {},
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", userSchema);
