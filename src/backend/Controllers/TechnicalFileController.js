const TechnicalFile = require("../MODELS/TechnicalFile");

// Get all files
exports.getFiles = async (req, res) => {
  try {
    const { project } = req.query;
    const query = project ? { project } : {};
    const files = await TechnicalFile.find(query).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching files" });
  }
};

// Upload (Save) file metadata
exports.uploadFile = async (req, res) => {
  try {
    const { project, activity, name, addedBy, date, url } = req.body;

    if (!project || !activity || !name || !url || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFile = new TechnicalFile({
      project,
      activity,
      name,
      addedBy: addedBy || "Admin",
      date,
      url,
    });

    await newFile.save();
    res.status(201).json(newFile);
  } catch (err) {
    res.status(500).json({ error: "Server error while uploading file" });
  }
};

// Delete file
exports.deleteFile = async (req, res) => {
  try {
    const file = await TechnicalFile.findByIdAndDelete(req.params.id);
    if (!file) return res.status(404).json({ error: "File not found" });
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error while deleting file" });
  }
};