const express = require("express");
const router = express.Router();

const {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} = require("../Controllers/VendorController");

router.post("/", createVendor);      // Create
router.get("/", getVendors);         // Read all
router.get("/:id", getVendorById);     // Read one
router.put("/:id", updateVendor);      // Update
router.delete("/:id", deleteVendor);    // Delete

module.exports = router;
