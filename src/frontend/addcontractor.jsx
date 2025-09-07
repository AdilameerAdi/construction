import { useState } from "react";

export default function AddContractor() {
  const [formData, setFormData] = useState({
    activity: "",
    name: "",
    pan: "",
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
    console.log(formData); // You can replace this with API call later
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Contractor Details
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Fill out the form below to add a new contractor
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Activity Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Activity <span className="text-red-500">*</span>
            </label>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition"
              required
            >
              <option value="">Select Activity</option>
              <option value="activity1">Activity 1</option>
              <option value="activity2">Activity 2</option>
              <option value="activity3">Activity 3</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter contractor name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition"
              required
            />
          </div>

          {/* PAN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              PAN
            </label>
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              placeholder="Enter PAN number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Details
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition"
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bank Details
            </label>
            <input
              type="text"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              placeholder="Enter bank name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition"
            />
          </div>

          {/* Account No */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account No.
            </label>
            <input
              type="text"
              name="accountNo"
              value={formData.accountNo}
              onChange={handleChange}
              placeholder="Enter account number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition"
            />
          </div>

          {/* IFSC */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              placeholder="Enter IFSC code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2044E4] focus:border-[#2044E4] transition"
            />
          </div>

          {/* Submit Button (full width row) */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#2044E4] text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
