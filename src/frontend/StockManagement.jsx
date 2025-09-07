import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StockManagement() {
  const navigate = useNavigate();

  // Sample stock entries
  const [stockEntries, setStockEntries] = useState([
    {
      id: 1,
      date: "03/09/2025",
      project: "Twin Tower",
      material: "Cement",
      type: "Inward",
      contractor: "Contractor 1",
      vendor: "",
      quantity: 50,
      stock: 150
    },
  ]);

  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
    materials: [],
    type: "",
    contractor: "",
    vendor: ""
  });

  // Sample list (replace with DB later)
  const materialsList = Array.from({length: 100}, (_, i) => `Material ${i+1}`);
  const contractorsList = ["Contractor 1", "Contractor 2", "Contractor 3"];
  const vendorsList = ["Vendor 1", "Vendor 2", "Vendor 3"];

  const [materialPopupOpen, setMaterialPopupOpen] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "materials") {
      let updatedMaterials = [...filter.materials];
      if (checked) updatedMaterials.push(value);
      else updatedMaterials = updatedMaterials.filter((m) => m !== value);
      setFilter((prev) => ({ ...prev, materials: updatedMaterials }));
    } else {
      setFilter((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearch = () => {};
  const handleReset = () => {
    setFilter({ fromDate: "", toDate: "", materials: [], type: "", contractor: "", vendor: "" });
  };

  const filteredEntries = stockEntries.filter((entry) => {
    const entryDate = new Date(entry.date);
    const from = filter.fromDate ? new Date(filter.fromDate) : null;
    const to = filter.toDate ? new Date(filter.toDate) : null;
    return (
      (!from || entryDate >= from) &&
      (!to || entryDate <= to) &&
      (filter.materials.length === 0 || filter.materials.includes(entry.material)) &&
      (!filter.type || entry.type === filter.type) &&
      (!filter.contractor || entry.contractor === filter.contractor) &&
      (!filter.vendor || entry.vendor === filter.vendor)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Stocks</h2>

      <div className="mb-4 text-right">
        <button
          onClick={() => navigate("/dashboard/add-stock")}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Add New
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-lg rounded-2xl p-4 mb-4 flex flex-wrap gap-4 items-center">
        <label>From</label>
        <input type="date" name="fromDate" value={filter.fromDate} onChange={handleFilterChange} className="border px-3 py-2 rounded-lg" placeholder="From Date"/>
       <label>to</label>
        <input type="date" name="toDate" value={filter.toDate} onChange={handleFilterChange} className="border px-3 py-2 rounded-lg" placeholder="To Date"/>

        {/* Material select button */}
        <button
          type="button"
          onClick={() => setMaterialPopupOpen(true)}
          className="border px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          Select Material ({filter.materials.length})
        </button>

        {/* Inward/Outward */}
        <select name="type" value={filter.type} onChange={handleFilterChange} className="border px-3 py-2 rounded-lg">
          <option value="">Inward/Outward</option>
          <option value="Inward">Inward</option>
          <option value="Outward">Outward</option>
        </select>

        {filter.type ==="Outward"  && (
          <select name="contractor" value={filter.contractor} onChange={handleFilterChange} className="border px-3 py-2 rounded-lg">
            <option value="">Select Contractor</option>
            {contractorsList.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
          </select>
        )}

        {filter.type === "Inward" && (
          <select name="vendor" value={filter.vendor} onChange={handleFilterChange} className="border px-3 py-2 rounded-lg">
            <option value="">Select Vendor</option>
            {vendorsList.map((v, idx) => <option key={idx} value={v}>{v}</option>)}
          </select>
        )}

        <button onClick={handleSearch} className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">Search</button>
        <button onClick={handleReset} className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400">Reset</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Date/Time</th>
              <th className="px-4 py-2 border">Project</th>
              <th className="px-4 py-2 border">Material</th>
              <th className="px-4 py-2 border">Inward/Outward</th>
              <th className="px-4 py-2 border">Vendor/Contractors</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map(entry => (
              <tr key={entry.id} className="text-center">
                <td className="px-4 py-2 border">{entry.id}</td>
                <td className="px-4 py-2 border">{entry.date}</td>
                <td className="px-4 py-2 border">{entry.project}</td>
                <td className="px-4 py-2 border">{entry.material}</td>
                <td className="px-4 py-2 border">{entry.type}</td>
                <td className="px-4 py-2 border">{entry.type === "Inward" ? entry.contractor : entry.vendor}</td>
                <td className="px-4 py-2 border">{entry.quantity}</td>
                <td className="px-4 py-2 border">{entry.stock}</td>
                <td className="px-4 py-2 border">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Material Selection Popup */}
      {materialPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setMaterialPopupOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Select Materials</h3>
            <div className="max-h-96 overflow-y-auto grid grid-cols-2 gap-2">
              {materialsList.map((material, index) => (
                <label key={index} className="inline-flex items-center space-x-2 border px-2 py-1 rounded hover:bg-gray-100">
                  <input
                    type="checkbox"
                    name="materials"
                    value={material}
                    checked={filter.materials.includes(material)}
                    onChange={handleFilterChange}
                    className="w-4 h-4"
                  />
                  <span>{material}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
