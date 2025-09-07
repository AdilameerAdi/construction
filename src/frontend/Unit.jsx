// src/pages/Unit.jsx
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate

export default function Unit() {
  const [units, setUnits] = useState([]);
  const navigate = useNavigate(); // <-- initialize navigate

  const goToAddUnit = () => {
    navigate("/dashboard/add-unit"); // <-- navigate to AddUnit page
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      {/* Page Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Units</h1>
        <button
          onClick={goToAddUnit} // <-- use navigate function
          className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Add New Unit
        </button>
      </div>

      {/* Units Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">#</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Unit Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {units.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-6 text-gray-400 italic">
                  No units found.
                </td>
              </tr>
            ) : (
              units.map((unit, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{unit}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
