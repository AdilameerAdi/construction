import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Contractors() {
  const [contractors, setContractors] = useState([]);
  const navigate = useNavigate();

  // Fetch contractors from API
  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/contractors");
        if (!response.ok) throw new Error("Failed to fetch contractors");

        const data = await response.json();
        setContractors(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContractors();
  }, []);

  const goToAddContractor = () => {
    navigate("/dashboard/add-contractor");
  };

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/dashboard/edit-contractor/${id}`);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contractor?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/contractors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete contractor");

      setContractors((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete contractor");
    }
  };

  return (
    <div className="ml-6 mt-2 space-y-2">
      <button
        onClick={goToAddContractor}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <FaPlus className="mr-2" /> Add New Contractor
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Activity</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">PAN</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Bank</th>
              <th className="px-4 py-2 text-left">Account No</th>
              <th className="px-4 py-2 text-left">IFSC</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contractors.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-2">
                  No Contractor found
                </td>
              </tr>
            ) : (
              contractors.map((contractor, index) => (
                <tr key={contractor._id || index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {contractor.activity?.title || "N/A"}
                  </td>
                  <td className="px-4 py-2">{contractor.name}</td>
                  <td className="px-4 py-2">{contractor.pan}</td>
                  <td className="px-4 py-2">{contractor.contact}</td>
                  <td className="px-4 py-2">{contractor.bank}</td>
                  <td className="px-4 py-2">{contractor.accountNo}</td>
                  <td className="px-4 py-2">{contractor.ifsc}</td>
                  <td className="px-4 py-2 flex gap-3 text-lg">
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(contractor._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(contractor._id)}
                      className="text-red-600 hover:text-red-800"
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
