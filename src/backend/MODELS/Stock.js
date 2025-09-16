// models/Stock.js
const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  project: { type: String, required: true },
  material: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
  type: { type: String, enum: ["Inward", "Outward"], required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  contractor: { type: mongoose.Schema.Types.ObjectId, ref: "Contractor" },
  quantity: { type: Number, required: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model("Stock", StockSchema);

