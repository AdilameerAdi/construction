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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with API call to save vendor
    alert("Vendor submitted successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Vendor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* GST No. */}
        <div>
          <label className="block mb-1 font-medium">GST No.</label>
          <input
            type="text"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Contact Details */}
        <div>
          <label className="block mb-1 font-medium">Contact Details</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Bank Details */}
        <div>
          <label className="block mb-1 font-medium">Bank Details</label>
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Account No. */}
        <div>
          <label className="block mb-1 font-medium">Account No.</label>
          <input
            type="text"
            name="accountNo"
            value={formData.accountNo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* IFSC Code */}
        <div>
          <label className="block mb-1 font-medium">IFSC Code</label>
          <input
            type="text"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
