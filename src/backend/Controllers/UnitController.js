const Unit = require("../MODELS/Unit");

// Create Unit
exports.createUnit = async (req, res) => {
  try {
    const { name, status } = req.body;
    const unit = await Unit.create({ name, status });
    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Units
exports.getUnits = async (req, res) => {
  try {
    const units = await Unit.find();
    res.json(units);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Unit by ID
exports.getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    if (!unit) return res.status(404).json({ message: "Unit not found" });
    res.json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Unit
exports.updateUnit = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!unit) return res.status(404).json({ message: "Unit not found" });
    res.json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Unit
exports.deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndDelete(req.params.id);
    if (!unit) return res.status(404).json({ message: "Unit not found" });
    res.json({ message: "Unit deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
