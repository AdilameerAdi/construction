const bcrypt = require("bcryptjs");
const User = require("../Models/User");

// Create user (admin)
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, username, password, status } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, username, passwordHash, status });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
exports.getUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one
exports.getUserById = async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select("-passwordHash");
    if (!u) return res.status(404).json({ message: "User not found" });
    res.json(u);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update (no password here)
exports.updateUser = async (req, res) => {
  try {
    const { fullName, email, username, status } = req.body;
    const u = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, email, username, status },
      { new: true, runValidators: true }
    ).select("-passwordHash");
    if (!u) return res.status(404).json({ message: "User not found" });
    res.json(u);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteUser = async (req, res) => {
  try {
    const u = await User.findByIdAndDelete(req.params.id);
    if (!u) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const u = await User.findById(req.params.id);
    if (!u) return res.status(404).json({ message: "User not found" });

    const ok = await bcrypt.compare(currentPassword, u.passwordHash);
    if (!ok) return res.status(400).json({ message: "Current password is incorrect" });

    u.passwordHash = await bcrypt.hash(newPassword, 10);
    await u.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
