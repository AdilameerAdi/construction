import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddActivity() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, status }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(" Activity saved:", data);

        // Navigate back after success
        navigate("/dashboard/activity");
      } else {
        console.error(" Failed to save activity:", response.statusText);
      }
    } catch (error) {
      console.error("⚠️ Error saving activity:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-6 sm:py-12 px-4 sm:px-6">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
            Mantri Constructions
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Add a new activity to your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter activity title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition-colors"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition-colors"
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
          <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/activity")}
              className="w-full sm:flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base bg-[#2044E4] text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Save Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

