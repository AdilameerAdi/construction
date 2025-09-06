// src/frontend/AddCustomer.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    fullName: "",
    primaryContact: "",
    secondaryContact: "",
    aadharNo: "",
    address: "",
    unitNo: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Customer Added:", customer);
    alert(`Customer "${customer.fullName}" added successfully!`);
    navigate("/dashboard/customers"); // go back to customer list page
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Add New Customer</h2>

      <div className="bg-white shadow-xl rounded-3xl p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={customer.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Primary Contact */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Primary Contact*</label>
            <input
              type="text"
              name="primaryContact"
              value={customer.primaryContact}
              onChange={handleChange}
              placeholder="Enter primary contact"
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Secondary Contact */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Secondary Contact</label>
            <input
              type="text"
              name="secondaryContact"
              value={customer.secondaryContact}
              onChange={handleChange}
              placeholder="Enter secondary contact"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Aadhar No */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Aadhar No</label>
            <input
              type="text"
              name="aadharNo"
              value={customer.aadharNo}
              onChange={handleChange}
              placeholder="Enter Aadhar number"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col sm:col-span-2">
            <label className="mb-2 font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition w-full"
            />
          </div>

          {/* Unit No */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Unit No</label>
            <input
              type="text"
              name="unitNo"
              value={customer.unitNo}
              onChange={handleChange}
              placeholder="Enter unit number"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Amount*</label>
            <input
              type="number"
              name="amount"
              value={customer.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
