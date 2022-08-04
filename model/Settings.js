const mongoose = require("mongoose");
const settingSchema = new mongoose.Schema(
  {
    globalSetting: {
      type: String,
      required: true,
    },
    newPageAutoAdd: {
      type: Boolean,
    },
    addCustomMenuOption: {
      type: Boolean,
    },
    defaultLandingPage: {
      type: Boolean,
    },
    githubLogin: {
      type: Boolean,
    },
    defaultPageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
    },
    defaultPageSlug: {
      type: String,
    },
    animationImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingSchema);
