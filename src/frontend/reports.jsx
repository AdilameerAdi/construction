import { useState, useEffect } from "react";
import GanttChart from "../components/Gantchart"; // ✅ import your existing chart component

export default function Reports() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Inputs (controlled by the user before applying)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔹 Applied filters (only update when button is clicked)
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/projects");
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleApplyFilter = () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading Reports...</div>;
  }

  if (projects.length === 0) {
    return <div className="text-center py-10 text-gray-500">No projects found.</div>;
  }

  return (
    <div className="px-4 sm:px-8 py-6 space-y-12 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Project Reports (All Gantt Charts)
      </h1>

      {/* 🔹 Global Date Range Filter */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">📅 Global Date Range Filter</h3>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <label htmlFor="fromDate" className="text-sm font-medium text-blue-700 block mb-1">
              From:
            </label>
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-blue-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="toDate" className="text-sm font-medium text-blue-700 block mb-1">
              To:
            </label>
            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-blue-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleApplyFilter}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply Filter
          </button>
          <span className="text-sm text-blue-600">
            applies to all {projects.length} project charts
          </span>
        </div>
      </div>

      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-gray-50 shadow-lg rounded-2xl p-4 sm:p-6 space-y-4"
        >
          {/* Project Header */}
          <div className="bg-blue-100 p-3 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-700">
              <strong>Location:</strong> {project.location} |{" "}
              <strong>Status:</strong> {project.status}
            </p>
          </div>

          {/* Gantt Chart for this project */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-base font-semibold mb-3 text-gray-700">
              Project Timeline (Gantt Chart)
            </h3>
            <GanttChart
              projectId={project._id}
              fromDate={appliedFrom}
              toDate={appliedTo}
              minimal={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
