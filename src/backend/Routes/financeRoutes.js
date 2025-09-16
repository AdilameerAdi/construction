import express from "express";
import {
  createFinance,
  getFinances,
  getFinanceById,
  updateFinance,
  deleteFinance,
} from "../controllers/financeController.js";

const router = express.Router();

// POST /api/finances  → create
router.post("/", createFinance);

// GET /api/finances  → all
router.get("/", getFinances);

// GET /api/finances/:id  → single
router.get("/:id", getFinanceById);

// PUT /api/finances/:id  → update
router.put("/:id", updateFinance);

// DELETE /api/finances/:id  → delete
router.delete("/:id", deleteFinance);

export default router;
