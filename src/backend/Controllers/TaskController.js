const Task = require("../MODELS/Task");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { activity, title, status } = req.body;
    const task = await Task.create({ activity, title, status });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Tasks (with activity populated)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("activity", "title");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("activity", "title");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { activity, title, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { activity, title, status },
      { new: true, runValidators: true }
    ).populate("activity", "title");

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
