const express = require("express");
const router = express.Router();
const {
  createStock,
  getStocks,
  getStockById,
  updateStock,
  deleteStock,
} = require("../Controllers/StockController");

// /api/stocks
router.post("/", createStock);
router.get("/", getStocks);
router.get("/:id", getStockById);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

module.exports = router;
