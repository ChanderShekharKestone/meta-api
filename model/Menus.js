const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    target: {
      type: String,
    },
    iconName: {
      type: String,
      required: true,
    },
    rid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menus", menuSchema);
