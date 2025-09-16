const express = require("express");
const router = express.Router();

const {
    createContractor,
    getContractors,
    getContractorById,
    updateContractor,
    deleteContractor,
} = require("../Controllers/ContractorController");
const { getConvertedLeads } = require("../Controllers/leadController");

router.post("/", createContractor); // Create
router.get("/", getContractors); // Read all
router.get("/:id", getContractorById); // Read one
router.put("/:id", updateContractor); // Update
router.delete("/:id", deleteContractor); // Delete
router.get("/converted", getConvertedLeads);
module.exports = router;