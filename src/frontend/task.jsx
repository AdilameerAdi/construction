import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const goToAddTask = () => {
    navigate("/dashboard/addtask");
  };

  return (
    <div className="ml-6 mt-2 space-y-2">
      <button
        onClick={goToAddTask}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <FaPlus className="mr-2" /> Add New Task
      </button>
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Task Name</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center py-2">No Task found</td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{task}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
