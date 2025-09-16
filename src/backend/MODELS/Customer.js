const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  datetime: { type: Date, required: true },
  fullName: { type: String, required: true },
  primaryContact: { type: String, required: true },
  secondaryContact: { type: String },
  aadharNo: { type: String, required: true },
  address: { type: String, required: true },
  unitNo: { type: String, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
