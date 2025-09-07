// src/frontend/Dashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaProjectDiagram, FaChartBar, FaWarehouse, FaFileContract, 
  FaUsers, FaFileInvoiceDollar, 
  FaProjectDiagram as FaNewProject, FaRegChartBar, FaChevronRight 
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const [projects] = useState([
    { id: 1, name: "Residential Complex A", date: "25-08-2025", status: "Ongoing" },
    { id: 2, name: "Mall Project B", date: "12-07-2025", status: "Pending" },
    { id: 3, name: "Office Tower C", date: "05-09-2025", status: "Completed" },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-bold bg-[#155DFC]  p-4 text-center text-white mb-8 rounded-xl shadow-lg">
        Welcome to MANTRI CONSTRUCTIONS
      </h2>

      <div className="flex gap-6">
        {/* Left Column: Project List */}
        <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-4 w-[240px] flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Projects</h3>
          <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-2 border border-gray-200 rounded-lg flex justify-between items-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition"
                onClick={() => setSelectedProject(project)}
              >
                <span className="font-medium text-gray-700 text-sm truncate">{project.name}</span>
                <FaChevronRight className="text-gray-500 text-sm" />
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          {/* Top row cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div 
              onClick={() => navigate("/dashboard/new-project")} 
              className="bg-white border border-gray-300 shadow-lg rounded-xl p-6 flex flex-col justify-center items-center hover:shadow-xl hover:border-blue-500 transition cursor-pointer"
            >
              <FaNewProject className="text-blue-600 text-3xl mb-2" />
              <h3 className="text-lg font-semibold text-gray-700">New Projects</h3>
            </div>

            <div 
              onClick={() => navigate("/dashboard/project-finance")} 
              className="bg-white border border-gray-300 shadow-lg rounded-xl p-6 flex flex-col justify-center items-center hover:shadow-xl hover:border-green-500 transition cursor-pointer"
            >
              <FaFileInvoiceDollar className="text-green-600 text-3xl mb-2" />
              <h3 className="text-lg font-semibold text-gray-700">Finance</h3>
            </div>

            <div 
              onClick={() => navigate("/dashboard/project-finance")} 
              className="bg-white border border-gray-300 shadow-lg rounded-xl p-6 flex flex-col justify-center items-center hover:shadow-xl hover:border-yellow-500 transition cursor-pointer"
            >
              <FaRegChartBar className="text-yellow-600 text-3xl mb-2" />
              <h3 className="text-lg font-semibold text-gray-700">Reports</h3>
            </div>
          </div>

          {selectedProject && (
            <>
              {/* Selected Project Info */}
              <div className="bg-white border border-blue-300 p-4 rounded-xl mb-6 shadow-md flex justify-between items-center">
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

              {/* Project Details */}
              <div className="grid grid-cols-3 gap-6">
                {/* Overview */}
                <div className="col-span-1 bg-white border border-gray-300 shadow-md rounded-xl p-6 flex flex-col justify-center items-center hover:shadow-lg hover:border-indigo-500 transition cursor-pointer h-72">
                  <FaProjectDiagram className="text-indigo-600 text-4xl mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Project Overview</h3>
                  <p className="text-gray-600 text-sm text-center">
                    Date: {selectedProject.date} • Status:{" "}
                    <span className="font-medium">{selectedProject.status}</span>
                  </p>
                </div>

                {/* Right side grid */}
                <div className="col-span-2 grid grid-cols-2 gap-6">
                  {/* Onsite */}
                  <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 hover:shadow-lg hover:border-yellow-400 transition">
                    <div className="flex items-center mb-2">
                      <FaWarehouse className="text-yellow-500 text-xl mr-2" />
                      <h3 className="text-lg font-semibold">Onsite</h3>
                    </div>
                    <button
                      className="bg-yellow-50 hover:bg-yellow-100 rounded-lg px-3 py-2 text-sm font-medium w-full"
                      onClick={() => navigate("/dashboard/stock-management")}
                    >
                      Stock Management
                    </button>
                  </div>

                  {/* Technical */}
                  <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 hover:shadow-lg hover:border-green-400 transition">
                    <div className="flex items-center mb-2">
                      <FaChartBar className="text-green-500 text-xl mr-2" />
                      <h3 className="text-lg font-semibold">Technical</h3>
                    </div>
                    <button
                      className="bg-green-50 hover:bg-green-100 rounded-lg px-3 py-2 text-sm font-medium w-full mb-2"
                      onClick={() => navigate("/dashboard/gantt-chart")}
                    >
                      Gantt Chart
                    </button>
                    <button
                      className="bg-green-50 hover:bg-green-100 rounded-lg px-3 py-2 text-sm font-medium w-full"
                      onClick={() => navigate("/dashboard/technical-files")}
                    >
                      Technical Files
                    </button>
                  </div>

                  {/* Legal */}
                  <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 hover:shadow-lg hover:border-blue-400 transition">
                    <div className="flex items-center mb-2">
                      <FaFileContract className="text-blue-500 text-xl mr-2" />
                      <h3 className="text-lg font-semibold">Legal</h3>
                    </div>
                    <button
                      className="bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 text-sm font-medium w-full"
                      onClick={() => navigate("/dashboard/legal-files")}
                    >
                      Legal Files
                    </button>
                  </div>

                  {/* Marketing */}
                  <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4 hover:shadow-lg hover:border-purple-400 transition">
                    <div className="flex items-center mb-2">
                      <FaUsers className="text-purple-500 text-xl mr-2" />
                      <h3 className="text-lg font-semibold">Marketing</h3>
                    </div>
                    <button
                      className="bg-purple-50 hover:bg-purple-100 rounded-lg px-3 py-2 text-sm font-medium w-full mb-2"
                      onClick={() => navigate("/dashboard/customers")}
                    >
                      Customer Records
                    </button>
                    <button
                      className="bg-purple-50 hover:bg-purple-100 rounded-lg px-3 py-2 text-sm font-medium w-full"
                      onClick={() => navigate("/dashboard/leads")}
                    >
                      Leads Records
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
