const express = require("express");
const router = express.Router();
const legalFileController = require("../Controllers/LegalFileController");

// GET all files
router.get("/", legalFileController.getFiles);

// POST new file
router.post("/", legalFileController.addFile);

// DELETE file
router.delete("/:id", legalFileController.deleteFile);

module.exports = router;