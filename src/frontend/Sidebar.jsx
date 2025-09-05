// src/components/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ dropdowns, toggleDropdown }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear any user session or token here
    // localStorage.removeItem("userToken");
    navigate("/"); // Redirect to login page
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-16 border-b border-white/20">
        <div className="bg-white text-blue-600 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
          MC
        </div>
        <span className="ml-3 font-bold text-lg">MANTRI CONSTRUCTIONS</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Home Link */}
        <Link
          to="/dashboard"
          className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-white/20"
        >
          Home
        </Link>

        {/* Work Activity */}
        <div>
          <button
            onClick={() => toggleDropdown("workActivity")}
            className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-white/20 justify-between"
          >
            Work Activity
            <span>{dropdowns.workActivity ? "▲" : "▼"}</span>
          </button>
          {dropdowns.workActivity && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                to="/dashboard/activity"
                className="block px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Activity
              </Link>
              <Link
                to="/dashboard/task"
                className="block px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Task
              </Link>
            </div>
          )}
        </div>

        {/* Agencies */}
        <div>
          <button
            onClick={() => toggleDropdown("agencies")}
            className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-white/20 justify-between"
          >
            Agencies
            <span>{dropdowns.agencies ? "▲" : "▼"}</span>
          </button>
          {dropdowns.agencies && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                to="/dashboard/contractors"
                className="block px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Contractors
              </Link>
              <Link
                to="/dashboard/vendors"
                className="block px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Vendors
              </Link>
            </div>
          )}
        </div>

        {/* Inventory */}
        <div>
          <button
            onClick={() => toggleDropdown("inventory")}
            className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-white/20 justify-between"
          >
            Inventory
            <span>{dropdowns.inventory ? "▲" : "▼"}</span>
          </button>
          {dropdowns.inventory && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                to="/dashboard/material"
                className="block px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Material
              </Link>
              <Link
                to="/dashboard/unit"
                className="block px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Unit
              </Link>
            </div>
          )}
        </div>

        {/* Manage */}
        <div>
          <button
            onClick={() => toggleDropdown("manage")}
            className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-white/20 justify-between"
          >
            Manage
            <span>{dropdowns.manage ? "▲" : "▼"}</span>
          </button>
          {dropdowns.manage && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                to="/dashboard/admin"
                className="block px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Admin
              </Link>
              <Link
                to="/dashboard/profile"
                className="block px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
