import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddActivity() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, status }); // Here you can send data to API or context
    navigate("/dashboard/activity"); // Navigate back to Activity page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Mantri Constructions
          </h1>
          <p className="text-gray-500 mt-1">
            Add a new activity to your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter activity title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition"
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
          <div className="flex justify-between mt-8 gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/activity")}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#2044E4] text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Save Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
