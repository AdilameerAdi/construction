import Finance from "../models/Finance.js";

// ✅ Create Finance Entry
export const createFinance = async (req, res) => {
  try {
    const data = req.body;

    // Convert empty strings to null
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        data[key] = null;
      }
    });

    // If project is "General", set null
    if (data.project === "General") {
      data.project = null;
    }

    const finance = new Finance(data);
    await finance.save();
    res.status(201).json(finance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get All Finance Entries
export const getFinances = async (req, res) => {
  try {
    const finances = await Finance.find()
      .populate("project", "name")
      .populate("customer", "fullName")
      .populate("contractor", "name")
      .populate("vendor", "name");
    res.json(finances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Single Finance Entry
export const getFinanceById = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id)
      .populate("project", "name")
      .populate("customer", "fullName")
      .populate("contractor", "name")
      .populate("vendor", "name");
    if (!finance) return res.status(404).json({ message: "Finance not found" });
    res.json(finance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Finance Entry
export const updateFinance = async (req, res) => {
  try {
    const updatedFinance = await Finance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFinance) return res.status(404).json({ message: "Finance not found" });
    res.json(updatedFinance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete Finance Entry
export const deleteFinance = async (req, res) => {
  try {
    const deleted = await Finance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Finance not found" });
    res.json({ message: "Finance entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
