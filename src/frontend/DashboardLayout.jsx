import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-300 relative">
      {/* Sidebar always visible on right */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6 mr-64"> {/* Add right margin to avoid overlap */}
        <Outlet />
      </div>
    </div>
  );
}
