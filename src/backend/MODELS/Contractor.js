const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema(
  {
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    pan: {
      type: String,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    bank: {
      type: String,
      trim: true,
    },
    accountNo: {
      type: String,
      trim: true,
    },
    ifsc: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contractor", contractorSchema);
