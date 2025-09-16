const Admin = require("../Models/Admin");

// ✅ Login Controller
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password using bcrypt
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check status
    if (admin.status === "Deactive") {
      return res.status(403).json({ error: "Your account is inactive" });
    }

    // Response
    res.json({
      id: admin._id,
      name: admin.fullName,
      username: admin.username,
      position: admin.position,
      status: admin.status,
      permissions: admin.permissions, // Send allowed modules
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
