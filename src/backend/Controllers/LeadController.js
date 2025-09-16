const Lead = require("../MODELS/Lead.js");

// Create new Lead
exports.createLead = async(req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();

        // If lead is converted, create a customer
        if (req.body.isConverted) {
            const Customer = require("../MODELS/Customer.js");
            const customerData = {
                project: req.body.project,
                datetime: req.body.visitDate || new Date(),
                fullName: req.body.fullName,
                primaryContact: req.body.contactNo,
                secondaryContact: "", // You can add this field to the lead form if needed
                aadharNo: req.body.aadharNo,
                address: req.body.address,
                unitNo: req.body.unitNo,
                amount: req.body.amount
            };
            const customer = new Customer(customerData);
            await customer.save();
        }

        res.status(201).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all Leads
exports.getLeads = async(req, res) => {
    try {
        const { project } = req.query;
        const query = project ? { project } : {};
        const leads = await Lead.find(query);
        res.status(200).json({ success: true, data: leads });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Lead by ID
exports.getLeadById = async(req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ success: false, error: "Lead not found" });
        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Lead
exports.updateLead = async(req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!lead) return res.status(404).json({ success: false, error: "Lead not found" });
        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete Lead
exports.deleteLead = async(req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) return res.status(404).json({ success: false, error: "Lead not found" });
        res.status(200).json({ success: true, message: "Lead deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
//is converted data// Get all converted Leads
exports.getConvertedLeads = async(req, res) => {
    try {
        const convertedLeads = await Lead.find({ isConverted: true });
        res.status(200).json({ success: true, data: convertedLeads });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};