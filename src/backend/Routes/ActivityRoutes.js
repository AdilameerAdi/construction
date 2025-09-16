const express = require("express");
const router = express.Router();

const {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity,
} = require("../Controllers/ActivityController");

router.post("/", createActivity);       // Create
router.get("/", getActivities);         // Read
router.put("/:id", updateActivity);     // Update
router.delete("/:id", deleteActivity);  // Delete

module.exports = router;
