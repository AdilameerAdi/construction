const mongoose = require("mongoose");

const legalFileSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  name: { type: String, required: true },
  addedBy: { type: String, default: "Admin" },
  date: { type: String, required: true }, // store formatted date
  url: { type: String, required: true }   // for now local upload URL, later can use Cloudinary, S3 etc.
});

module.exports = mongoose.model("LegalFile", legalFileSchema);