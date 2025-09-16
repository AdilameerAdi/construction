const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },

    // ✅ Added password field
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
