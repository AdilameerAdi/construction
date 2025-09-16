const mongoose = require("mongoose");

const technicalFileSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    activity: { type: String, required: true },
    name: { type: String, required: true }, // file name
    addedBy: { type: String, default: "Admin" },
    date: { type: String, required: true },
    url: { type: String, required: true }, // file URL or path
  },
  { timestamps: true }
);

module.exports = mongoose.model("TechnicalFile", technicalFileSchema);