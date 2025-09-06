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
import AddCustomer from "./frontend/AddCustomer";
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
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="leads" element={<LeadList />} />
          <Route path="add-lead" element={<AddLead />} />

          {/* Other Dashboard Pages */}
          <Route path="activity" element={<Activity />} />
          <Route path="task" element={<Task />} />
          <Route path="contractors" element={<Contractors />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="material" element={<Material />} />
          <Route path="unit" element={<Unit />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
