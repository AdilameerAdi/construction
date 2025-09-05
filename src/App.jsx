import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./frontend/login";
import DashboardLayout from "./frontend/DashboardLayout";
import Activity from "./frontend/activity";
import Task from "./frontend/task";
import Contractors from "./frontend/contractor";
import Dashboard from "./frontend/Dashboard"; // import your full dashboard componen
import Vendors from "./frontend/Vendors";
import Material from "./frontend/Material";
import Unit from "./frontend/Unit";
import Profile from "./frontend/profile";
import Admin from "./frontend/admin";
function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          {/* Use Dashboard component as the default page */}
          <Route index element={<Dashboard />} />
          <Route path="activity" element={<Activity />} />
          <Route path="task" element={<Task />} />
          <Route path="contractors" element={<Contractors />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="material" element={<Material/>} />
          <Route path="unit" element={<Unit/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="admin" element={<Admin/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
