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

  // Form state
  const [newStock, setNewStock] = useState({
    date: "",
    project: "",
    material: "",
    type: "",
    vendor: "",
    quantity: "",
    stock: "",
  });

  // Fetch dropdown data once
  useEffect(() => {
    const ac = new AbortController();

    async function loadLists() {
      try {
        const mRes = await fetch("http://localhost:8000/api/materials", { signal: ac.signal });
        if (mRes.ok) {
          const mJson = await mRes.json();
          setMaterials(
            (Array.isArray(mJson) ? mJson : []).map((x) => ({
              _id: x?._id,
              title: x?.title || x?.name || x?.label || "Untitled",
            }))
          );
        }

        const vRes = await fetch("http://localhost:8000/api/vendors", { signal: ac.signal });
        if (vRes.ok) {
          const vJson = await vRes.json();
          setVendors(
            (Array.isArray(vJson) ? vJson : []).map((x) => ({
              _id: x?._id,
              title: x?.title || x?.name || x?.label || "Unnamed Vendor",
            }))
          );
        }

        const cRes = await fetch("http://localhost:8000/api/contractors", { signal: ac.signal });
        if (cRes.ok) {
          const cJson = await cRes.json();
          setContractors(
            (Array.isArray(cJson) ? cJson : []).map((x) => ({
              _id: x?._id,
              title: x?.title || x?.name || x?.label || "Unnamed Contractor",
            }))
          );
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
          setNewStock({
            date: src.date ? src.date.substring(0,10) : "",
            project: src.project || "",
            material: src.material?._id || src.material || "",
            type: src.type || "",
            vendor: src.vendor?._id || src.contractor?._id || "",
            quantity: String(src.quantity ?? ""),
            stock: String(src.stock ?? ""),
          });
        }
      } catch (e) {
        console.error(e);
        alert("Failed to load stock entry for editing");
      }
    })();
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date: newStock.date,
      project: newStock.project.trim(),
      material: newStock.material,
      type: newStock.type,
      quantity: Number(newStock.quantity),
      stock: Number(newStock.stock),
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
        stock: "",
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
          </div>

          {/* Inward/Outward */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">Inward / Outward*</label>
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
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1 sm:mb-2 text-sm font-medium text-gray-600">Stock*</label>
            <input
              type="number"
              name="stock"
              value={newStock.stock}
              onChange={handleChange}
              placeholder="Enter Total Stock"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
