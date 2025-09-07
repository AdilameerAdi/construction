const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Deactivate"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
