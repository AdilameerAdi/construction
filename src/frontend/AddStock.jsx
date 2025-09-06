// src/frontend/AddStock.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddStock() {
  const navigate = useNavigate();

  const [newStock, setNewStock] = useState({
    date: "",
    project: "",
    material: "",
    type: "Inward",
    vendor: "",
    quantity: "",
    stock: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Stock Added:", newStock);
    alert("Stock added successfully!");
    setNewStock({
      date: "",
      project: "",
      material: "",
      type: "Inward",
      vendor: "",
      quantity: "",
      stock: ""
    });
    navigate("/dashboard/stock-management"); // go back to stock page
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add/Edit Stock Transaction</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date*</label>
          <input
            type="date"
            name="date"
            value={newStock.date}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Project */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Project*</label>
          <input
            type="text"
            name="project"
            value={newStock.project}
            onChange={handleChange}
            placeholder="Project Name"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Material */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Material*</label>
          <input
            type="text"
            name="material"
            value={newStock.material}
            onChange={handleChange}
            placeholder="Material Name"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Inward/Outward */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Inward/Outward*</label>
          <select
            name="type"
            value={newStock.type}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option>Inward</option>
            <option>Outward</option>
          </select>
        </div>

        {/* Vendor/Contractor */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Vendor/Contractor*</label>
          <input
            type="text"
            name="vendor"
            value={newStock.vendor}
            onChange={handleChange}
            placeholder="Vendor/Contractor"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Quantity*</label>
          <input
            type="number"
            name="quantity"
            value={newStock.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Stock*</label>
          <input
            type="number"
            name="stock"
            value={newStock.stock}
            onChange={handleChange}
            placeholder="Total Stock"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/stock-management")}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Stock
          </button>
        </div>
      </form>
    </div>
  );
}
