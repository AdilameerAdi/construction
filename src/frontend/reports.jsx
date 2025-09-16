import { useState, useEffect } from "react";
import GanttChart from "./Gantchart"; // ✅ import your existing chart component

export default function Reports() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading Reports...</div>;
  }

  if (projects.length === 0) {
    return <div className="text-center py-10 text-gray-500">No projects found.</div>;
  }

  return (
    <div className="px-4 sm:px-8 py-6 space-y-12 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Project Reports (All Gantt Charts)</h1>

      {projects.map((project) => (
        <div key={project._id} className="bg-gray-50 shadow-lg rounded-2xl p-4 sm:p-6 space-y-4">
          {/* Project Header */}
          <div className="bg-blue-100 p-3 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-700">
              <strong>Location:</strong> {project.location} |{" "}
              <strong>Status:</strong> {project.status}
            </p>
          </div>

          {/* Gantt Chart for this project */}
          <GanttChart projectId={project._id} />
        </div>
      ))}
    </div>
  );
}
