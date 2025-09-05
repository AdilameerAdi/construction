// src/pages/Admin.jsx
import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Admin() {
  const [admins, setAdmins] = useState([
    {
      position: "Manager",
      name: "John Doe",
      email: "john@example.com",
      mobile: "1234567890",
      status: "Active",
    },
  ]);

  const addAdmin = () => {
    const position = prompt("Enter Position:");
    const name = prompt("Enter Name:");
    const email = prompt("Enter Email:");
    const mobile = prompt("Enter Mobile No.:");
    const status = prompt("Enter Status (Active/Inactive):");

    if (position && name && email && mobile && status) {
      setAdmins([...admins, { position, name, email, mobile, status }]);
    }
  };

  const editAdmin = (index) => {
    const admin = admins[index];
    const position = prompt("Edit Position:", admin.position);
    const name = prompt("Edit Name:", admin.name);
    const email = prompt("Edit Email:", admin.email);
    const mobile = prompt("Edit Mobile No.:", admin.mobile);
    const status = prompt("Edit Status (Active/Inactive):", admin.status);

    if (position && name && email && mobile && status) {
      const updatedAdmins = [...admins];
      updatedAdmins[index] = { position, name, email, mobile, status };
      setAdmins(updatedAdmins);
    }
  };

  const deleteAdmin = (index) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      const updatedAdmins = admins.filter((_, i) => i !== index);
      setAdmins(updatedAdmins);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Admins</h1>
        <button
          onClick={addAdmin}
          className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Add New Admin
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Position</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Mobile No.</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold">Options</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400 italic">
                  No admins found.
                </td>
              </tr>
            ) : (
              admins.map((admin, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{admin.position}</td>
                  <td className="px-6 py-3">{admin.name}</td>
                  <td className="px-6 py-3">{admin.email}</td>
                  <td className="px-6 py-3">{admin.mobile}</td>
                  <td className="px-6 py-3">{admin.status}</td>
                  <td className="px-6 py-3 flex justify-center space-x-4">
                    <button
                      onClick={() => editAdmin(index)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteAdmin(index)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
