const express = require("express");
const router = express.Router();
const technicalFileController = require("../Controllers/TechnicalFileController");

// Routes
router.get("/", technicalFileController.getFiles);       // GET all files
router.post("/", technicalFileController.uploadFile);    // POST upload new file
router.delete("/:id", technicalFileController.deleteFile); // DELETE file by id

module.exports = router;