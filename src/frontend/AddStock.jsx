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
    setNewStock((prev) => ({ ...prev, [name]: value }));
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
    navigate("/dashboard/stock-management");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add/Edit Stock Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date*</label>
          <input
            type="date"
            name="date"
            value={newStock.date}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] outline-none"
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
            placeholder="Enter Project Name"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] outline-none"
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
            placeholder="Enter Material Name"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] outline-none"
          />
        </div>

        {/* Inward/Outward */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Inward/Outward*</label>
          <select
            name="type"
            value={newStock.type}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] outline-none"
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
            placeholder="Enter Vendor/Contractor"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] outline-none"
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
            placeholder="Enter Quantity"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] outline-none"
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
            placeholder="Enter Total Stock"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/stock-management")}
            className="px-5 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#2044E4] text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Add Stock
          </button>
        </div>
      </form>
    </div>
  );
}
