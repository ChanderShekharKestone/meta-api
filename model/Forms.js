const mongoose = require("mongoose");
const formsSchema = new mongoose.Schema(
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
    formName: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
    },
    formData: [
      {
        fieldId: {
          type: String,
        },
        isRequired: {
          type: Boolean,
        },
        label: {
          type: String,
        },
        type: {
          type: String,
        },
        formColumn: {
          type: String,
        },
        options: [
          {
            opId: {
              type: String,
            },
            opLabel: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Forms", formsSchema);
