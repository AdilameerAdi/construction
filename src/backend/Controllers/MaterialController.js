const Material = require("../MODELS/Material");

// ✅ Create Material
exports.createMaterial = async (req, res) => {
  try {
    const { activity, name, unit, status } = req.body;
    const material = await Material.create({ activity, name, unit, status });
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Materials
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find()
      .populate("activity", "title")
      .populate("unit", "name");
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Single Material
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
      .populate("activity", "title")
      .populate("unit", "name");
    if (!material) return res.status(404).json({ message: "Material not found" });
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Material
exports.updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!material) return res.status(404).json({ message: "Material not found" });
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Material
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ message: "Material not found" });
    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
