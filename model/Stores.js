const mongoose = require("mongoose");
const storesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      unique: true,
      required: true,
    },
    storeAddress: {
      type: String,
    },
    logo: {
      type: String,
    },
    category: [
      {
        categoryName: {
          type: String,
        },
        categoryType: {
          type: String,
        },
        childCategory: {
          type: String,
        },
        subCategory: {
          type: String,
        },
      },
    ],
    branches: [
      {
        branchName: {
          type: String,
        },
        branchLat: {
          type: String,
        },
        branchLong: {
          type: String,
        },
        branchAdd: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stores", storesSchema);
