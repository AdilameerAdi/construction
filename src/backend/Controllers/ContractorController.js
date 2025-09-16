const Contractor = require("../MODELS/Contractor");

// Create Contractor
exports.createContractor = async (req, res) => {
  try {
    const contractor = await Contractor.create(req.body);
    res.status(201).json(contractor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Contractors
exports.getContractors = async (req, res) => {
  try {
    const contractors = await Contractor.find().populate("activity", "title");
    res.json(contractors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Contractor
exports.getContractorById = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id).populate("activity", "title");
    if (!contractor) return res.status(404).json({ message: "Contractor not found" });
    res.json(contractor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Contractor
exports.updateContractor = async (req, res) => {
  try {
    const contractor = await Contractor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("activity", "title");
    if (!contractor) return res.status(404).json({ message: "Contractor not found" });
    res.json(contractor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Contractor
exports.deleteContractor = async (req, res) => {
  try {
    const contractor = await Contractor.findByIdAndDelete(req.params.id);
    if (!contractor) return res.status(404).json({ message: "Contractor not found" });
    res.json({ message: "Contractor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
