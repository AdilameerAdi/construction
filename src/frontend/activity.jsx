import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Activity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch activities from backend API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/activities"); // your API URL
        if (!response.ok) throw new Error("Failed to fetch activities");

        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Redirect to AddActivity page
  const goToAddActivity = () => {
    navigate("/dashboard/add-activity");
  };

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/dashboard/edit-activity/${id}`); // make edit page later
  };

  // Handle toggle status
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Deactive" : "Active";

    try {
      const response = await fetch(`http://localhost:5000/api/activities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      // update state locally
      setActivities((prev) =>
        prev.map((act) =>
          act._id === id ? { ...act, status: newStatus } : act
        )
      );
    } catch (err) {
      console.error(err);
      alert("Could not update status");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/activities/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete activity");

      setActivities((prev) => prev.filter((act) => act._id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete activity");
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Page Heading */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Activity
        </h1>
        <button
          onClick={goToAddActivity}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2044E4] text-white rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          <FaPlus className="text-sm" /> 
          <span className="font-medium">Add New Activity</span>
        </button>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#F4F6FB]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                #
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Activity Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  Loading activities...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-red-500">
                  {error}
                </td>
              </tr>
            ) : activities.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-10 text-gray-400 italic text-base"
                >
                  No activities found.
                </td>
              </tr>
            ) : (
              activities.map((activity, index) => (
                <tr
                  key={activity._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{activity.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-4 text-lg">
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(activity._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    {/* Toggle Status */}
                    <button
                      onClick={() => handleToggleStatus(activity._id, activity.status)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      {activity.status === "Active" ? <FaToggleOn /> : <FaToggleOff />}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(activity._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
