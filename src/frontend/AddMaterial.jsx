// src/frontend/AddMaterial.jsx
import { useState } from "react";

export default function AddMaterial() {
  const [formData, setFormData] = useState({
    activity: "",
    name: "",
    unit: "",
  });

  // Placeholder data (replace with API fetch later)
  const activities = ["Activity 1", "Activity 2", "Activity 3"];
  const units = ["Unit 1", "Unit 2", "Unit 3"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with API call to save material
    alert("Material added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Add Material
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Fill out the form below to add a new material
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Activity Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Activity <span className="text-red-500">*</span>
            </label>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4] 
                         focus:border-[#2044E4] transition"
              required
            >
              <option value="">Select Activity</option>
              {activities.map((act, index) => (
                <option key={index} value={act}>
                  {act}
                </option>
              ))}
            </select>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter material name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4] 
                         focus:border-[#2044E4] transition"
              required
            />
          </div>

          {/* Unit Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Unit <span className="text-red-500">*</span>
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4] 
                         focus:border-[#2044E4] transition"
              required
            >
              <option value="">Select Unit</option>
              {units.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#2044E4] text-white py-3 rounded-lg 
                         font-medium shadow-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
