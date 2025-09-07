import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  FaHome, FaTasks, FaClipboardList, FaUsers, FaStore, FaBoxOpen, FaUserShield, FaUser, FaChevronRight, FaChevronDown 
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(""); // tracks which dropdown is open

  const handleLogout = () => {
    navigate("/");
    setIsSidebarOpen(false);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? "" : dropdownName);
  };

  const menuClass = "flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-colors";

  return (
    <>
      {/* Hamburger Button for closed sidebar */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 right-4 z-50 text-2xl text-blue-600 font-bold bg-white rounded-full p-2 shadow-lg transition-transform hover:scale-110"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-blue-700 via-indigo-700 to-purple-700 text-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 z-40
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 border-b border-white/20 px-4">
          <div className="flex items-center">
            <div className="bg-white text-blue-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              MC
            </div>
            <span className="ml-3 font-bold text-lg tracking-wide">MANTRI</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white text-2xl font-bold hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Home */}
          <Link
            to="/dashboard"
            className="flex items-center justify-between px-4 py-2 rounded-md font-bold text-white hover:bg-blue-800 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <FaHome /> <span>Home</span>
            </div>
          </Link>

          {/* Work Activity */}
          <div>
            <button
              onClick={() => toggleDropdown("work")}
              className={menuClass}
            >
              <div className="flex items-center space-x-2 font-bold">
                <FaTasks /> <span>Work Activity</span>
              </div>
              {openDropdown === "work" ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {openDropdown === "work" && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/dashboard/activity"
                  className="block px-4 py-2 rounded-md text-white hover:bg-blue-800 transition-colors"
                >
                  Activity
                </Link>
                <Link
                  to="/dashboard/task"
                  className="block px-4 py-2 rounded-md text-white hover:bg-blue-800 transition-colors"
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
              className={menuClass}
            >
              <div className="flex items-center space-x-2 font-bold">
                <FaUsers /> <span>Agencies</span>
              </div>
              {openDropdown === "agencies" ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {openDropdown === "agencies" && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/dashboard/contractors"
                  className="block px-4 py-2 rounded-md text-white hover:bg-blue-800 transition-colors"
                >
                  Contractors
                </Link>
                <Link
                  to="/dashboard/vendors"
                  className="block px-4 py-2 rounded-md text-white hover:bg-blue-800 transition-colors"
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
              className={menuClass}
            >
              <div className="flex items-center space-x-2 font-bold">
                <FaStore /> <span>Inventory</span>
              </div>
              {openDropdown === "inventory" ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {openDropdown === "inventory" && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/dashboard/material"
                  className="block px-4 py-2 rounded-md text-white hover:bg-blue-800 transition-colors"
                >
                  Material
                </Link>
                <Link
                  to="/dashboard/unit"
                  className="block px-4 py-2 rounded-md text-white hover:bg-blue-800 transition-colors"
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
              className={menuClass}
            >
              <div className="flex items-center space-x-2 font-bold">
                <FaUserShield /> <span>Manage</span>
              </div>
              {openDropdown === "manage" ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {openDropdown === "manage" && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/dashboard/admin"
                  className="block px-4 py-2 rounded-md text-white hover:bg-blue-800 transition-colors"
                >
                  Admin
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 rounded-md text-white hover:bg-blue-800 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-md text-white hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
