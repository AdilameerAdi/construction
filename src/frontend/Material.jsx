// src/pages/Material.jsx
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Material() {
  const [materials, setMaterials] = useState([]);

  const addMaterial = () => {
    const newMaterial = prompt("Add new Material:");
    if (newMaterial) setMaterials([...materials, newMaterial]);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      {/* Page Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Material</h1>
        <button
          onClick={addMaterial}
          className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Add New Material
        </button>
      </div>

      {/* Material Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">#</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Material Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-6 text-gray-400 italic">
                  No materials found.
                </td>
              </tr>
            ) : (
              materials.map((material, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{material}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
