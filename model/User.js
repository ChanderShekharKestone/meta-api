const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
    },
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    age: {
      type: Number,
      required: true,
      min: 14,
      max: 199,
    },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
