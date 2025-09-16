const express = require("express");
const router = express.Router();

const {
  createUnit,
  getUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
} = require("../Controllers/UnitController");

router.post("/", createUnit);       // Create
router.get("/", getUnits);          // Get All
router.get("/:id", getUnitById);    // Get One
router.put("/:id", updateUnit);     // Update
router.delete("/:id", deleteUnit);  // Delete

module.exports = router;
