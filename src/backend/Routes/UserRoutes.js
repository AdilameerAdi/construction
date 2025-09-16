const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword
} = require("../Controllers/UserController");

router.post("/", createUser);             // Create user (admin)
router.get("/", getUsers);                // Get all users
router.get("/:id", getUserById);          // Get one user
router.put("/:id", updateUser);           // Update (not password)
router.delete("/:id", deleteUser);        // Delete
router.post("/:id/change-password", changePassword); // Change password

module.exports = router;
