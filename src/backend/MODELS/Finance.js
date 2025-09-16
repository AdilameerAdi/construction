import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null }, // can be null if "General"
  type: { type: String, enum: ["Credit", "Debit"], required: true },

  // CREDIT
  creditOption: { type: String, enum: ["Customer", "Other"], default: "Other" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", default: null },

  // DEBIT
  debitOption: { type: String, enum: ["Labour", "Material", "Salary", "Office", "Other"], default: "" },
  contractor: { type: mongoose.Schema.Types.ObjectId, ref: "Contractor", default: null },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", default: null },

  description: { type: String, default: "" },
  mode: { type: String, enum: ["Cheque", "Account Pay", "Cash", "Major Cash"], required: true },
  paymentRef: { type: String, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Finance = mongoose.model("Finance", financeSchema);

export default Finance;
