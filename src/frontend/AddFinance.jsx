import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFinance() {
  const navigate = useNavigate();

  const [entry, setEntry] = useState({
    date: "",
    project: "General",
    type: "Credit",
    creditHead: "Other",
    description: "",
    mode: "Cheque",
    chequeNo: "",
    amount: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("New Finance Entry:", entry);
    alert("Finance entry added!");
    navigate("/dashboard/project-finance"); // Navigate back to Project Finance table
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add/Edit Transaction</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="col-span-1 w-full">
          Date*:
          <input type="date" name="date" value={entry.date} onChange={handleChange} required className="border w-full px-3 py-2 rounded-lg" />
        </label>

        <label className="col-span-1 w-full">
          Project*:
          <input type="text" name="project" value={entry.project} onChange={handleChange} required className="border w-full px-3 py-2 rounded-lg" />
        </label>

        <label className="col-span-1 w-full">
          Credit/Debit:
          <select name="type" value={entry.type} onChange={handleChange} className="border w-full px-3 py-2 rounded-lg">
            <option>Credit</option>
            <option>Debit</option>
          </select>
        </label>

        <label className="col-span-1 w-full">
          Credit Head:
          <select name="creditHead" value={entry.creditHead} onChange={handleChange} className="border w-full px-3 py-2 rounded-lg">
            <option>Other</option>
            <option>Salary</option>
            <option>Investment</option>
          </select>
        </label>

        <label className="col-span-2 w-full">
          Description:
          <input type="text" name="description" value={entry.description} onChange={handleChange} className="border w-full px-3 py-2 rounded-lg" />
        </label>

        <label className="col-span-1 w-full">
          Mode Of Payment*:
          <select name="mode" value={entry.mode} onChange={handleChange} className="border w-full px-3 py-2 rounded-lg">
            <option>Cheque</option>
            <option>Cash</option>
            <option>Bank Transfer</option>
          </select>
        </label>

        <label className="col-span-1 w-full">
          Cheque No.*:
          <input type="text" name="chequeNo" value={entry.chequeNo} onChange={handleChange} className="border w-full px-3 py-2 rounded-lg" />
        </label>

        <label className="col-span-1 w-full">
          Amount*:
          <input type="number" name="amount" value={entry.amount} onChange={handleChange} required className="border w-full px-3 py-2 rounded-lg" />
        </label>

        <button type="submit" className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Save Finance Entry
        </button>
      </form>
    </div>
  );
}
