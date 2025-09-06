import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState({
    name: "",
    location: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Project Added:", newProject);
    alert(`Project "${newProject.name}" added successfully!`);
    setNewProject({ name: "", location: "", status: "Pending" });
    navigate("/dashboard"); // go back to dashboard after submit
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Add a New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Project Name</label>
          <input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Project Location</label>
          <input
            type="text"
            name="location"
            value={newProject.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            name="status"
            value={newProject.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Pending</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={() => navigate("/dashboard")} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Project</button>
        </div>
      </form>
    </div>
  );
}
