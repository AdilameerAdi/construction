// src/frontend/AddStock.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddStock() {
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.state?.projectId;
  const editId = location.state?.editId;

  // Fetched lists
  const [materials, setMaterials] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [currentStock, setCurrentStock] = useState(0);

  // Form state
  const [newStock, setNewStock] = useState({
    date: "",
    project: "",
    material: "",
    type: "",
    vendor: "",
    quantity: "",
  });

  // Fetch dropdown data once
  useEffect(() => {
    const ac = new AbortController();

    async function loadLists() {
      try {
        const mRes = await fetch("http://localhost:8000/api/materials", { signal: ac.signal });
        if (mRes.ok) {
          const mJson = await mRes.json();
          const cleaned = (Array.isArray(mJson) ? mJson : []).map((x) => ({
            _id: x?._id,
            title: (x?.title || x?.name || x?.label || "Untitled").trim(),
          }));

          // ✅ sort here
          const sorted = cleaned.sort((a, b) => {
            const regex = /^\d/;
            const aNum = regex.test(a.title);
            const bNum = regex.test(b.title);

            if (aNum && !bNum) return -1;
            if (!aNum && bNum) return 1;

            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
          });

          console.log("Sorted materials:", sorted.map((m) => m.title)); // debug
          setMaterials(sorted);
        }

      const vRes = await fetch("http://localhost:8000/api/vendors", { signal: ac.signal });
if (vRes.ok) {
  const vJson = await vRes.json();
  const cleanedVendors = (Array.isArray(vJson) ? vJson : []).map((x) => ({
    _id: x?._id,
    title: (x?.title || x?.name || x?.label || "Unnamed Vendor").trim(),
  }));

  // ✅ sort vendors alphabetically
  const sortedVendors = cleanedVendors.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );

  setVendors(sortedVendors);
}

const cRes = await fetch("http://localhost:8000/api/contractors", { signal: ac.signal });
if (cRes.ok) {
  const cJson = await cRes.json();
  const cleanedContractors = (Array.isArray(cJson) ? cJson : []).map((x) => ({
    _id: x?._id,
    title: (x?.title || x?.name || x?.label || "Unnamed Contractor").trim(),
  }));

  // ✅ sort contractors alphabetically
  const sortedContractors = cleanedContractors.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );

  setContractors(sortedContractors);
}

        // Fetch stock data for calculations
        const sRes = await fetch("http://localhost:8000/api/stocks", { signal: ac.signal });
        if (sRes.ok) {
          const sJson = await sRes.json();
          setStockData(Array.isArray(sJson) ? sJson : []);
        }
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    }

    loadLists();
    return () => ac.abort();
  }, []);

  // Prefill when editing
  useEffect(() => {
    if (!editId) return;
    (async () => {
      try {
        const r = await fetch(`http://localhost:8000/api/stocks/${editId}`);
        if (!r.ok) throw new Error("Failed to fetch stock");
        const data = await r.json();
        const src = Array.isArray(data) ? data[0] : (data?.data || data);
        if (src) {
          const materialId = src.material?._id || src.material || "";
          setNewStock({
            date: src.date ? src.date.substring(0, 10) : "",
            project: src.project || "",
            material: materialId,
            type: src.type || "",
            vendor: src.vendor?._id || src.contractor?._id || "",
            quantity: String(src.quantity ?? ""),
          });
          // Calculate stock for the pre-selected material
          if (materialId && stockData.length > 0) {
            calculateCurrentStock(materialId);
          }
        }
      } catch (e) {
        console.error(e);
        alert("Failed to load stock entry for editing");
      }
    })();
  }, [editId, stockData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock((prev) => ({ ...prev, [name]: value }));

    // Calculate current stock when material changes
    if (name === "material" && value) {
      calculateCurrentStock(value);
    }
  };

  // Calculate current stock for selected material
  const calculateCurrentStock = (materialId) => {
    const materialStocks = stockData.filter(
      (stock) => stock.material?._id === materialId || stock.material === materialId
    );

    // Sort by date to calculate running total
    const sortedStocks = materialStocks.sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningTotal = 0;
    sortedStocks.forEach((stock) => {
      const qty = Number(stock.quantity || 0);
      if (stock.type === "Inward") {
        runningTotal += qty;
      } else if (stock.type === "Outward") {
        runningTotal -= qty;
      }
    });

    setCurrentStock(Math.max(0, runningTotal)); // Don't show negative stock
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date: newStock.date,
      project: newStock.project.trim(),
      material: newStock.material,
      type: newStock.type,
      quantity: Number(newStock.quantity),
      vendor: newStock.type === "Inward" ? newStock.vendor : null,
      contractor: newStock.type === "Outward" ? newStock.vendor : null,
    };

    try {
      const url = editId
        ? `http://localhost:8000/api/stocks/${editId}`
        : "http://localhost:8000/api/stocks";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to save stock");
      }

      alert(editId ? "Stock updated successfully!" : "Stock added successfully!");
      setNewStock({
        date: "",
        project: "",
        material: "",
        type: "",
        vendor: "",
        quantity: "",
      });
      navigate("/dashboard/stock-management", { state: { projectId } });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const partyList = newStock.type === "Inward" ? vendors : contractors;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-6 sm:py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            {editId ? "Edit Stock Transaction" : "Add Stock Transaction"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Date */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">Date*</label>
            <input
              type="date"
              name="date"
              value={newStock.date}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Project */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">Project*</label>
            <input
              type="text"
              name="project"
              value={newStock.project}
              onChange={handleChange}
              placeholder="Enter Project Name"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Material */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">Material*</label>
            <select
              name="material"
              value={newStock.material}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Material</option>
              {materials.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.title}
                </option>
              ))}
            </select>

            {newStock.material && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                <span className="font-medium text-blue-800">
                  Current Stock: <span className="font-bold">{currentStock}</span> units
                </span>
              </div>
            )}
          </div>

          {/* Inward/Outward */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">
              Inward / Outward*
            </label>
            <select
              name="type"
              value={newStock.type}
              onChange={(e) =>
                setNewStock((prev) => ({ ...prev, type: e.target.value, vendor: "" }))
              }
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Type</option>
              <option value="Inward">Inward</option>
              <option value="Outward">Outward</option>
            </select>
          </div>

          {/* Vendor/Contractor */}
          {newStock.type && (
            <div className="sm:col-span-2">
              <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">
                {newStock.type === "Inward" ? "Vendor*" : "Contractor*"}
              </label>
              <select
                name="vendor"
                value={newStock.vendor}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">
                  Select {newStock.type === "Inward" ? "Vendor" : "Contractor"}
                </option>
                {partyList.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">Quantity*</label>
            <input
              type="number"
              name="quantity"
              value={newStock.quantity}
              onChange={handleChange}
              placeholder="Enter Quantity"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {newStock.type === "Outward" &&
              newStock.quantity &&
              Number(newStock.quantity) > currentStock && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm">
                  <span className="font-medium text-red-800">
                    ⚠️ Warning: Insufficient stock! Available: {currentStock} units
                  </span>
                </div>
              )}
          </div>

          {/* Buttons */}
          <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/stock-management")}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
            >
              {editId ? "Save Changes" : "Add Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
