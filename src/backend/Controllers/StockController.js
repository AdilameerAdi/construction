const Stock = require("../MODELS/Stock");

// Create
exports.createStock = async (req, res) => {
  try {
    const payload = req.body;

    // Normalize date if it comes as string (yyyy-mm-dd)
    if (payload.date) payload.date = new Date(payload.date);

    // Ensure project is always a string
    if (payload.project) payload.project = String(payload.project).trim();

    // Create document
    const doc = await Stock.create(payload);

    // Populate only material, vendor, contractor
    const populated = await doc.populate([
      { path: "material", select: "title" },
      { path: "vendor", select: "title" },
      { path: "contractor", select: "title" },
    ]);

    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all (with filters for the table/search bar)
exports.getStocks = async (req, res) => {
  try {
    const {
      fromDate,
      toDate,
      materials,     // comma separated ids
      type,          // Inward / Outward
      vendor,
      contractor,
      project,
    } = req.query;

    const q = {};

    if (fromDate || toDate) {
      q.date = {};
      if (fromDate) q.date.$gte = new Date(fromDate);
      if (toDate) {
        const end = new Date(toDate);
        end.setHours(23, 59, 59, 999);
        q.date.$lte = end;
      }
    }

    if (materials) q.material = { $in: materials.split(",") };
    if (type) q.type = type;
    if (vendor) q.vendor = vendor;
    if (contractor) q.contractor = contractor;
    if (project) q.project = new RegExp(project, "i"); // allow name search

    const list = await Stock.find(q)
      .sort({ createdAt: -1 })
      .populate("material", "title")
      .populate("vendor", "title")
      .populate("contractor", "title");

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read single
exports.getStockById = async (req, res) => {
  try {
    const doc = await Stock.findById(req.params.id)
      .populate("material", "title")
      .populate("vendor", "title")
      .populate("contractor", "title");

    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateStock = async (req, res) => {
  try {
    const payload = req.body;

    if (payload.date) payload.date = new Date(payload.date);
    if (payload.project) payload.project = String(payload.project).trim();

    const updated = await Stock.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    })
      .populate("material", "title")
      .populate("vendor", "title")
      .populate("contractor", "title");

    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteStock = async (req, res) => {
  try {
    const deleted = await Stock.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Stock entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
