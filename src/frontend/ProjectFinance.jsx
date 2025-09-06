// src/frontend/ProjectFinance.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectFinance() {
  const navigate = useNavigate();

  // Sample finance entries
  const [financeEntries, setFinanceEntries] = useState([
    {
      id: 1,
      date: "01/09/2025",
      project: "General",
      type: "Credit",
      mode: "Cheque",
      creditHead: "Other",
      description: "Initial Funding",
      chequeNo: "123456",
      amount: 100000
    }
  ]);

  // Filter states
  const [filter, setFilter] = useState({
    date: "",
    project: "",
    type: "",
    mode: ""
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  // Filtered entries
  const filteredEntries = financeEntries.filter(entry => {
    return (
      (!filter.date || entry.date === filter.date) &&
      (!filter.project || entry.project.toLowerCase().includes(filter.project.toLowerCase())) &&
      (!filter.type || entry.type === filter.type) &&
      (!filter.mode || entry.mode.toLowerCase().includes(filter.mode.toLowerCase()))
    );
  });

  // Total credit/debit
  const totalCredit = financeEntries
    .filter(e => e.type === "Credit")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalDebit = financeEntries
    .filter(e => e.type === "Debit")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Project Finance</h2>

      {/* Add New Finance Button */}
      <div className="mb-4 text-right">
        <button
          onClick={() => navigate("/dashboard/add-finance")}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Add New Finance
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-lg rounded-2xl p-4 mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          name="project"
          placeholder="Select Project"
          value={filter.project}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-lg"
        />
        <select
          name="type"
          value={filter.type}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Credit/Debit</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        <input
          type="text"
          name="mode"
          placeholder="Mode of Payment"
          value={filter.mode}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-lg"
        />
        <button
          onClick={() => setFilter({ date: "", project: "", type: "", mode: "" })}
          className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {/* Summary */}
      <div className="flex justify-between mb-4 text-lg font-semibold">
        <span className="text-green-600">Total Credit: {totalCredit}</span>
        <span className="text-red-600">Total Debit: {totalDebit}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Project</th>
              <th className="px-4 py-2 border">Credit/Debit</th>
              <th className="px-4 py-2 border">Credit Head</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Mode</th>
              <th className="px-4 py-2 border">Cheque No.</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map(entry => (
              <tr key={entry.id} className="text-center">
                <td className="px-4 py-2 border">{entry.id}</td>
                <td className="px-4 py-2 border">{entry.date}</td>
                <td className="px-4 py-2 border">{entry.project}</td>
                <td className="px-4 py-2 border">{entry.type}</td>
                <td className="px-4 py-2 border">{entry.creditHead}</td>
                <td className="px-4 py-2 border">{entry.description}</td>
                <td className="px-4 py-2 border">{entry.mode}</td>
                <td className="px-4 py-2 border">{entry.chequeNo}</td>
                <td className="px-4 py-2 border">{entry.amount}</td>
                <td className="px-4 py-2 border">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
