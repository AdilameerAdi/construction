// src/pages/Unit.jsx
import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Unit() {
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();

  const goToAddUnit = () => {
    navigate("/dashboard/add-unit");
  };

  // Dummy API call
  useEffect(() => {
    // Replace this with your real API later
    fetch("https://jsonplaceholder.com/posts") // dummy API
      .then((res) => res.json())
      .then((data) => {
        // Example: map dummy data into { id, unitName, status }
        const dummyUnits = data.slice(0, 5).map((item, i) => ({
          id: item.id,
          unitName: item.title,
          status: i % 2 === 0 ? "Active" : "Inactive", // alternate statuses
        }));
        setUnits(dummyUnits);
      })
      .catch((err) => console.error("Error fetching units:", err));
  }, []);

  const handleEdit = (id) => {
    alert(`Edit unit with ID: ${id}`);
    // navigate(`/dashboard/edit-unit/${id}`) if you make an edit page
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this unit?")) {
      setUnits(units.filter((unit) => unit.id !== id));
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      {/* Page Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Units</h1>
        <button
          onClick={goToAddUnit}
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
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {units.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400 italic">
                  Loading units...
                </td>
              </tr>
            ) : (
              units.map((unit, index) => (
                <tr key={unit.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{unit.unitName}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        unit.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {unit.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center flex gap-3 justify-center">
                    <button
                      onClick={() => handleEdit(unit.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(unit.id)}
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
