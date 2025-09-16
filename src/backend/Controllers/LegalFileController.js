const LegalFile = require("../MODELS/LegalFile");

// ✅ Get all files
exports.getFiles = async (req, res) => {
  try {
    const { project } = req.query;
    const query = project ? { project } : {};
    const files = await LegalFile.find(query);
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Add a file
exports.addFile = async (req, res) => {
  try {
    const { project, name, addedBy, date, url } = req.body;

    const newFile = new LegalFile({ project, name, addedBy, date, url });
    await newFile.save();

    res.status(201).json(newFile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete a file
exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LegalFile.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};