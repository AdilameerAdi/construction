import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./frontend/login";
import DashboardLayout from "./frontend/DashboardLayout"; // We'll separate layout
import Activity from "./frontend/activity";
import Task from "./frontend/task";
import Contractors from "./frontend/contractor";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<h2 className="p-6 text-2xl font-bold">Welcome to Dashboard</h2>} />
          <Route path="activity" element={<Activity />} />
          <Route path="task" element={<Task />} />
          <Route path="contractors" element={<Contractors />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
