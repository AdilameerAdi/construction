import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectFinance() {
  const navigate = useNavigate();

  // Finance entries fetched from backend
  const [financeEntries, setFinanceEntries] = useState([]);

  // State for fetched data
  const [vendors, setVendors] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Fetch vendors, contractors, customers, and finance entries
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/vendors");
        if (res.ok) {
          const data = await res.json();
          setVendors(data);
        } else {
          console.error("Failed to fetch vendors");
        }
      } catch (err) {
        console.error("Error fetching vendors:", err);
      }
    };

    const fetchContractors = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/contractors");
        if (res.ok) {
          const data = await res.json();
          setContractors(data);
        } else {
          console.error("Failed to fetch contractors");
        }
      } catch (err) {
        console.error("Error fetching contractors:", err);
      }
    };

    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/customers");
        if (res.ok) {
          const data = await res.json();
          setCustomers(data);
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };

    const fetchFinances = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/finances");
        if (res.ok) {
          const data = await res.json();
          setFinanceEntries(data);
        } else {
          console.error("Failed to fetch finances");
        }
      } catch (err) {
        console.error("Error fetching finances:", err);
      }
    };

    fetchVendors();
    fetchContractors();
    fetchCustomers();
    fetchFinances();
  }, []);

  // Filter states
  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
    project: "",
    type: "",
    subType: "",
    customer: "",
    vendor: "",
    contractor: "",
    mode: "",
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Filtered entries
  const filteredEntries = financeEntries.filter((entry) => {
    const entryDate = new Date(entry.date);
    const from = filter.fromDate ? new Date(filter.fromDate) : null;
    const to = filter.toDate ? new Date(filter.toDate) : null;

    let matchesDate = true;
    if (from && to) matchesDate = entryDate >= from && entryDate <= to;
    else if (from) matchesDate = entryDate >= from;
    else if (to) matchesDate = entryDate <= to;

    let matchesType = !filter.type || entry.type === filter.type;
    let matchesSubType =
      !filter.subType ||
      (filter.type === "Credit" && entry.subType === filter.subType) ||
      (filter.type === "Debit" && entry.subType === filter.subType);

    // Credit logic
    let matchesCustomer = true;
    if (filter.type === "Credit") {
      if (filter.subType === "Customer") {
        matchesCustomer = entry.customer ? true : false;
        if (filter.customer) {
          matchesCustomer =
            entry.customer && entry.customer._id === filter.customer;
        }
      } else if (filter.subType === "Other") {
        matchesCustomer =
          entry.subType === "Other" || entry.creditOption === "Other";
      }
    }

    // Debit logic
    let matchesVendor = true;
    let matchesContractor = true;

    if (filter.type === "Debit") {
      if (filter.subType === "Material") {
        matchesVendor = entry.vendor ? true : false;
        if (filter.vendor) matchesVendor = entry.vendor._id === filter.vendor;
      } else if (filter.subType === "Labour") {
        matchesContractor = entry.contractor ? true : false;
        if (filter.contractor)
          matchesContractor = entry.contractor._id === filter.contractor;
      } else if (["Salary", "Office", "Other"].includes(filter.subType)) {
        matchesVendor =
          entry.subType === filter.subType ||
          entry.debitOption === filter.subType;
        matchesContractor =
          entry.subType === filter.subType ||
          entry.debitOption === filter.subType;
      }
    }

    let matchesProject = !filter.project;
    if (!matchesProject) {
      // Handle if entry.project is an object with a name property
      if (entry.project && typeof entry.project === "object" && entry.project.name) {
        matchesProject = entry.project.name.toLowerCase().includes(filter.project.toLowerCase());
      } else if (typeof entry.project === "string") {
        matchesProject = entry.project.toLowerCase().includes(filter.project.toLowerCase());
      } else {
        matchesProject = false;
      }
    }

    let matchesMode =
      !filter.mode ||
      entry.mode.toLowerCase().includes(filter.mode.toLowerCase());

    return (
      matchesDate &&
      matchesType &&
      matchesSubType &&
      matchesCustomer &&
      matchesVendor &&
      matchesContractor &&
      matchesProject &&
      matchesMode
    );
  });

  // Total credit/debit
  const totalCredit = financeEntries
    .filter((e) => e.type === "Credit")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalDebit = financeEntries
    .filter((e) => e.type === "Debit")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-100">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
          Project Finance
        </h2>
        <button
          onClick={() => navigate("/dashboard/add-finance")}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
        >
          + Add New Finance
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-gray-700 border-b pb-2">
          🔎 Filters
        </h3>
        <div className="space-y-4">
          {/* Basic Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={filter.fromDate}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 px-2 sm:px-3 py-2 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                name="toDate"
                value={filter.toDate}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 px-2 sm:px-3 py-2 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                name="project"
                placeholder="Project Name"
                value={filter.project}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 px-2 sm:px-3 py-2 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
              <select
                name="mode"
                value={filter.mode}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 px-2 sm:px-3 py-2 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Modes</option>
                <option value="Account Pay">Account Pay</option>
                <option value="Cheque">Cheque</option>
                <option value="Major Cash">Major Cash</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={filter.type}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 px-2 sm:px-3 py-2 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Credit/Debit</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </div>
          </div>

          {/* Conditional Filters */}
          {filter.type === "Credit" && (
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
              <h4 className="text-sm font-medium text-green-800 mb-3">Credit Filters</h4>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <label className="flex items-center gap-2 text-gray-600 text-sm">
                    <input
                      type="radio"
                      name="subType"
                      value="Customer"
                      checked={filter.subType === "Customer"}
                      onChange={handleFilterChange}
                    />
                    Customer
                  </label>
                  <label className="flex items-center gap-2 text-gray-600 text-sm">
                    <input
                      type="radio"
                      name="subType"
                      value="Other"
                      checked={filter.subType === "Other"}
                      onChange={handleFilterChange}
                    />
                    Other
                  </label>
                </div>
                {filter.subType === "Customer" && (
                  <div className="max-w-xs">
                    <select
                      name="customer"
                      value={filter.customer}
                      onChange={handleFilterChange}
                      className="w-full border border-gray-300 px-2 sm:px-3 py-2 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Customer</option>
                      {Array.isArray(customers) &&
                        customers.length > 0 &&
                        customers.map((c) =>
                          c && c._id && c.fullName ? (
                            <option key={c._id} value={c._id}>
                              {c.fullName}
                            </option>
                          ) : null
                        )}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {filter.type === "Debit" && (
            <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200">
              <h4 className="text-sm font-medium text-red-800 mb-3">Debit Filters</h4>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {["Material", "Labour", "Salary", "Office", "Other"].map(
                    (opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 text-gray-600 text-sm"
                      >
                        <input
                          type="radio"
                          name="subType"
                          value={opt}
                          checked={filter.subType === opt}
                          onChange={handleFilterChange}
                        />
                        {opt}
                      </label>
                    )
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filter.subType === "Material" && (
                    <select
                      name="vendor"
                      value={filter.vendor}
                      onChange={handleFilterChange}
                      className="w-full border border-gray-300 px-2 sm:px-3 py-2 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Vendor</option>
                      {vendors.map((v, i) => (
                        <option key={v._id || i} value={v._id || v}>
                          {v.name || v}
                        </option>
                      ))}
                    </select>
                  )}

                  {filter.subType === "Labour" && (
                    <select
                      name="contractor"
                      value={filter.contractor}
                      onChange={handleFilterChange}
                      className="w-full border border-gray-300 px-2 sm:px-3 py-2 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Contractor</option>
                      {contractors.map((c, i) => (
                        <option key={c._id || i} value={c._id || c}>
                          {c.name || c}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <button
              onClick={() => console.log("Search triggered")}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-5 py-2 text-sm rounded-lg font-medium shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            >
              🔍 Search
            </button>
            <button
              onClick={() =>
                setFilter({
                  fromDate: "",
                  toDate: "",
                  project: "",
                  type: "",
                  subType: "",
                  customer: "",
                  vendor: "",
                  contractor: "",
                  mode: "",
                })
              }
              className="w-full sm:w-auto bg-gray-200 text-gray-700 px-4 sm:px-5 py-2 text-sm rounded-lg font-medium shadow-md hover:bg-gray-300 transition-all duration-300"
            >
              ♻ Reset
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between mb-6 text-sm sm:text-lg font-semibold">
        <span className="text-green-600 bg-green-50 px-3 py-2 rounded-lg shadow-sm text-center sm:text-left">
          💰 Total Credit:{" "}
          <span className="font-bold">₹{totalCredit.toLocaleString()}</span>
        </span>
        <span className="text-red-600 bg-red-50 px-3 py-2 rounded-lg shadow-sm text-center sm:text-left">
          📉 Total Debit:{" "}
          <span className="font-bold">₹{totalDebit.toLocaleString()}</span>
        </span>
      </div>

      {/* Desktop Table View - Hidden on small screens */}
      <div className="hidden lg:block overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-100">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
            <tr>
              {[
                "S.No.",
                "Date",
                "Project",
                "Credit/Debit",
                "Sub Type",
                "Mode",
                "Cheque No.",
                "Amount",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-left"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, idx) => (
              <tr
                key={entry.id}
                className={`transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm text-gray-600">
                  {entry.id}
                </td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm text-gray-600">
                  {entry.date}
                </td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm text-gray-800 font-medium">
                  {entry.project?.name || "-"}
                </td>
                <td className="px-3 xl:px-4 py-3 border">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                      entry.type === "Credit"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {entry.type}
                  </span>
                </td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm text-gray-600 max-w-32 truncate">
                  {entry.type === "Credit" && entry.customer?.fullName
                    ? entry.customer.fullName
                    : entry.type === "Debit" && entry.vendor?.name
                    ? entry.vendor.name
                    : entry.type === "Debit" && entry.contractor?.name
                    ? entry.contractor.name
                    : entry.subType ||
                      entry.creditOption ||
                      entry.debitOption ||
                      "-"}
                </td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm text-gray-600">
                  {entry.mode}
                </td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm text-gray-600">
                  {entry.paymentRef || entry.chequeNo || "-"}
                </td>
                <td className="px-3 xl:px-4 py-3 border text-xs xl:text-sm font-semibold text-gray-800">
                  ₹{entry.amount?.toLocaleString()}
                </td>
                <td className="px-3 xl:px-4 py-3 border">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded text-xs transition">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded text-xs transition">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet Table View - Visible on medium screens */}
      <div className="hidden sm:block lg:hidden overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-100">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
            <tr>
              <th className="px-2 py-3 border text-xs font-semibold text-left">Transaction</th>
              <th className="px-2 py-3 border text-xs font-semibold text-left">Type/Amount</th>
              <th className="px-2 py-3 border text-xs font-semibold text-left">Details</th>
              <th className="px-2 py-3 border text-xs font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, idx) => (
              <tr
                key={entry.id}
                className={`transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="px-2 py-3 border text-xs">
                  <div className="font-medium">#{entry.id}</div>
                  <div className="text-gray-500">{entry.date}</div>
                  <div className="text-gray-600 truncate max-w-24">{entry.project?.name || "-"}</div>
                </td>
                <td className="px-2 py-3 border text-xs">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-lg block w-fit mb-1 ${
                      entry.type === "Credit"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {entry.type}
                  </span>
                  <div className="font-semibold">₹{entry.amount?.toLocaleString()}</div>
                </td>
                <td className="px-2 py-3 border text-xs">
                  <div className="space-y-1">
                    <div>Mode: {entry.mode}</div>
                    <div>Ref: {entry.paymentRef || entry.chequeNo || "-"}</div>
                  </div>
                </td>
                <td className="px-2 py-3 border">
                  <div className="flex justify-center gap-1">
                    <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-1 py-1 rounded text-xs transition">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 hover:bg-red-50 px-1 py-1 rounded text-xs transition">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible only on small screens */}
      <div className="sm:hidden space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500 italic">
            No finance entries found
          </div>
        ) : (
          filteredEntries.map((entry, idx) => (
            <div key={entry.id} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      #{entry.id}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        entry.type === "Credit"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {entry.type}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-gray-800 mb-1">
                    ₹{entry.amount?.toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition">
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-800 font-medium">{entry.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Project:</span>
                  <span className="text-gray-800 font-medium">{entry.project?.name || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mode:</span>
                  <span className="text-gray-800 font-medium">{entry.mode}</span>
                </div>
                {(entry.paymentRef || entry.chequeNo) && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reference:</span>
                    <span className="text-gray-800 font-medium">{entry.paymentRef || entry.chequeNo}</span>
                  </div>
                )}
                <div className="pt-2 border-t">
                  <span className="text-gray-500 block mb-1">Details:</span>
                  <span className="text-gray-800 text-sm">
                    {entry.type === "Credit" && entry.customer?.fullName
                      ? entry.customer.fullName
                      : entry.type === "Debit" && entry.vendor?.name
                      ? entry.vendor.name
                      : entry.type === "Debit" && entry.contractor?.name
                      ? entry.contractor.name
                      : entry.subType ||
                        entry.creditOption ||
                        entry.debitOption ||
                        "-"}
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
