// src/frontend/AddLead.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddLead() {
  const navigate = useNavigate();
  const [lead, setLead] = useState({
    fullName: "",
    contactNo: "",
    nextVisit: "",
    visitDate: "",
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
    const newLead = { ...lead };
    console.log("New Lead Added:", newLead);
    alert(`Lead "${lead.fullName}" added successfully!`);
    navigate("/dashboard/leads");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Add New Lead
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Fill out the form below to add a new lead
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={lead.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4]"
            />
          </div>

          {/* Contact No */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactNo"
              value={lead.contactNo}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4]"
            />
          </div>

          {/* Visit Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Visit Date
            </label>
            <input
              type="date"
              name="visitDate"
              value={lead.visitDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4]"
            />
          </div>

          {/* Next Visit Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Next Visit Date
            </label>
            <input
              type="date"
              name="nextVisit"
              value={lead.nextVisit}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4]"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Note
            </label>
            <input
              type="text"
              name="note"
              value={lead.note}
              onChange={handleChange}
              placeholder="Add a note"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4]"
            />
          </div>

          {/* Lead Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lead Type
            </label>
            <select
              name="leadType"
              value={lead.leadType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4]"
            >
              <option value="">Select Lead Type</option>
              <option value="Cold">Cold</option>
              <option value="Warm">Moderate</option>
              <option value="Hot">Hot</option>
            </select>
          </div>

          {/* Is Converted */}
          <div className="flex items-center space-x-2 md:col-span-2">
            <input
              type="checkbox"
              name="isConverted"
              checked={lead.isConverted}
              onChange={handleChange}
              className="w-4 h-4 text-[#2044E4] focus:ring-[#2044E4] border-gray-300 rounded"
            />
            <label className="font-semibold text-gray-700">Is Converted</label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#2044E4] text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
            >
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
