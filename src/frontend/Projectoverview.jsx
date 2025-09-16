import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GanttChart from "./Gantchart"; // make sure filename matches exactly (case-sensitive)

export default function ProjectOverview() {
  const location = useLocation();
  const project = location.state?.project;
  const projectId = project?.id;

  const [projectData, setProjectData] = useState({
    stocks: [],
    legalFiles: [],
    technicalFiles: [],
    customers: [],
    leads: [],
    finances: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const [stocksRes, legalRes, technicalRes, customersRes, leadsRes] = await Promise.all([
        fetch(`http://localhost:8000/api/stocks?project=${projectId}`),
        fetch(`http://localhost:8000/api/legal-files?project=${projectId}`),
        fetch(`http://localhost:8000/api/technical-files?project=${projectId}`),
        fetch(`http://localhost:8000/api/customers?project=${projectId}`),
        fetch(`http://localhost:8000/api/leads?project=${projectId}`)
      ]);

      const [stocks, legalFiles, technicalFiles, customers, leads] = await Promise.all([
        stocksRes.json(),
        legalRes.json(),
        technicalRes.json(),
        customersRes.json(),
        leadsRes.json()
      ]);

      setProjectData({
        stocks: Array.isArray(stocks) ? stocks : [],
        legalFiles: Array.isArray(legalFiles) ? legalFiles : [],
        technicalFiles: Array.isArray(technicalFiles) ? technicalFiles : [],
        customers: Array.isArray(customers) ? customers : [],
        leads: Array.isArray(leads?.data) ? leads.data : Array.isArray(leads) ? leads : [],
        finances: [] // Add finance API when available
      });
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3 sm:px-6 py-4 space-y-6 sm:space-y-8 max-w-full lg:max-w-[1000px] mx-auto">
      {/* Page Heading */}
      <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 break-words">
        Project Overview {project?.name && `- ${project.name}`}
      </h1>

      {/* Gantt Chart Section */}
      <div className="bg-white shadow-lg rounded-2xl p-3 sm:p-6">
        <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">
          Project Timeline (Gantt Chart)
        </h2>
        {/* ✅ Only Gantt chart scrolls horizontally */}
        <div className="border rounded-lg p-2 sm:p-4 overflow-x-auto">
          <div className="min-w-[600px] sm:min-w-[800px] lg:min-w-[1000px]">
            <GanttChart projectId={projectId} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading project data...</p>
        </div>
      ) : (
        <>
          <DataSection
            title="Stock Management"
            columns={["Material", "Type", "Quantity", "Stock", "Date"]}
            data={projectData.stocks}
            renderRow={(stock) => [
              stock.material?.name || stock.material || "-",
              stock.type || "-",
              stock.quantity || "-",
              stock.stock || "-",
              stock.date ? new Date(stock.date).toLocaleDateString() : "-"
            ]}
          />

          <DataSection
            title="Legal Files"
            columns={["File Name", "Added By", "Date"]}
            data={projectData.legalFiles}
            renderRow={(file) => [file.name || "-", file.addedBy || "-", file.date || "-"]}
          />

          <DataSection
            title="Technical Files"
            columns={["File Name", "Activity", "Added By", "Date"]}
            data={projectData.technicalFiles}
            renderRow={(file) => [
              file.name || "-",
              file.activity || "-",
              file.addedBy || "-",
              file.date || "-"
            ]}
          />

          <DataSection
            title="Customer Records"
            columns={["Full Name", "Primary Contact", "Unit No", "Amount"]}
            data={projectData.customers}
            renderRow={(customer) => [
              customer.fullName || "-",
              customer.primaryContact || "-",
              customer.unitNo || "-",
              customer.amount || "-"
            ]}
          />

          <DataSection
            title="Leads Records"
            columns={["Full Name", "Contact No", "Lead Type", "Is Converted"]}
            data={projectData.leads}
            renderRow={(lead) => [
              lead.fullName || "-",
              lead.contactNo || "-",
              lead.leadType || "-",
              lead.isConverted ? "Yes" : "No"
            ]}
          />

          <DataSection
            title="Finance Records"
            columns={["Transaction ID", "Type", "Amount", "Date"]}
            data={projectData.finances}
            renderRow={(finance) => [
              finance.id || "-",
              finance.type || "-",
              finance.amount || "-",
              finance.date || "-"
            ]}
          />
        </>
      )}
    </div>
  );
}

// ✅ Dynamic Data Section Component
function DataSection({ title, columns, data, renderRow }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-3 sm:p-6">
      <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-6 break-words">
        {title} ({data.length})
      </h2>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {data.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No data available for this project</div>
        ) : (
          data.map((item, idx) => {
            const rowData = renderRow(item);
            return (
              <div
                key={item._id || idx}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-1"
              >
                {columns.map((col, colIdx) => (
                  <div key={colIdx} className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600 mr-2">{col}:</span>
                    <span className="text-sm text-gray-800 text-right flex-1 break-words">
                      {rowData[colIdx]}
                    </span>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="border border-gray-300 px-3 lg:px-4 py-2 sm:py-3 text-left font-medium text-sm lg:text-base break-words"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="border border-gray-300 px-4 py-6 text-gray-500 text-center"
                >
                  No data available for this project
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={item._id || idx}
                  className="hover:bg-gray-50 transition text-sm lg:text-base"
                >
                  {renderRow(item).map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="border border-gray-300 px-3 lg:px-4 py-2 sm:py-3 break-words align-top"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
