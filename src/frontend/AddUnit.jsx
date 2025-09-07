// src/frontend/AddUnit.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUnit() {
  const [unitName, setUnitName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ unitName }); // Replace this with API call to save the unit
    alert("Unit added successfully!");
    navigate("/dashboard/unit"); // Go back to Units list page
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Unit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
