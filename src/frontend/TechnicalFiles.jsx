import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Upload, Trash2, Download } from "lucide-react";

export default function TechnicalFiles() {
  const location = useLocation();
  const projectId = location.state?.projectId;
  const [files, setFiles] = useState([]);
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]);
  const [allowWithoutActivity, setAllowWithoutActivity] = useState(false);

  // ✅ Fetch activities list
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/activities");
        if (!res.ok) throw new Error("Failed to fetch activities");
        const data = await res.json();
        setActivities(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Activities fetch error:", err);
      }
    };
    fetchActivities();
  }, []);

  // ✅ Fetch technical files list
 useEffect(() => {
  const fetchFiles = async () => {
    try {
      const url = projectId 
        ? `http://localhost:8000/api/technical-files?project=${projectId}`
        : "http://localhost:8000/api/technical-files";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch files");
      const data = await res.json();

      // ✅ Ensure array and sort by activity alphabetically
      const sorted = (Array.isArray(data) ? data : []).sort((a, b) =>
        (a.activity || "").toLowerCase().localeCompare((b.activity || "").toLowerCase())
      );

      setFiles(sorted);
    } catch (err) {
      console.error("Files fetch error:", err);
    }
  };
  fetchFiles();
}, [projectId]);

  // ✅ Upload new file
  const handleUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    if (!activity && !allowWithoutActivity) {
      alert("⚠ Please select an activity or check 'Allow without activity'.");
      return;
    }

    const newFile = {
      project: projectId,
      activity: activity || "General",
      name: uploadedFile.name,
      addedBy: "Admin",
      date: new Date().toLocaleDateString("en-GB"),
      url: URL.createObjectURL(uploadedFile),
    };

    try {
      const res = await fetch("http://localhost:8000/api/technical-files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFile),
      });

      if (!res.ok) throw new Error("Failed to upload file");
      const savedFile = await res.json();

      setFiles((prev) => [...prev, savedFile]);
      setActivity("");
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  // ✅ Delete file
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/technical-files/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete file");

      setFiles((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-100">
      <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-center text-gray-900 mb-6 sm:mb-8 lg:mb-10">
        📂 Manage Technical Files
      </h2>

      {/* Upload Section */}
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 lg:mb-10">
        <label className="block mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
          Select Activity
        </label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="border px-3 sm:px-4 py-2 sm:py-3 rounded-xl w-full mb-3 sm:mb-4 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Choose an activity --</option>
          {activities.map((act) => (
            <option key={act._id} value={act.title}>
              {act.title}
            </option>
          ))}
        </select>

        {/* ✅ Checkbox to allow upload without activity */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <input
            id="allowWithoutActivity"
            type="checkbox"
            checked={allowWithoutActivity}
            onChange={(e) => setAllowWithoutActivity(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="allowWithoutActivity" className="text-gray-600 text-sm sm:text-base">
            Allow upload without selecting an activity
          </label>
        </div>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl h-32 sm:h-40 lg:h-48 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
          <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-2" />
          <span className="text-gray-600 font-medium text-sm sm:text-base px-4 text-center">
            Click or drag file to upload
          </span>
          <span className="text-gray-400 text-xs sm:text-sm mt-1 text-center">
            Supported: PDF, DOCX, JPG, PNG
          </span>
          <input type="file" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {/* Mobile Card View - Visible only on small screens */}
      <div className="block sm:hidden space-y-4">
        {files.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            🚫 No technical files uploaded yet
          </div>
        ) : (
          files.map((file, index) => (
            <div key={file._id} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-base mb-1 break-all">
                    {file.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Activity:</span>
                  <span className="text-gray-800 font-medium">{file.activity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Added By:</span>
                  <span className="text-gray-800 font-medium">{file.addedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-800 font-medium">{file.date}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={file.url}
                  download={file.name}
                  className="w-full text-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
                <button
                  className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm flex items-center justify-center gap-2"
                  onClick={() => handleDelete(file._id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View - Hidden on small screens */}
      <div className="hidden sm:block bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <tr>
                <th className="px-3 lg:px-4 py-3 text-xs lg:text-sm">#</th>
                <th className="px-3 lg:px-4 py-3 text-xs lg:text-sm">Activity</th>
                <th className="px-3 lg:px-4 py-3 text-xs lg:text-sm">File Name</th>
                <th className="px-3 lg:px-4 py-3 text-xs lg:text-sm">Added By</th>
                <th className="px-3 lg:px-4 py-3 text-xs lg:text-sm">Date</th>
                <th className="px-3 lg:px-4 py-3 text-xs lg:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr
                  key={file._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-3 lg:px-4 py-3 text-center font-medium text-gray-900 text-xs lg:text-sm">
                    {index + 1}
                  </td>
                  <td className="px-3 lg:px-4 py-3 text-center text-xs lg:text-sm">{file.activity}</td>
                  <td className="px-3 lg:px-4 py-3 text-center text-xs lg:text-sm font-medium max-w-xs truncate">{file.name}</td>
                  <td className="px-3 lg:px-4 py-3 text-center text-xs lg:text-sm">{file.addedBy}</td>
                  <td className="px-3 lg:px-4 py-3 text-center text-xs lg:text-sm">{file.date}</td>
                  <td className="px-3 lg:px-4 py-3">
                    <div className="flex justify-center gap-2 lg:gap-4">
                      <a
                        href={file.url}
                        download={file.name}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800 hover:bg-green-50 px-2 py-1 rounded text-xs lg:text-sm font-medium transition"
                      >
                        <Download className="w-3 h-3 lg:w-4 lg:h-4" /> Download
                      </a>
                      <button
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded text-xs lg:text-sm font-medium transition"
                        onClick={() => handleDelete(file._id)}
                      >
                        <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {files.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    🚫 No technical files uploaded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}