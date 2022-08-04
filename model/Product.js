const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
      unique: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stores",
    },
    categoryName: {
      type: String,
    },
    categoryType: {
      type: String,
    },
    childCategory: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    fullDescription: {
      type: String,
    },
    images: [
      {
        path: {
          type: String,
          required: true,
        },
        isCover: {
          type: Boolean,
          required: true,
        },
      },
    ],
    isActive: {
      type: Boolean,
    },
    price: {
      type: Number,
    },
    product3d: {
      type: String,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stores",
    },
    storeName: {
      type: String,
    },
    subCategory: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
