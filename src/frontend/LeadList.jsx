// src/frontend/LeadList.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeadList() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([
    {
      id: 1,
      date: new Date().toLocaleString("en-GB"),
      fullName: "Alice Johnson",
      contactNo: "03001234567",
      nextVisit: "2025-09-10 14:00",
      note: "Interested in premium package",
      leadType: "Hot",
      isConverted: false,
    },
  ]);

  const handleDelete = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Lead Records</h2>

      {/* Add New Lead Button */}
      <div className="mb-4 text-right">
        <button
          onClick={() => navigate("/dashboard/add-lead")}
          className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
        >
          Add New Lead
        </button>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr className="text-center">
              <th className="px-4 py-2 border">Date/Time</th>
              <th className="px-4 py-2 border">Full Name</th>
              <th className="px-4 py-2 border">Contact No</th>
              <th className="px-4 py-2 border">Next Visit</th>
              <th className="px-4 py-2 border">Note</th>
              <th className="px-4 py-2 border">Lead Type</th>
              <th className="px-4 py-2 border">Is Converted</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="text-center">
                <td className="px-4 py-2 border">{lead.date}</td>
                <td className="px-4 py-2 border">{lead.fullName}</td>
                <td className="px-4 py-2 border">{lead.contactNo}</td>
                <td className="px-4 py-2 border">{lead.nextVisit}</td>
                <td className="px-4 py-2 border">{lead.note}</td>
                <td className="px-4 py-2 border">{lead.leadType}</td>
                <td className="px-4 py-2 border">{lead.isConverted ? "Yes" : "No"}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center px-4 py-2 border text-gray-500">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
