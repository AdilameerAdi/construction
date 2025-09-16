const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    position: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    status: { type: String, enum: ["Active", "Deactive"], default: "Active" },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plainPassword: { type: String }, // Store plain password for main admin viewing
    permissions: [{ type: String }]
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    // Store plain password for main admin viewing
    this.plainPassword = this.password;
    // Hash the password
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// Hash password before updating
adminSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      // Store plain password for main admin viewing
      update.plainPassword = update.password;
      // Hash the password
      update.password = await bcrypt.hash(update.password, 12);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Compare password method
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);




// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema(
//   {
//     position: { type: String, required: true, trim: true },
//     fullName: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true },
//     mobile: { type: String, required: true },
//     status: { type: String, enum: ["Active", "Deactive"], default: "Active" },
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     permissions: [{ type: String }] // Example: ["Finance", "Reports", "Customers"]
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Admin", adminSchema);
