// src/pages/Vendors.jsx
import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  const goToAddVendor = () => {
    navigate("/dashboard/add-vendor");
  };

  // ✅ Fetch vendors from backend API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/vendors");
        if (!res.ok) throw new Error("Failed to fetch vendors");
        const data = await res.json();
        setVendors(data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
      }
    };
    fetchVendors();
  }, []);

  // ✅ Handle edit (navigate to edit page with vendor id)
  const handleEdit = (id) => {
    navigate(`/dashboard/edit-vendor/${id}`);
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/vendors/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete vendor");

      // remove vendor from state
      setVendors((prev) => prev.filter((vendor) => vendor._id !== id));
    } catch (err) {
      console.error("Error deleting vendor:", err);
      alert("Could not delete vendor");
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      {/* Page Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Vendors</h1>
        <button
          onClick={goToAddVendor}
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
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">GST</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Contact</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Bank</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Account No.</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">IFSC</th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400 italic">
                  No vendors found
                </td>
              </tr>
            ) : (
              vendors.map((vendor, index) => (
                <tr key={vendor._id || index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{vendor.name}</td>
                  <td className="px-6 py-3">{vendor.gst}</td>
                  <td className="px-6 py-3">{vendor.contact}</td>
                  <td className="px-6 py-3">{vendor.bank}</td>
                  <td className="px-6 py-3">{vendor.accountNo}</td>
                  <td className="px-6 py-3">{vendor.ifsc}</td>
                  <td className="px-6 py-3 text-center flex gap-3 justify-center">
                    <button
                      onClick={() => handleEdit(vendor._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(vendor._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
