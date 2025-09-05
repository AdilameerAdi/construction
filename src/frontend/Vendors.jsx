// src/pages/Vendors.jsx
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  const addVendor = () => {
    const newVendor = prompt("Add new Vendor:");
    if (newVendor) setVendors([...vendors, newVendor]);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      {/* Page Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Vendors</h1>
        <button
          onClick={addVendor}
          className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Add New Vendor
        </button>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">#</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Vendor Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-6 text-gray-400 italic">
                  No vendors found.
                </td>
              </tr>
            ) : (
              vendors.map((vendor, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{vendor}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
