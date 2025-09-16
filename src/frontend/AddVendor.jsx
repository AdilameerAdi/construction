// src/frontend/AddVendor.js
import { useState } from "react";

export default function AddVendor() {
  const [formData, setFormData] = useState({
    name: "",
    gst: "",
    contact: "",
    bank: "",
    accountNo: "",
    ifsc: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const saved = await res.json();
        console.log("Vendor saved:", saved);
        alert("Vendor submitted successfully!");

        // reset form
        setFormData({
          name: "",
          gst: "",
          contact: "",
          bank: "",
          accountNo: "",
          ifsc: "",
        });
      } else {
        const err = await res.json();
        console.error("Failed to save vendor:", err);
        alert("Error: " + (err.error || "Failed to save vendor"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-6 sm:py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Add Vendor</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Name */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* GST */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">GST No.</label>
            <input
              type="text"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">Contact Details</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">Bank</label>
            <input
              type="text"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Account No */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">Account No.</label>
            <input
              type="text"
              name="accountNo"
              value={formData.accountNo}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* IFSC */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">IFSC Code</label>
            <input
              type="text"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
