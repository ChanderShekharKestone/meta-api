const mongoose = require("mongoose");
const resourcetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stores",
    },
    storeName: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    iFrameURL: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    pdfURL: {
      type: String,
    },
    resDes: {
      type: String,
    },
    resTitle: {
      type: String,
    },
    resType: {
      type: String,
    },
    videoType: {
      type: String,
    },
    videoURL: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourcetSchema);
