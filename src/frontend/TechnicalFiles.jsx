import { useState } from "react";

export default function TechnicalFiles() {
  const [files, setFiles] = useState([]);
  const [activity, setActivity] = useState("");

  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const newFile = {
        id: files.length + 1,
        activity: activity || "General",
        name: uploadedFile.name,
        addedBy: "Admin",
        date: new Date().toLocaleDateString("en-GB"), // dd/mm/yyyy
        url: URL.createObjectURL(uploadedFile) // temporary URL for download
      };
      setFiles(prev => [...prev, newFile]);
      setActivity(""); // reset activity after upload
    }
  };

  const handleDelete = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Technical Files</h2>

      {/* Activity Selection and File Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Twin Tower</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full mb-4"
        >
          <option value="">Select Activity</option>
   <option value="Design">Brickwork</option>
      <option value="Design">Electrification</option>
          <option value="Construction">Fabrication</option>
          <option value="Inspection">Flooring</option>
          <option value="Design">Other</option>
          <option value="Construction">Painting</option>
          <option value="Inspection">Plumbing</option>
        </select>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition">
          <span className="text-gray-500 mb-2">Click or drag file to upload</span>
          <span className="text-gray-400 text-sm">Supported: PDF, DOCX, JPG, PNG</span>
          <input
            type="file"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Files Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Activity</th>
              <th className="px-4 py-2 border">File Name</th>
              <th className="px-4 py-2 border">Added By</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.id} className="text-center">
                <td className="px-4 py-2 border">{file.id}</td>
                <td className="px-4 py-2 border">{file.activity}</td>
                <td className="px-4 py-2 border">{file.name}</td>
                <td className="px-4 py-2 border">{file.addedBy}</td>
                <td className="px-4 py-2 border">{file.date}</td>
                <td className="px-4 py-2 border flex justify-center space-x-2">
                  {/* Download Button */}
                  <a
                    href={file.url}
                    download={file.name}
                    className="text-green-600 hover:underline"
                  >
                    Download
                  </a>
                  {/* Delete Button */}
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(file.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {files.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center px-4 py-2 border text-gray-500">
                  No technical files uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
