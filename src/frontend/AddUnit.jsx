// src/frontend/AddUnit.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUnit() {
  const [unitName, setUnitName] = useState("");
  const [status, setStatus] = useState("Active"); // default value
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/units", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: unitName, status }),
      });

      if (res.ok) {
        const saved = await res.json();
        console.log("Unit saved:", saved);
        alert("Unit added successfully!");
        navigate("/dashboard/unit"); // Go back to Units list page
      } else {
        const err = await res.json();
        console.error("Failed to save unit:", err);
        alert("Error: " + (err.error || "Failed to save unit"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Unit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Unit Name */}
        <div>
          <label className="block mb-1 font-medium">Unit Name*</label>
          <input
            type="text"
            name="unitName"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status*</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
