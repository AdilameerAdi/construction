const express = require("express");
const router = express.Router();
const leadController = require("../Controllers/LeadController.js");

// Create a new lead
router.post("/", leadController.createLead);

// Get all leads
router.get("/", leadController.getLeads);

// Get a single lead by ID
router.get("/:id", leadController.getLeadById);

// Update a lead by ID
router.put("/:id", leadController.updateLead);

// Delete a lead by ID
router.delete("/:id", leadController.deleteLead);

module.exports = router;
