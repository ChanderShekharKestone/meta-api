const mongoose = require("mongoose");
const pageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    newPageAutoAdd: {
      type: Boolean,
      required: true,
    },
    sceneData: [
      {
        id: {
          type: String,
          required: true,
        },
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
        image: {
          type: String,
          required: true,
        },
        sceneName: {
          type: String,
          required: true,
        },
        hfov: {
          type: Number,
          required: true,
        },
        pitch: {
          type: Number,
          required: true,
        },
        yaw: {
          type: Number,
          required: true,
        },
        hotSpots: [
          {
            id: {
              type: String,
              required: true,
            },
            name: {
              type: String,
            },
            pitch: {
              type: Number,
              required: true,
            },
            rotate: {
              type: String,
            },
            target: {
              type: String,
            },
            targetDescription: {
              type: String,
            },
            targetType: {
              type: String,
            },
            type: {
              type: String,
              required: true,
            },
            embedSceneId: {
              type: String,
            },
            pos: {
              type: String,
            },
            yaw: {
              type: Number,
              required: true,
            },
            draggable: {
              type: Boolean,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
