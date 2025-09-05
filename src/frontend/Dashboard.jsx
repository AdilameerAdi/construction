// src/pages/Dashboard.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import MobileMenu from "./MobileMenu";
import { 
  FaCalendarAlt, FaMapMarkerAlt, FaProjectDiagram, FaChartBar, FaWarehouse, FaFileContract, FaFileAlt, FaUsers
} from "react-icons/fa";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    workActivity: false,
    agencies: false,
    inventory: false,
    manage: false,
  });

  const toggleDropdown = (name) => {
    setDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar dropdowns={dropdowns} toggleDropdown={toggleDropdown} />
      <div className="flex-1 flex flex-col">
        <TopNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {menuOpen && <MobileMenu />}

        {/* Dashboard Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition cursor-pointer flex items-center space-x-2">
            <FaCalendarAlt className="text-blue-600 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-700">25-08-2025</h3>
              <p className="text-yellow-500 font-medium">Pending</p>
              <p className="text-blue-600 font-medium flex items-center">
                <FaMapMarkerAlt className="mr-1" />Map Location
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer">
            <FaProjectDiagram className="text-indigo-600 text-3xl mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">Project Overview</h3>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer">
            <FaChartBar className="text-green-600 text-3xl mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">Gantt Chart</h3>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer">
            <FaWarehouse className="text-yellow-600 text-3xl mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">Stock Management</h3>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center space-x-2 hover:shadow-2xl transition cursor-pointer">
            <FaFileContract className="text-blue-600 text-2xl" />
            <span className="font-semibold text-gray-700">Legal Files</span>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center space-x-2 hover:shadow-2xl transition cursor-pointer">
            <FaFileAlt className="text-green-600 text-2xl" />
            <span className="font-semibold text-gray-700">Technical Files</span>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center space-x-2 hover:shadow-2xl transition cursor-pointer">
            <FaUsers className="text-purple-600 text-2xl" />
            <span className="font-semibold text-gray-700">Customer Records</span>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center space-x-2 hover:shadow-2xl transition cursor-pointer">
            <FaWarehouse className="text-yellow-600 text-2xl" />
            <span className="font-semibold text-gray-700">Lead Records</span>
          </div>
        </div>
      </div>
    </div>
  );
}
