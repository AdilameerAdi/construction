// src/frontend/Material.jsx
import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Material() {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  const goToAddMaterial = () => {
    navigate("/dashboard/add-material");
  };

  // Dummy API fetch (replace with real API later)
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        // Example response from backend
        const response = await fetch("https://dummyjson.com/products?limit=3");
        const data = await response.json();

        // Map API data into our structure
        const mapped = data.products.map((item, idx) => ({
          id: idx + 1,
          activity: `Activity ${idx + 1}`,
          name: item.title,
          unit: `Unit ${idx + 1}`,
          status: idx % 2 === 0 ? "Active" : "Inactive",
        }));

        setMaterials(mapped);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      setMaterials(materials.filter((m) => m.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-material/${id}`);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      {/* Page Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Material</h1>
        <button
          onClick={goToAddMaterial}
          className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Add New Material
        </button>
      </div>

      {/* Materials Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">#</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Activity</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Unit</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400 italic">
                  No materials found.
                </td>
              </tr>
            ) : (
              materials.map((material, index) => (
                <tr key={material.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{material.activity}</td>
                  <td className="px-6 py-3">{material.name}</td>
                  <td className="px-6 py-3">{material.unit}</td>
                  <td
                    className={`px-6 py-3 font-medium ${
                      material.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {material.status}
                  </td>
                  <td className="px-6 py-3 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(material.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(material.id)}
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
