const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gst: {
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

module.exports = mongoose.model("Vendor", vendorSchema);
