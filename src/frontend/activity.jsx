import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Activity() {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  // Redirect to AddActivity page
  const goToAddActivity = () => {
    navigate("/dashboard/add-activity");
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
                Activity Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="text-center py-10 text-gray-400 italic text-base"
                >
                  No activities found.
                </td>
              </tr>
            ) : (
              activities.map((activity, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{activity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
