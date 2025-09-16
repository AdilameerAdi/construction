const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
  changePassword,
} = require("../Controllers/ProfileController");

router.post("/", createProfile);
router.get("/", getProfiles);
router.get("/:id", getProfileById);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

// ✅ New route for changing password
router.post("/:id/change-password", changePassword);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const {
//   createProfile,
//   getProfiles,
//   getProfileById,
//   updateProfile,
//   deleteProfile
// } = require("../Controllers/ProfileController");

// router.post("/", createProfile);        // Create details
// router.get("/", getProfiles);           // Get all (or first)
// router.get("/:id", getProfileById);     // Get one
// router.put("/:id", updateProfile);      // Update details
// router.delete("/:id", deleteProfile);   // Delete

// module.exports = router;
