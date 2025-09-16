const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  changePassword
} = require("../Controllers/AdminController");

router.post("/", createAdmin);     // Create
router.get("/", getAdmins);        // Read all
router.get("/:id", getAdminById);  // Read one
router.put("/:id", updateAdmin);   // Update
router.delete("/:id", deleteAdmin);// Delete
router.post("/:id/change-password", changePassword); // Change Password

module.exports = router;
