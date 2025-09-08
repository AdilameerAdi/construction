import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTasks, FaListAlt, FaClipboardList } from "react-icons/fa";

export default function AddTask() {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/activities");
        const data = await res.json();
        setActivities(data); // assuming API returns [{ _id, title }]
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  // ✅ Save Task API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activity, title, status }),
      });

      if (res.ok) {
        const newTask = await res.json();
        console.log("Task saved:", newTask);

        // redirect back to task dashboard
        navigate("/dashboard/task");
      } else {
        const err = await res.json();
        console.error("Failed to save task:", err);
        alert("Error saving task: " + err.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaTasks className="text-blue-600" /> MANTRI CONSTRUCTIONS
          </h1>
          <p className="text-gray-500 mt-1">Add a new task to your dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Activity Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Activity</label>
            <div className="relative">
              <FaListAlt className="absolute left-3 top-3 text-gray-400" />
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              >
                <option value="" disabled>
                  Select activity
                </option>
                {activities.map((act) => (
                  <option key={act._id} value={act._id}>
                    {act.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <div className="relative">
              <FaClipboardList className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option>Active</option>
              <option>Deactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6 gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/task")}
              className="flex-1 px-4 py-3 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
