// src/frontend/CustomerList.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";

export default function CustomerList() {
  const location = useLocation();
  const projectId = location.state?.projectId;
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch customers from backend API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const url = projectId 
          ? `http://localhost:8000/api/customers?project=${projectId}`
          : "http://localhost:8000/api/customers";
        const response = await axios.get(url);
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [projectId]);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/customers/${id}`);
      setCustomers(customers.filter((c) => c._id !== id)); // ✅ remove from UI after delete
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-6 text-gray-600 p-4 sm:p-6">Loading customers...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-100">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Customer Records</h2>
        <button
          onClick={() => navigate("/dashboard/add-customer", { state: { projectId } })}
          className="w-full sm:w-auto bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition"
        >
          + Add New Customer
        </button>
      </div>

      {/* Desktop Table View - Hidden on small screens */}
      <div className="hidden lg:block overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-gray-700">Date/Time</th>
              <th className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-gray-700">Full Name</th>
              <th className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-gray-700">Primary Contact</th>
              <th className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-gray-700">Secondary Contact</th>
              <th className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-gray-700">Aadhar No</th>
              <th className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-gray-700">Address</th>
              <th className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-gray-700">Unit No</th>
              <th className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id} className="text-center hover:bg-gray-50">
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm">
                  {new Date(c.datetime).toLocaleString()}
                </td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-medium">{c.fullName}</td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm">{c.primaryContact}</td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm">{c.secondaryContact || "-"}</td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm">{c.aadharNo}</td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm">{c.address}</td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm">{c.unitNo}</td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold">₹{c.amount}</td>
                <td className="px-3 xl:px-4 py-3 border">
                  <button
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded text-xs xl:text-sm transition"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center px-4 py-6 border text-gray-500 italic"
                >
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tablet Table View - Visible on medium screens */}
      <div className="hidden sm:block lg:hidden overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-3 border text-xs font-semibold text-gray-700">Name</th>
              <th className="px-2 py-3 border text-xs font-semibold text-gray-700">Contact</th>
              <th className="px-2 py-3 border text-xs font-semibold text-gray-700">Unit</th>
              <th className="px-2 py-3 border text-xs font-semibold text-gray-700">Amount</th>
              <th className="px-2 py-3 border text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id} className="text-center hover:bg-gray-50">
                <td className="px-2 py-3 border text-xs">
                  <div className="font-medium">{c.fullName}</div>
                  <div className="text-gray-500 text-xs">Aadhar: {c.aadharNo}</div>
                </td>
                <td className="px-2 py-3 border text-xs">
                  <div>{c.primaryContact}</div>
                  {c.secondaryContact && (
                    <div className="text-gray-500">{c.secondaryContact}</div>
                  )}
                </td>
                <td className="px-2 py-3 border text-xs">{c.unitNo}</td>
                <td className="px-2 py-3 border text-xs font-semibold">₹{c.amount}</td>
                <td className="px-2 py-3 border">
                  <button
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded text-xs transition"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center px-4 py-6 border text-gray-500 italic"
                >
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible only on small screens */}
      <div className="sm:hidden space-y-4">
        {customers.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500 italic">
            No customers found
          </div>
        ) : (
          customers.map((c) => (
            <div key={c._id} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">{c.fullName}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                      Unit {c.unitNo}
                    </span>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded font-medium">
                      ₹{c.amount}
                    </span>
                  </div>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Primary Contact:</span>
                  <span className="text-gray-800 font-medium">{c.primaryContact}</span>
                </div>
                {c.secondaryContact && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Secondary Contact:</span>
                    <span className="text-gray-800 font-medium">{c.secondaryContact}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Aadhar No:</span>
                  <span className="text-gray-800 font-medium">{c.aadharNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Address:</span>
                  <span className="text-gray-800 font-medium text-right ml-2">{c.address}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-500">Date Added:</span>
                  <span className="text-gray-800 text-xs">
                    {new Date(c.datetime).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
