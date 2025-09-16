const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    fullName: { type: String, required: true },
    contactNo: { type: String, required: true },
    visitDate: { type: Date },
    nextVisit: { type: Date },
    note: { type: String },
    leadType: {
      type: String,
      enum: ["Cold", "Warm", "Hot", ""],
      default: "",
    },
    isConverted: { type: Boolean, default: false },

    // Extra fields if converted to customer
    aadharNo: { type: String },
    address: { type: String },
    unitNo: { type: String },
    amount: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
