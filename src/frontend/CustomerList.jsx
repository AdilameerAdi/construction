import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([
    {
      id: 1,
      date: new Date().toLocaleString("en-GB"),
      fullName: "John Doe",
      primaryContact: "03001234567",
      secondaryContact: "03007654321",
      aadharNo: "1234-5678-9012",
      address: "123 Main Street",
      unitNo: "A-101",
      amount: 50000,
    },
  ]);

  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Customer Records</h2>

      {/* Add New Customer Button */}
      <div className="mb-4 text-right">
        <button
          onClick={() => navigate("/dashboard/addcustomer")}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Add New Customer
        </button>
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Date/Time</th>
              <th className="px-4 py-2 border">Full Name</th>
              <th className="px-4 py-2 border">Primary Contact</th>
              <th className="px-4 py-2 border">Secondary Contact</th>
              <th className="px-4 py-2 border">Aadhar No</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Unit No</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="text-center">
                <td className="px-4 py-2 border">{c.date}</td>
                <td className="px-4 py-2 border">{c.fullName}</td>
                <td className="px-4 py-2 border">{c.primaryContact}</td>
                <td className="px-4 py-2 border">{c.secondaryContact}</td>
                <td className="px-4 py-2 border">{c.aadharNo}</td>
                <td className="px-4 py-2 border">{c.address}</td>
                <td className="px-4 py-2 border">{c.unitNo}</td>
                <td className="px-4 py-2 border">{c.amount}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center px-4 py-2 border text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
