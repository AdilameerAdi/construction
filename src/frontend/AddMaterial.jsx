import { useState, useEffect } from "react";

export default function AddMaterial() {
  const [formData, setFormData] = useState({
    activity: "",
    name: "",
    unit: "",
    status: "Active",
  });

  const [activities, setActivities] = useState([]);
  const [units, setUnits] = useState([]);

  // ✅ Fetch activities & units for dropdown
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [actRes, unitRes] = await Promise.all([
          fetch("http://localhost:8000/api/activities"),
          fetch("http://localhost:8000/api/units"),
        ]);
        const [actData, unitData] = await Promise.all([
          actRes.json(),
          unitRes.json(),
        ]);
        setActivities(actData);
        setUnits(unitData);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit form to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const saved = await res.json();
        console.log("Material saved:", saved);
        alert("Material added successfully!");
        setFormData({ activity: "", name: "", unit: "", status: "Active" });
      } else {
        const err = await res.json();
        console.error("Failed to save material:", err);
        alert("Error: " + err.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Add Material
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Fill out the form below to add a new material
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Activity Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Activity <span className="text-red-500">*</span>
            </label>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4] 
                         focus:border-[#2044E4] transition"
              required
            >
              <option value="">Select Activity</option>
              {activities.map((act) => (
                <option key={act._id} value={act._id}>
                  {act.title}
                </option>
              ))}
            </select>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter material name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4] 
                         focus:border-[#2044E4] transition"
              required
            />
          </div>

          {/* Unit Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Unit <span className="text-red-500">*</span>
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4] 
                         focus:border-[#2044E4] transition"
              required
            >
              <option value="">Select Unit</option>
              {units.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4] 
                         focus:border-[#2044E4] transition"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#2044E4] text-white py-3 rounded-lg 
                         font-medium shadow-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

