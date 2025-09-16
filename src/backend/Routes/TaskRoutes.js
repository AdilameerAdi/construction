const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../Controllers/TaskController");

router.post("/", createTask);        // Create Task
router.get("/", getTasks);           // Get All Tasks
router.get("/:id", getTaskById);     // Get Task by ID
router.put("/:id", updateTask);      // Update Task
router.delete("/:id", deleteTask);   // Delete Task

module.exports = router;
