// src/frontend/Project2file.jsx
import { useState, useEffect } from "react";

export default function Project2file() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedTasks, setSelectedTasks] = useState({}); // { taskId: true/false }

  // Fetch tasks from API
  useEffect(() => {
    fetch("https://your-api.com/tasks") // Replace with your real API
      .then((res) => res.json())
      .then((data) => {
        setTasks(data); 
        // data example: [{id:1, title:"Task 1", activity:"Activity 1"}, ...]
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle checkbox toggle
  const toggleTask = (taskId) => {
    setSelectedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Filter tasks by name
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Group tasks by activity
  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.activity]) acc[task.activity] = [];
    acc[task.activity].push(task);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Filter input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Task List grouped by Activity */}
      {Object.keys(groupedTasks).length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        Object.keys(groupedTasks).map((activity) => (
          <div key={activity} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{activity}</h2>
            <div className="space-y-2">
              {groupedTasks[activity].map((task) => (
                <label key={task.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!!selectedTasks[task.id]}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{task.title}</span>
                </label>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
