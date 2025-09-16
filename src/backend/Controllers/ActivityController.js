const Activity = require("../MODELS/Activity");

// Create Activity
exports.createActivity = async (req, res) => {
  try {
    const { title, status } = req.body;
    const activity = await Activity.create({ title, status });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Activities
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Activity
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Activity
exports.deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
