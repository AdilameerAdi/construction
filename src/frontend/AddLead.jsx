// src/frontend/AddLead.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddLead() {
  const navigate = useNavigate();
  const [lead, setLead] = useState({
    fullName: "",
    contactNo: "",
    nextVisit: "",
    note: "",
    leadType: "",
    isConverted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLead((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLead = {
      ...lead,
      date: new Date().toLocaleString("en-GB"), // Current date/time
    };
    console.log("New Lead Added:", newLead);
    alert(`Lead "${lead.fullName}" added successfully!`);
    navigate("/dashboard/leads"); // Go back to lead list
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Lead
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white shadow-lg rounded-2xl p-6"
      >
        <input
          type="text"
          name="fullName"
          value={lead.fullName}
          onChange={handleChange}
          placeholder="Full Name*"
          required
          className="border px-4 py-2 rounded-lg"
        />
        <input
          type="text"
          name="contactNo"
          value={lead.contactNo}
          onChange={handleChange}
          placeholder="Contact No*"
          required
          className="border px-4 py-2 rounded-lg"
        />
        <input
          type="date"
          name="nextVisit"
          value={lead.nextVisit}
          onChange={handleChange}
          placeholder="Next Visit Date"
          className="border px-4 py-2 rounded-lg"
        />
        <input
          type="text"
          name="note"
          value={lead.note}
          onChange={handleChange}
          placeholder="Note"
          className="border px-4 py-2 rounded-lg"
        />
        <select
          name="leadType"
          value={lead.leadType}
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Select Lead Type</option>
          <option value="Cold">low</option>
          <option value="Warm">Medium</option>
          <option value="Hot">High</option>
        </select>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isConverted"
            checked={lead.isConverted}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label>Is Converted</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 col-span-1 sm:col-span-2"
        >
          Add Lead
        </button>
      </form>
    </div>
  );
}
