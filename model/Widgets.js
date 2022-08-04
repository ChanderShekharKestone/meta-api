const mongoose = require("mongoose");
const widgetSchema = new mongoose.Schema(
  {
    globalWidgets: {
      type: String,
      required: true,
    },
    chat: {
      type: Boolean,
    },
    photoOp: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Widgets", widgetSchema);
