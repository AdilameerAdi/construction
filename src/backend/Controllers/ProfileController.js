const Profile = require("../Models/Profile");
const bcrypt = require("bcryptjs"); // ✅ import bcrypt

// Create Profile
exports.createProfile = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10); // ✅ hash password
    }
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all profiles
exports.getProfiles = async (_req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const p = await Profile.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Profile not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10); // ✅ hash if new password provided
    }
    const p = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ message: "Profile not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Profile
exports.deleteProfile = async (req, res) => {
  try {
    const p = await Profile.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: "Profile not found" });
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Extra: Change Password API
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const profile = await Profile.findById(req.params.id);

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const isMatch = await bcrypt.compare(currentPassword, profile.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    profile.password = await bcrypt.hash(newPassword, 10);
    await profile.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// const Profile = require("../Models/Profile");

// // Create
// exports.createProfile = async (req, res) => {
//   try {
//     const profile = await Profile.create(req.body);
//     res.status(201).json(profile);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all (or you can keep 1 profile and just read the first)
// exports.getProfiles = async (_req, res) => {
//   try {
//     const profiles = await Profile.find().sort({ createdAt: -1 });
//     res.json(profiles);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get one
// exports.getProfileById = async (req, res) => {
//   try {
//     const p = await Profile.findById(req.params.id);
//     if (!p) return res.status(404).json({ message: "Profile not found" });
//     res.json(p);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update
// exports.updateProfile = async (req, res) => {
//   try {
//     const p = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!p) return res.status(404).json({ message: "Profile not found" });
//     res.json(p);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // Delete
// exports.deleteProfile = async (req, res) => {
//   try {
//     const p = await Profile.findByIdAndDelete(req.params.id);
//     if (!p) return res.status(404).json({ message: "Profile not found" });
//     res.json({ message: "Profile deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // Create
// exports.createProfile = async (req, res) => {
//   try {
//     if (req.body.password) {
//       req.body.password = await bcrypt.hash(req.body.password, 10); // hash password
//     }
//     const profile = await Profile.create(req.body);
//     res.status(201).json(profile);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update
// exports.updateProfile = async (req, res) => {
//   try {
//     if (req.body.password) {
//       req.body.password = await bcrypt.hash(req.body.password, 10); // hash password
//     }
//     const p = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!p) return res.status(404).json({ message: "Profile not found" });
//     res.json(p);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
