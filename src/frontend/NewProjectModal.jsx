import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";

export default function NewProject() {
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState({
    name: "",
    location: "",
    status: "Pending",
  });

  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save newProject to database via API here
    console.log("New Project Added:", newProject);
    alert(`Project "${newProject.name}" added successfully!`);

    // Reset form
    setNewProject({ name: "", location: "", status: "Pending" });
    setMarkerPosition(null);

    // Navigate to Project2file page
    navigate("/dashboard/project2file", { state: { project: newProject } });
  };

  // Marker and click handler
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng);
        setNewProject((prev) => ({
          ...prev,
          location: `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`,
        }));
      },
    });
    return markerPosition ? <Marker position={markerPosition} /> : null;
  }

  // Fix Leaflet map when shown
  function MapResizeFix() {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
    }, [map]);
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Add a New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Project Name</label>
          <input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Project Location */}
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Project Location</label>
          <input
            type="text"
            name="location"
            value={newProject.location}
            readOnly
            placeholder="Click to select location"
            onClick={() => setShowMap((prev) => !prev)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-100 cursor-pointer"
          />

          {showMap && (
            <div className="absolute top-full left-0 w-full h-80 mt-2 z-20 border rounded-lg overflow-hidden shadow-lg">
              <MapContainer
                center={markerPosition || [22.5937, 78.9629]} // India center if no marker
                zoom={5}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <LocationMarker />
                <MapResizeFix />
              </MapContainer>
            </div>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            name="status"
            value={newProject.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Pending</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/project2file")}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
}
