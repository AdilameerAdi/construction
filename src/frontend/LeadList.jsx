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
    {
      id: 2,
      date: "2025-09-05 10:30",
      fullName: "Bob Smith",
      contactNo: "03007654321",
      nextVisit: "2025-09-12 11:00",
      note: "Interested in basic package",
      leadType: "Warm",
      isConverted: false,
    },
  ]);

  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
    nextVisit: "",
    leadType: "",
  });

  const handleDelete = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const leadDate = new Date(lead.date);
    const fromDate = filter.fromDate ? new Date(filter.fromDate) : null;
    const toDate = filter.toDate ? new Date(filter.toDate) : null;
    const nextVisit = filter.nextVisit ? new Date(filter.nextVisit) : null;

    return (
      (!fromDate || leadDate >= fromDate) &&
      (!toDate || leadDate <= toDate) &&
      (!nextVisit || new Date(lead.nextVisit) <= nextVisit) &&
      (!filter.leadType || lead.leadType === filter.leadType)
    );
  });

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

      {/* Filters */}
      <div className="bg-white shadow-lg rounded-2xl p-4 mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block mb-1 font-medium">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={filter.fromDate}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">To Date</label>
          <input
            type="date"
            name="toDate"
            value={filter.toDate}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Next Visit Before</label>
          <input
            type="date"
            name="nextVisit"
            value={filter.nextVisit}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Lead Type</label>
          <select
            name="leadType"
            value={filter.leadType}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">All</option>
            
            <option value="Cold">Cold</option>
            <option value="Warm">moderate</option>
            <option value="Hot">Hot</option>
          </select>
        </div>
        <div className="flex gap-2 items-end">
          <button
            onClick={() =>
              setFilter({ fromDate: "", toDate: "", nextVisit: "", leadType: "" })
            }
            className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
          >
            Reset
          </button>
          <button
            onClick={() => console.log("Search triggered")}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
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
            {filteredLeads.map((lead) => (
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
            {filteredLeads.length === 0 && (
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
