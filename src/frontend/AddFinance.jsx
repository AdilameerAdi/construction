import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFinance() {
  const navigate = useNavigate();

  const [entry, setEntry] = useState({
    date: "",
    project: "General",
    type: "Credit/debit",
    creditHead: "Other",
    creditOption: "Customer/other",
    debitOption: "",
    customer: "Select Customer",
    contractor: "Contractor 1",
    vendor: "Vendor 1",
    description: "",
    mode: "Cheque",
    paymentRef: "",
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
    navigate("/dashboard/project-finance");
  };

  const getPaymentLabel = () => {
    switch (entry.mode) {
      case "Cheque": return "Cheque No.";
      case "Account Pay": return "Transaction ID";
      case "Cash":
      case "Major Cash":
        return "Receipt No.";
      default: return "Reference";
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-3xl p-10 border border-blue-100">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900 tracking-wide">Add / Edit Transaction</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* DATE & PROJECT */}
        <div className="col-span-1 md:col-span-1">
          <label className="block mb-2 font-medium text-blue-800">Date*</label>
          <input
            type="date"
            name="date"
            value={entry.date}
            onChange={handleChange}
            required
            className="border border-blue-300 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
          />
        </div>

        <div className="col-span-1 md:col-span-1">
          <label className="block mb-2 font-medium text-blue-800">Project*</label>
          <select
            name="project"
            value={entry.project}
            onChange={handleChange}
            className="border border-blue-300 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
          >
            <option>General</option>
            <option>Project 1</option>
            <option>Project 2</option>
          </select>
        </div>

        {/* TRANSACTION TYPE */}
        <div className="col-span-1 md:col-span-1">
          <label className="block mb-2 font-medium text-blue-800">Transaction Type*</label>
          <select
            name="type"
            value={entry.type}
            onChange={handleChange}
            className="border border-blue-300 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
          >
            <option>Credit/debit</option>
            <option>Credit</option>
            <option>Debit</option>
          </select>
        </div>

        {/* CREDIT OPTIONS */}
        {entry.type === "Credit" && (
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 font-medium text-blue-800">Credit Option</label>
            <select
              name="creditOption"
              value={entry.creditOption}
              onChange={handleChange}
              className="border border-blue-300 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
            >
              <option>Customer/other</option>
              <option>Customer</option>
              <option>Other</option>
            </select>

            {entry.creditOption === "Customer" && (
              <div className="mt-3">
                <label className="block mb-2 font-medium text-blue-800">Select Customer</label>
                <select
                  name="customer"
                  value={entry.customer}
                  onChange={handleChange}
                  className="border border-blue-300 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
                >
                  <option>Select Customer</option>
                  <option>Customer 1</option>
                  <option>Customer 2</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* DEBIT OPTIONS */}
        {entry.type === "Debit" && (
          <div className="col-span-1 md:col-span-2 mt-2">
            <p className="mb-2 font-medium text-blue-800">Debit Option</p>

            <div className="flex flex-col gap-3">
              {/* Labour */}
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center text-blue-800">
                  <input
                    type="radio"
                    name="debitOption"
                    value="Labour"
                    checked={entry.debitOption === "Labour"}
                    onChange={handleChange}
                    className="mr-2 accent-blue-500"
                  />
                  Labour
                </label>
                {entry.debitOption === "Labour" && (
                  <select
                    name="contractor"
                    value={entry.contractor}
                    onChange={handleChange}
                    className="border border-blue-300 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
                  >
                    <option>Contractor 1</option>
                    <option>Contractor 2</option>
                  </select>
                )}
              </div>

              {/* Material */}
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center text-blue-800">
                  <input
                    type="radio"
                    name="debitOption"
                    value="Material"
                    checked={entry.debitOption === "Material"}
                    onChange={handleChange}
                    className="mr-2 accent-blue-500"
                  />
                  Material
                </label>
                {entry.debitOption === "Material" && (
                  <select
                    name="vendor"
                    value={entry.vendor}
                    onChange={handleChange}
                    className="border border-blue-300 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
                  >
                    <option>Vendor 1</option>
                    <option>Vendor 2</option>
                  </select>
                )}
              </div>

              {/* Salary */}
              <label className="inline-flex items-center text-blue-800">
                <input
                  type="radio"
                  name="debitOption"
                  value="Salary"
                  checked={entry.debitOption === "Salary"}
                  onChange={handleChange}
                  className="mr-2 accent-blue-500"
                />
                Salary
              </label>

              {/* Office */}
              <label className="inline-flex items-center text-blue-800">
                <input
                  type="radio"
                  name="debitOption"
                  value="Office"
                  checked={entry.debitOption === "Office"}
                  onChange={handleChange}
                  className="mr-2 accent-blue-500"
                />
                Office
              </label>

              {/* Other */}
              <label className="inline-flex items-center text-blue-800">
                <input
                  type="radio"
                  name="debitOption"
                  value="Other"
                  checked={entry.debitOption === "Other"}
                  onChange={handleChange}
                  className="mr-2 accent-blue-500"
                />
                Other
              </label>
            </div>
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-medium text-blue-800">Description</label>
          <input
            type="text"
            name="description"
            value={entry.description}
            onChange={handleChange}
            className="border border-blue-300 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
          />
        </div>

        {/* MODE OF PAYMENT */}
        <div className="col-span-1 md:col-span-1">
          <label className="block mb-2 font-medium text-blue-800">Mode of Payment*</label>
          <select
            name="mode"
            value={entry.mode}
            onChange={handleChange}
            className="border border-blue-300 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
          >
            <option>Cheque</option>
            <option>Account Pay</option>
            <option>Cash</option>
            <option>Major Cash</option>
          </select>
        </div>

        {/* PAYMENT REFERENCE */}
        <div className="col-span-1 md:col-span-1">
          <label className="block mb-2 font-medium text-blue-800">{getPaymentLabel()}*</label>
          <input
            type="text"
            name="paymentRef"
            value={entry.paymentRef}
            onChange={handleChange}
            required
            className="border border-blue-300 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
          />
        </div>

        {/* AMOUNT */}
        <div className="col-span-1 md:col-span-1">
          <label className="block mb-2 font-medium text-blue-800">Amount*</label>
          <input
            type="number"
            name="amount"
            value={entry.amount}
            onChange={handleChange}
            required
            className="border border-blue-300 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="col-span-1 md:col-span-2 mt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
          >
            Save Finance Entry
          </button>
        </div>

      </form>
    </div>
  );
}
