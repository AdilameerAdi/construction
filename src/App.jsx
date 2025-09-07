// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth
import Login from "./frontend/login";

// Layout
import DashboardLayout from "./frontend/DashboardLayout";

// Dashboard Pages
import Dashboard from "./frontend/Dashboard";
import Activity from "./frontend/activity";
import Task from "./frontend/task";
import Contractors from "./frontend/contractor";
import Vendors from "./frontend/Vendors";
import Material from "./frontend/Material";
import Unit from "./frontend/Unit";
import Profile from "./frontend/profile";
import Admin from "./frontend/admin";

// Customer & Leads
import CustomerList from "./frontend/CustomerList";

import LeadList from "./frontend/LeadList";
import AddLead from "./frontend/AddLead";

// Finance & Project
import NewProject from "./frontend/NewProjectModal"; // ensure this is a page
import ProjectFinance from "./frontend/ProjectFinance";
import AddFinance from "./frontend/AddFinance";

// Stock
import StockManagement from "./frontend/StockManagement";
import AddStock from "./frontend/AddStock";

// Files
import LegalFiles from "./frontend/LegalFiles";
import TechnicalFiles from "./frontend/TechnicalFiles";
//
import AddTask from "./frontend/AddTask";
import AddActivity from "./frontend/addactivity";
//
import AddContractor from "./frontend/addcontractor";
//
import AddVendor from "./frontend/AddVendor";
//
import AddUnit from "./frontend/AddUnit";
//
import AddMaterial from "./frontend/AddMaterial";
function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Layout with Nested Routes */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          {/* Default Dashboard Page */}
          <Route index element={<Dashboard />} />

          {/* Project Pages */}
          <Route path="new-project" element={<NewProject />} />

          {/* Finance Pages */}
          <Route path="project-finance" element={<ProjectFinance />} />
          <Route path="add-finance" element={<AddFinance />} />

          {/* Stock Pages */}
          <Route path="stock-management" element={<StockManagement />} />
          <Route path="add-stock" element={<AddStock />} />

          {/* File Pages */}
          <Route path="legal-files" element={<LegalFiles />} />
          <Route path="technical-files" element={<TechnicalFiles />} />

          {/* Customers & Leads */}
          <Route path="customers" element={<CustomerList />} />
         
          <Route path="leads" element={<LeadList />} />
          <Route path="add-lead" element={<AddLead />} />

          {/* Other Dashboard Pages */}
          <Route path="activity" element={<Activity />} />
          <Route path="add-activity" element={<AddActivity />} />
          <Route path="task" element={<Task />} />
          <Route path="addtask" element={<AddTask />} />
          <Route path="contractors" element={<Contractors />} />
           <Route path="add-contractor" element={<AddContractor />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="add-vendor" element={<AddVendor />} />

          <Route path="material" element={<Material />} />
          <Route path="add-material" element={<AddMaterial />} />

          <Route path="unit" element={<Unit />} />
          <Route path="add-unit" element={<AddUnit />} />

          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
