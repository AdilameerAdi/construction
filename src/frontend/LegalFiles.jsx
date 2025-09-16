import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function LegalFiles() {
  const location = useLocation();
  const projectId = location.state?.projectId;
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState(null);

  // ✅ Fetch files from DB when component loads
  useEffect(() => {
    const url = projectId 
      ? `http://localhost:8000/api/legal-files?project=${projectId}`
      : "http://localhost:8000/api/legal-files";
    fetch(url)
      .then(res => res.json())
      .then(data => setFiles(data))
      .catch(err => console.error(err));
  }, [projectId]);

  // ✅ Upload file metadata to DB
  const handleUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const newFile = {
        project: projectId,
        name: uploadedFile.name,
        addedBy: "Admin",
        date: new Date().toLocaleDateString("en-GB"),
        url: URL.createObjectURL(uploadedFile),
      };

      const res = await fetch("http://localhost:8000/api/legal-files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFile),
      });

      const savedFile = await res.json();
      setFiles(prev => [...prev, savedFile]);

      // ✅ Show success alert
      setAlert({ type: "success", message: "File uploaded successfully!" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  // ✅ Delete from DB
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/api/legal-files/${id}`, {
      method: "DELETE",
    });
    setFiles(prev => prev.filter(f => f._id !== id));

    // ✅ Show delete alert
    setAlert({ type: "error", message: "File deleted successfully!" });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-100">
      <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-center text-blue-700 mb-6">
        📂 Manage Legal Files
      </h2>

      {/* Alert Messages */}
      {alert && (
        <div
          className={`mb-4 p-3 rounded-lg text-center text-white shadow-md text-sm sm:text-base ${
            alert.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* File Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700 text-base sm:text-lg">
          Upload File
        </label>
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 bg-blue-50 rounded-xl h-32 sm:h-44 cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition duration-300">
          <span className="text-blue-600 font-semibold mb-1 text-sm sm:text-base px-4 text-center">Click or drag file to upload</span>
          <span className="text-gray-500 text-xs sm:text-sm">Supported: PDF, JPG, PNG</span>
          <input type="file" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {/* Desktop Table View - Hidden on small screens */}
      <div className="hidden sm:block overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <tr>
              <th className="px-3 lg:px-4 py-3 border text-xs lg:text-sm">#</th>
              <th className="px-3 lg:px-4 py-3 border text-xs lg:text-sm">File Name</th>
              <th className="px-3 lg:px-4 py-3 border text-xs lg:text-sm">Added By</th>
              <th className="px-3 lg:px-4 py-3 border text-xs lg:text-sm">Date</th>
              <th className="px-3 lg:px-4 py-3 border text-xs lg:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr
                key={file._id}
                className={`text-center transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="px-3 lg:px-4 py-3 border text-xs lg:text-sm">{index + 1}</td>
                <td className="px-3 lg:px-4 py-3 border text-xs lg:text-sm font-medium text-gray-800 max-w-xs truncate">{file.name}</td>
                <td className="px-3 lg:px-4 py-3 border text-xs lg:text-sm">{file.addedBy}</td>
                <td className="px-3 lg:px-4 py-3 border text-xs lg:text-sm">{file.date}</td>
                <td className="px-3 lg:px-4 py-3 border">
                  <div className="flex justify-center space-x-2 lg:space-x-4">
                    <a
                      href={file.url}
                      download={file.name}
                      className="px-2 lg:px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs lg:text-sm"
                    >
                      Download
                    </a>
                    <button
                      className="px-2 lg:px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs lg:text-sm"
                      onClick={() => handleDelete(file._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {files.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center px-4 py-6 text-gray-500 font-medium"
                >
                  🚫 No files uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible only on small screens */}
      <div className="sm:hidden space-y-4">
        {files.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            🚫 No files uploaded yet
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
                  className="w-full text-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                >
                  📥 Download
                </a>
                <button
                  className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                  onClick={() => handleDelete(file._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}