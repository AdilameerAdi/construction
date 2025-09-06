import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaProjectDiagram, FaChartBar, FaWarehouse, FaFileContract, 
  FaFileAlt, FaUsers, FaFileInvoiceDollar, 
  FaProjectDiagram as FaNewProject, FaRegChartBar, FaChevronRight 
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  // Sample project data
  const [projects] = useState([
    { id: 1, name: "Residential Complex A", date: "25-08-2025", status: "Ongoing" },
    { id: 2, name: "Mall Project B", date: "12-07-2025", status: "Pending" },
    { id: 3, name: "Office Tower C", date: "05-09-2025", status: "Completed" },
  ]);

  // Track if a project is selected
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold bg-amber-500 p-3 text-center text-gray-800 mb-6">
        Welcome to MANTRI CONSTRUCTIONS
      </h2>

      {/* Two-column Layout */}
      <div className="flex gap-6">
        {/* Left Column: Project List Box */}
        <div className="bg-white shadow-lg rounded-2xl p-4 w-[220px] flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Projects</h3>
          <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-2 border rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
                onClick={() => setSelectedProject(project)}
              >
                <span className="font-medium text-gray-700 text-sm truncate">{project.name}</span>
                <FaChevronRight className="text-gray-500 text-sm" />
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Dashboard Cards */}
        <div className="flex-1">
          {/* First row: New Projects & Project Finance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* New Projects */}
            <div 
              onClick={() => navigate("/dashboard/new-project")} 
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer"
            >
              <FaNewProject className="text-indigo-600 text-3xl mb-2" />
              <h3 className="text-lg font-semibold text-gray-700">New Projects</h3>
            </div>

            {/* Project Finance */}
            <div 
              onClick={() => navigate("/dashboard/project-finance")} 
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer"
            >
              <FaFileInvoiceDollar className="text-green-600 text-3xl mb-2" />
              <h3 className="text-lg font-semibold text-gray-700">Project Finance</h3>
            </div>
          </div>

          {/* If a project is selected, show other cards */}
          {selectedProject && (
            <>
              {/* Selected Project Info with Close Button */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-blue-800">{selectedProject.name}</h3>
                  <p className="text-sm text-gray-600">
                    Date: {selectedProject.date} • Status:{" "}
                    <span className="font-medium">{selectedProject.status}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-red-500 hover:text-red-700 text-xl font-bold"
                  aria-label="Close"
                >
                  ✖
                </button>
              </div>

              {/* Other Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Project Overview */}
                <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer">
                  <FaProjectDiagram className="text-indigo-600 text-3xl mb-2" />
                  <h3 className="text-lg font-semibold text-gray-700">Project Overview</h3>
                </div>

                {/* Gantt Chart */}
                <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer">
                  <FaChartBar className="text-green-600 text-3xl mb-2" />
                  <h3 className="text-lg font-semibold text-gray-700">Gantt Chart</h3>
                </div>

                {/* Stock Management */}
                <div 
                  onClick={() => navigate("/dashboard/stock-management")}
                  className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer"
                >
                  <FaWarehouse className="text-yellow-600 text-3xl mb-2" />
                  <h3 className="text-lg font-semibold text-gray-700">Stock Management</h3>
                </div>

                {/* Legal Files */}
                <div
                  onClick={() => navigate("/dashboard/legal-files")}
                  className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center space-x-2 hover:shadow-2xl transition cursor-pointer"
                >
                  <FaFileContract className="text-blue-600 text-2xl" />
                  <span className="font-semibold text-gray-700">Legal Files</span>
                </div>

                {/* Technical Files */}
                <div
                  onClick={() => navigate("/dashboard/technical-files")}
                  className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center space-x-2 hover:shadow-2xl transition cursor-pointer"
                >
                  <FaFileAlt className="text-green-600 text-2xl" />
                  <span className="font-semibold text-gray-700">Technical Files</span>
                </div>

                {/* Customer Records */}
                <div
                  onClick={() => navigate("/dashboard/customers")}
                  className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center space-x-2 hover:shadow-2xl transition cursor-pointer"
                >
                  <FaUsers className="text-purple-600 text-2xl" />
                  <span className="font-semibold text-gray-700">Customer Records</span>
                </div>

                {/* Lead Records */}
                <div
                  onClick={() => navigate("/dashboard/leads")}
                  className="bg-white shadow-lg rounded-2xl p-6 flex items-center justify-center space-x-3 hover:shadow-2xl transition cursor-pointer"
                >
                  <FaWarehouse className="text-yellow-600 text-2xl" />
                  <span className="font-semibold text-gray-800 text-lg">Lead Records</span>
                </div>

                {/* Reports */}
                <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition cursor-pointer">
                  <FaRegChartBar className="text-yellow-600 text-3xl mb-2" />
                  <h3 className="text-lg font-semibold text-gray-700">Reports</h3>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
