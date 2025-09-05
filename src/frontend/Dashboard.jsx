// src/pages/Dashboard.jsx
import { 
  FaCalendarAlt, FaMapMarkerAlt, FaProjectDiagram, FaChartBar, FaWarehouse, 
  FaFileContract, FaFileAlt, FaUsers, FaFileInvoiceDollar, FaProjectDiagram as FaNewProject, FaRegChartBar 
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome to MANTRI CONSTRUCTIONS</h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
        {/* New Projects */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer">
          <FaNewProject className="text-indigo-600 text-3xl mb-2" />
          <h3 className="text-lg font-semibold text-gray-700">New Projects</h3>
        </div>

        {/* Project Finance */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer">
          <FaFileInvoiceDollar className="text-green-600 text-3xl mb-2" />
          <h3 className="text-lg font-semibold text-gray-700">Project Finance</h3>
        </div>

        {/* Existing Cards */}
        

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

        {/* Reports */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer">
          <FaRegChartBar className="text-yellow-600 text-3xl mb-2" />
          <h3 className="text-lg font-semibold text-gray-700">Reports</h3>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center space-x-2 hover:shadow-2xl transition cursor-pointer">
          <FaWarehouse className="text-yellow-600 text-2xl" />
          <span className="font-semibold text-gray-700">Lead Records</span>
        </div>
      </div>
    </div>
  );
}
