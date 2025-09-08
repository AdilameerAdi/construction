import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectFinance() {
  const navigate = useNavigate();

  // Sample finance entries
  const [financeEntries, setFinanceEntries] = useState([
    {
      id: 1,
      date: "2025-09-01",
      project: "General",
      type: "Credit",
      subType: "Customer",
      mode: "Cheque",
      creditHead: "Other",
      description: "Initial Funding",
      chequeNo: "123456",
      amount: 100000
    }
  ]);

  // State for fetched data
  const [vendors, setVendors] = useState([]);
  const [contractors, setContractors] = useState([]);

  // Customers placeholder
  const customers = ["Customer 1", "Customer 2"];

  // Fetch vendors and contractors
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

    fetchVendors();
    fetchContractors();
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
    mode: ""
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  // Filtered entries
  const filteredEntries = financeEntries.filter(entry => {
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
    
    let matchesCustomer =
      !filter.customer || entry.customer === filter.customer;
    let matchesVendor =
      !filter.vendor || entry.vendor === filter.vendor;
    let matchesContractor =
      !filter.contractor || entry.contractor === filter.contractor;
    
    let matchesProject =
      !filter.project ||
      entry.project.toLowerCase().includes(filter.project.toLowerCase());
    
    let matchesMode =
      !filter.mode || entry.mode.toLowerCase().includes(filter.mode.toLowerCase());

    return matchesDate && matchesType && matchesSubType && matchesCustomer && matchesVendor && matchesContractor && matchesProject && matchesMode;
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
          name="fromDate"
          value={filter.fromDate}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          type="date"
          name="toDate"
          value={filter.toDate}
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
          name="mode"
          value={filter.mode}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Mode of Payment</option>
          <option value="Account Pay">Account Pay</option>
          <option value="Cheque">Cheque</option>
          <option value="Major Cash">Major Cash</option>
          <option value="Cash">Cash</option>
        </select>
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

        {/* Conditional Filters */}
        {filter.type === "Credit" && (
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="subType"
                value="Customer"
                checked={filter.subType === "Customer"}
                onChange={handleFilterChange}
              />
              Customer
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="subType"
                value="Other"
                checked={filter.subType === "Other"}
                onChange={handleFilterChange}
              />
              Other
            </label>
            {filter.subType === "Customer" && (
              <select
                name="customer"
                value={filter.customer}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded-lg"
              >
                <option value="">Select Customer</option>
                {customers.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            )}
          </div>
        )}

        {filter.type === "Debit" && (
          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="subType"
                value="Material"
                checked={filter.subType === "Material"}
                onChange={handleFilterChange}
              />
              Material
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="subType"
                value="Labour"
                checked={filter.subType === "Labour"}
                onChange={handleFilterChange}
              />
              Labour
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="subType"
                value="Salary"
                checked={filter.subType === "Salary"}
                onChange={handleFilterChange}
              />
              Salary
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="subType"
                value="Office"
                checked={filter.subType === "Office"}
                onChange={handleFilterChange}
              />
              Office
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="subType"
                value="Other"
                checked={filter.subType === "Other"}
                onChange={handleFilterChange}
              />
              Other
            </label>

            {filter.subType === "Material" && (
              <select
                name="vendor"
                value={filter.vendor}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded-lg"
              >
                <option value="">Select Vendor</option>
                {vendors.map((v, i) => (
                  <option key={i} value={v.name || v}>{v.name || v}</option>
                ))}
              </select>
            )}
            {filter.subType === "Labour" && (
              <select
                name="contractor"
                value={filter.contractor}
                onChange={handleFilterChange}
                className="border px-3 py-2 rounded-lg"
              >
                <option value="">Select Contractor</option>
                {contractors.map((c, i) => (
                  <option key={i} value={c.name || c}>{c.name || c}</option>
                ))}
              </select>
            )}
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => console.log("Search triggered")}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
          <button
            onClick={() => setFilter({
              fromDate: "",
              toDate: "",
              project: "",
              type: "",
              subType: "",
              customer: "",
              vendor: "",
              contractor: "",
              mode: ""
            })}
            className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
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
              <th className="px-4 py-2 border">Sub Type</th>
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
                <td className="px-4 py-2 border">{entry.subType || "-"}</td>
                <td className="px-4 py-2 border">{entry.mode}</td>
                <td className="px-4 py-2 border">{entry.chequeNo || "-"}</td>
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




// // src/frontend/ProjectFinance.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ProjectFinance() {
//   const navigate = useNavigate();

//   // Sample finance entries
//   const [financeEntries, setFinanceEntries] = useState([
//     {
//       id: 1,
//       date: "2025-09-01",
//       project: "General",
//       type: "Credit",
//       subType: "Customer",
//       mode: "Cheque",
//       creditHead: "Other",
//       description: "Initial Funding",
//       chequeNo: "123456",
//       amount: 100000
//     }
//   ]);

//   // Sample database placeholders
//   const customers = ["Customer 1", "Customer 2"];
//   const vendors = ["Vendor 1", "Vendor 2"];
//   const contractors = ["Contractor 1", "Contractor 2"];

//   // Filter states
//   const [filter, setFilter] = useState({
//     fromDate: "",
//     toDate: "",
//     project: "",
//     type: "",
//     subType: "",
//     customer: "",
//     vendor: "",
//     contractor: "",
//     mode: ""
//   });

//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter(prev => ({ ...prev, [name]: value }));
//   };

//   // Filtered entries
//   const filteredEntries = financeEntries.filter(entry => {
//     const entryDate = new Date(entry.date);
//     const from = filter.fromDate ? new Date(filter.fromDate) : null;
//     const to = filter.toDate ? new Date(filter.toDate) : null;

//     let matchesDate = true;
//     if (from && to) matchesDate = entryDate >= from && entryDate <= to;
//     else if (from) matchesDate = entryDate >= from;
//     else if (to) matchesDate = entryDate <= to;

//     let matchesType = !filter.type || entry.type === filter.type;
//     let matchesSubType =
//       !filter.subType ||
//       (filter.type === "Credit" && entry.subType === filter.subType) ||
//       (filter.type === "Debit" && entry.subType === filter.subType);
    
//     let matchesCustomer =
//       !filter.customer || entry.customer === filter.customer;
//     let matchesVendor =
//       !filter.vendor || entry.vendor === filter.vendor;
//     let matchesContractor =
//       !filter.contractor || entry.contractor === filter.contractor;
    
//     let matchesProject =
//       !filter.project ||
//       entry.project.toLowerCase().includes(filter.project.toLowerCase());
    
//     let matchesMode =
//       !filter.mode || entry.mode.toLowerCase().includes(filter.mode.toLowerCase());

//     return matchesDate && matchesType && matchesSubType && matchesCustomer && matchesVendor && matchesContractor && matchesProject && matchesMode;
//   });

//   // Total credit/debit
//   const totalCredit = financeEntries
//     .filter(e => e.type === "Credit")
//     .reduce((acc, curr) => acc + Number(curr.amount), 0);
//   const totalDebit = financeEntries
//     .filter(e => e.type === "Debit")
//     .reduce((acc, curr) => acc + Number(curr.amount), 0);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Project Finance</h2>

//       {/* Add New Finance Button */}
//       <div className="mb-4 text-right">
//         <button
//           onClick={() => navigate("/dashboard/add-finance")}
//           className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
//         >
//           Add New Finance
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white shadow-lg rounded-2xl p-4 mb-4 flex flex-wrap gap-4 items-center">
//         <input
//           type="date"
//           name="fromDate"
//           value={filter.fromDate}
//           onChange={handleFilterChange}
//           className="border px-3 py-2 rounded-lg"
//         />
//         <input
//           type="date"
//           name="toDate"
//           value={filter.toDate}
//           onChange={handleFilterChange}
//           className="border px-3 py-2 rounded-lg"
//         />
//         <input
//           type="text"
//           name="project"
//           placeholder="Select Project"
//           value={filter.project}
//           onChange={handleFilterChange}
//           className="border px-3 py-2 rounded-lg"
//         />
//         <select
//           name="mode"
//           value={filter.mode}
//           onChange={handleFilterChange}
//           className="border px-3 py-2 rounded-lg"
//         >
//           <option value="">Mode of Payment</option>
//           <option value="Account Pay">Account Pay</option>
//           <option value="Cheque">Cheque</option>
//           <option value="Major Cash">Major Cash</option>
//           <option value="Cash">Cash</option>
//         </select>
//         <select
//           name="type"
//           value={filter.type}
//           onChange={handleFilterChange}
//           className="border px-3 py-2 rounded-lg"
//         >
//           <option value="">Credit/Debit</option>
//           <option value="Credit">Credit</option>
//           <option value="Debit">Debit</option>
//         </select>

//         {/* Conditional Filters */}
//         {filter.type === "Credit" && (
//           <div className="flex items-center gap-4">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="subType"
//                 value="Customer"
//                 checked={filter.subType === "Customer"}
//                 onChange={handleFilterChange}
//               />
//               Customer
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="subType"
//                 value="Other"
//                 checked={filter.subType === "Other"}
//                 onChange={handleFilterChange}
//               />
//               Other
//             </label>
//             {filter.subType === "Customer" && (
//               <select
//                 name="customer"
//                 value={filter.customer}
//                 onChange={handleFilterChange}
//                 className="border px-3 py-2 rounded-lg"
//               >
//                 <option value="">Select Customer</option>
//                 {customers.map((c, i) => (
//                   <option key={i} value={c}>{c}</option>
//                 ))}
//               </select>
//             )}
//           </div>
//         )}

//         {filter.type === "Debit" && (
//           <div className="flex items-center gap-4 flex-wrap">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="subType"
//                 value="Material"
//                 checked={filter.subType === "Material"}
//                 onChange={handleFilterChange}
//               />
//               Material
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="subType"
//                 value="Labour"
//                 checked={filter.subType === "Labour"}
//                 onChange={handleFilterChange}
//               />
//               Labour
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="subType"
//                 value="Salary"
//                 checked={filter.subType === "Salary"}
//                 onChange={handleFilterChange}
//               />
//               Salary
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="subType"
//                 value="Office"
//                 checked={filter.subType === "Office"}
//                 onChange={handleFilterChange}
//               />
//               Office
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="subType"
//                 value="Other"
//                 checked={filter.subType === "Other"}
//                 onChange={handleFilterChange}
//               />
//               Other
//             </label>

//             {filter.subType === "Material" && (
//               <select
//                 name="vendor"
//                 value={filter.vendor}
//                 onChange={handleFilterChange}
//                 className="border px-3 py-2 rounded-lg"
//               >
//                 <option value="">Select Vendor</option>
//                 {vendors.map((v, i) => (
//                   <option key={i} value={v}>{v}</option>
//                 ))}
//               </select>
//             )}
//             {filter.subType === "Labour" && (
//               <select
//                 name="contractor"
//                 value={filter.contractor}
//                 onChange={handleFilterChange}
//                 className="border px-3 py-2 rounded-lg"
//               >
//                 <option value="">Select Contractor</option>
//                 {contractors.map((c, i) => (
//                   <option key={i} value={c}>{c}</option>
//                 ))}
//               </select>
//             )}
//           </div>
//         )}
// <div className="flex items-center gap-2">
//   <button
//     onClick={() => console.log("Search triggered")}
//     className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
//   >
//     Search
//   </button>
//   <button
//     onClick={() => setFilter({
//       fromDate: "",
//       toDate: "",
//       project: "",
//       type: "",
//       subType: "",
//       customer: "",
//       vendor: "",
//       contractor: "",
//       mode: ""
//     })}
//     className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
//   >
//     Reset
//   </button>

  
// </div>

       
//       </div>

//       {/* Summary */}
//       <div className="flex justify-between mb-4 text-lg font-semibold">
//         <span className="text-green-600">Total Credit: {totalCredit}</span>
//         <span className="text-red-600">Total Debit: {totalDebit}</span>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
//         <table className="min-w-full table-auto">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 border">S.No.</th>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Project</th>
//               <th className="px-4 py-2 border">Credit/Debit</th>
//               <th className="px-4 py-2 border">Sub Type</th>
//               <th className="px-4 py-2 border">Mode</th>
//               <th className="px-4 py-2 border">Cheque No.</th>
//               <th className="px-4 py-2 border">Amount</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEntries.map(entry => (
//               <tr key={entry.id} className="text-center">
//                 <td className="px-4 py-2 border">{entry.id}</td>
//                 <td className="px-4 py-2 border">{entry.date}</td>
//                 <td className="px-4 py-2 border">{entry.project}</td>
//                 <td className="px-4 py-2 border">{entry.type}</td>
//                 <td className="px-4 py-2 border">{entry.subType || "-"}</td>
//                 <td className="px-4 py-2 border">{entry.mode}</td>
//                 <td className="px-4 py-2 border">{entry.chequeNo || "-"}</td>
//                 <td className="px-4 py-2 border">{entry.amount}</td>
//                 <td className="px-4 py-2 border">
//                   <button className="text-blue-600 hover:underline mr-2">Edit</button>
//                   <button className="text-red-600 hover:underline">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
