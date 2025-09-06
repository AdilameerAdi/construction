// src/frontend/StockManagement.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StockManagement() {
  const navigate = useNavigate();

  // Sample stock entries
  const [stockEntries, setStockEntries] = useState([
    {
      id: 1,
      date: "03/09/2025",
      project: "Twin Tower",
      material: "Cement",
      type: "Inward",
      vendor: "ABC Supplier",
      quantity: 50,
      stock: 150
    }
  ]);

  // Filter states
  const [filter, setFilter] = useState({
    project: "",
    material: "",
    type: "",
    vendor: ""
  });
const handleSearch = () => {
  // Example: filter stockEntries based on filter object
  const filteredData = stockEntries.filter(entry => {
    return (
      (filter.project === "" || entry.project === filter.project) &&
      (filter.material === "" || entry.material === filter.material) &&
      (filter.type === "" || entry.type === filter.type) &&
      (filter.vendor === "" || entry.vendor === filter.vendor)
    );
  });

 setFilter(filteredData); // Display filtered results
};

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredEntries = stockEntries.filter(entry => {
    return (
      (!filter.project || entry.project.toLowerCase().includes(filter.project.toLowerCase())) &&
      (!filter.material || entry.material.toLowerCase().includes(filter.material.toLowerCase())) &&
      (!filter.type || entry.type === filter.type) &&
      (!filter.vendor || entry.vendor.toLowerCase().includes(filter.vendor.toLowerCase()))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Stocks</h2>

      {/* Add New Stock Button */}
      <div className="mb-4 text-right">
        <button
          onClick={() => navigate("/dashboard/add-stock")}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Add New
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-lg rounded-2xl p-4 mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          name="project"
          placeholder="Project"
          value={filter.project}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          name="material"
          placeholder="Material"
          value={filter.material}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-lg"
        />
        <select
          name="type"
          value={filter.type}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Inward/Outward</option>
          <option value="Inward">Inward</option>
          <option value="Outward">Outward</option>
        </select>
        <input
          type="text"
          name="vendor"
          placeholder="Vendor/Contractor"
          value={filter.vendor}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-lg"
        />
         <button
    onClick={handleSearch}
    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
  >
    Search
  </button>
        <button
          onClick={() => setFilter({ project: "", material: "", type: "", vendor: "" })}
          className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Date/Time</th>
              <th className="px-4 py-2 border">Project</th>
              <th className="px-4 py-2 border">Material</th>
              <th className="px-4 py-2 border">Inward/Outward</th>
              <th className="px-4 py-2 border">Vendor/Contractors</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map(entry => (
              <tr key={entry.id} className="text-center">
                <td className="px-4 py-2 border">{entry.id}</td>
                <td className="px-4 py-2 border">{entry.date}</td>
                <td className="px-4 py-2 border">{entry.project}</td>
                <td className="px-4 py-2 border">{entry.material}</td>
                <td className="px-4 py-2 border">{entry.type}</td>
                <td className="px-4 py-2 border">{entry.vendor}</td>
                <td className="px-4 py-2 border">{entry.quantity}</td>
                <td className="px-4 py-2 border">{entry.stock}</td>
                <td className="px-4 py-2 border">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
