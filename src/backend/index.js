import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import activityRoutes from "./Routes/ActivityRoutes.js";
import financeRoutes from "./Routes/financeRoutes.js";
import taskRoutes from "./Routes/TaskRoutes.js";
import contractorRoutes from "./Routes/ContractorRoutes.js";
import vendorRoutes from "./Routes/VendorRoutes.js";
import unitRoutes from "./Routes/UnitRoutes.js";
import materialRoutes from "./Routes/MaterialRoutes.js";
import adminRoutes from "./Routes/AdminRoutes.js";
import profileRoutes from "./Routes/ProfileRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";
import stockRoutes from "./Routes/StockRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
import leadRoutes from "./Routes/LeadRoutes.js";
import customerRoutes from "./Routes/CustomerRoutes.js";
import legalFileRoutes from "./Routes/LegalFileRoutes.js";
import technicalFileRoutes from "./Routes/TechnicalFileRoutes.js";
import projectRoutes from "./Routes/ProjectRoutes.js";

import "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json()); // instead of bodyParser.json()

// API routes
app.use("/api/activities", activityRoutes);
app.use("/api/finances", financeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/contractors", contractorRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/legal-files", legalFileRoutes);
app.use("/api/technical-files", technicalFileRoutes);
app.use("/api/projects", projectRoutes);

// Test API
app.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
