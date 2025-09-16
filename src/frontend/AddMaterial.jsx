import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddMaterial() {
  const [formData, setFormData] = useState({
    activity: "",
    name: "",
    unit: "",
    status: "Active",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [activities, setActivities] = useState([]);
  const [units, setUnits] = useState([]);
  const editId = location.state?.editId;

  // Fetch activities and units from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activitiesRes = await fetch("http://localhost:8000/api/activities");
        const activitiesData = await activitiesRes.json();
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);

        const unitsRes = await fetch("http://localhost:8000/api/units");
        const unitsData = await unitsRes.json();
        setUnits(Array.isArray(unitsData) ? unitsData : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Prefill for edit
  useEffect(() => {
    if (!editId) return;
    (async () => {
      try {
        const r = await fetch(`http://localhost:8000/api/materials/${editId}`);
        if (!r.ok) throw new Error("Failed to load material");
        const data = await r.json();
        const src = data?.data || data;
        if (src) {
          setFormData({
            activity: src.activity?._id || src.activity || "",
            name: src.name || "",
            unit: src.unit?._id || src.unit || "",
            status: src.status || "Active",
          });
        }
      } catch (e) {
        console.error(e);
        alert("Failed to load material for editing");
      }
    })();
  }, [editId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editId
        ? `http://localhost:8000/api/materials/${editId}`
        : "http://localhost:8000/api/materials";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        alert(editId ? "Material updated successfully!" : "Material added successfully!");
        
        // Reset form
        setFormData({ activity: "", name: "", unit: "", status: "Active" });
        
        // Navigate back to materials list
        navigate("/dashboard/material");
      } else {
        alert("Error adding material");
      }
    } catch (err) {
      console.error("Error saving material:", err);
      alert("Error adding material");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-6 sm:py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {editId ? "Edit Material" : "Add Material"}
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Fill out the form below to add a new material
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
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
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4]
                         focus:border-[#2044E4] transition text-sm sm:text-base"
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
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4]
                         focus:border-[#2044E4] transition text-sm sm:text-base"
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
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4]
                         focus:border-[#2044E4] transition text-sm sm:text-base"
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
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-[#2044E4]
                         focus:border-[#2044E4] transition text-sm sm:text-base"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#2044E4] text-white py-2 sm:py-3 rounded-lg
                         font-medium shadow-md hover:bg-blue-700 transition text-sm sm:text-base"
            >
              {editId ? "Save Changes" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

