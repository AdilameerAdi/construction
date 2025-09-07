import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

export default function Contractors() {
  const [contractors, setContractors] = useState([]);
  const navigate = useNavigate(); // <-- Initialize navigate

  const goToAddContractor = () => {
    navigate("/dashboard/add-contractor"); // <-- Route to AddContractor form
  };

  return (
    <div className="ml-6 mt-2 space-y-2">
      <button
        onClick={goToAddContractor} // <-- Call navigate function here
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <FaPlus className="mr-2" /> Add New Contractor
      </button>

      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Contractor Name</th>
          </tr>
        </thead>
        <tbody>
          {contractors.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center py-2">
                No Contractor found
              </td>
            </tr>
          ) : (
            contractors.map((contractor, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{contractor}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
