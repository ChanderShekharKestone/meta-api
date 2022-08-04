const mongoose = require("mongoose");
const submissionsSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Forms",
    },
    formName: {
      type: String,
    },
    formData: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submissions", submissionsSchema);
