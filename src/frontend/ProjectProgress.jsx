import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ProjectProgress() {
  const [showMaterialForm, setShowMaterialForm] = useState(null);
  const [materials, setMaterials] = useState({});
  const [formInputs, setFormInputs] = useState({ material: "", qty: "" });
  const [activities, setActivities] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const location = useLocation();
  const projectId = location.state?.projectId;
  const selectedTasks = location.state?.selectedTasks;

  // ✅ Fetch project with selected activities and tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const materialsRes = await fetch("http://localhost:8000/api/materials");
        const materialsData = await materialsRes.json();
        setMaterialOptions(Array.isArray(materialsData) ? materialsData : []);

        if (selectedTasks && selectedTasks.length > 0) {
          const activitiesRes = await fetch("http://localhost:8000/api/activities");
          const activitiesData = await activitiesRes.json();

          const activityMap = new Map();
          selectedTasks.forEach((task) => {
            const activity = activitiesData.find((a) => a._id === task.activityId);
            if (activity) {
              if (!activityMap.has(activity._id)) {
                activityMap.set(activity._id, { ...activity, tasks: [] });
              }
              activityMap.get(activity._id).tasks.push({
                _id: task.id,
                title: task.title,
                startDate: "",
                endDate: "",
                days: "",
              });
            }
          });
          setActivities(Array.from(activityMap.values()));
        } else if (projectId) {
          const projectRes = await fetch(
            `http://localhost:8000/api/projects/${projectId}`
          );
          const projectData = await projectRes.json();

          if (projectData.activities) {
            const tasksRes = await fetch("http://localhost:8000/api/tasks");
            const tasksData = await tasksRes.json();

            const selectedActivitiesWithTasks = projectData.activities.map(
              (activity) => {
                const activityTasks = (Array.isArray(tasksData) ? tasksData : [])
                  .filter((task) => {
                    const taskActivityId =
                      typeof task.activity === "object"
                        ? task.activity._id
                        : task.activity;
                    return String(taskActivityId) === String(activity._id);
                  })
                  .map((task) => ({
                    ...task,
                    startDate: "",
                    endDate: "",
                    days: "",
                  }));

                return { ...activity, tasks: activityTasks };
              }
            );

            setActivities(selectedActivitiesWithTasks);
          }
        } else {
          const activitiesRes = await fetch(
            "http://localhost:8000/api/activities"
          );
          const activitiesData = await activitiesRes.json();

          const tasksRes = await fetch("http://localhost:8000/api/tasks");
          const tasksData = await tasksRes.json();

          const activitiesWithTasks = (Array.isArray(activitiesData)
            ? activitiesData
            : []
          ).map((activity) => {
            const activityTasks = (Array.isArray(tasksData) ? tasksData : [])
              .filter((task) => {
                const taskActivityId =
                  typeof task.activity === "object"
                    ? task.activity._id
                    : task.activity;
                return String(taskActivityId) === String(activity._id);
              })
              .map((task) => ({
                ...task,
                startDate: "",
                endDate: "",
                days: "",
              }));

            return { ...activity, tasks: activityTasks };
          });

          setActivities(activitiesWithTasks);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, [projectId, selectedTasks]);

  // ✅ Handle add material
  const handleAddMaterial = (taskId) => {
    const { material, qty } = formInputs;
    if (!material || !qty) return;

    let newEntry = { material, qty };
    setMaterials({
      ...materials,
      [taskId]: [...(materials[taskId] || []), newEntry],
    });

    setFormInputs({ material: "", qty: "" });
    setShowMaterialForm(null);
  };

  // ✅ Handle user input for task details
  const handleTaskChange = (id, field, value) => {
    setActivities((prev) =>
      prev.map((activity) => ({
        ...activity,
        tasks: activity.tasks.map((t) =>
          t._id === id ? { ...t, [field]: value } : t
        ),
      }))
    );
  };

  // ✅ Handle project completion
  const handleSubmitProject = async () => {
    try {
      const projectData = {
        name: location.state?.project?.name || "Project " + Date.now(),
        location: location.state?.project?.location || "Construction Site",
        status: "Completed",
        activities: activities.map((activity) => activity._id),
        projectDetails: {
          activities: activities.map((activity) => ({
            ...activity,
            tasks: activity.tasks.map((task) => ({
              ...task,
              materials: materials[task._id] || [],
            })),
          })),
        },
      };

      const res = await fetch("http://localhost:8000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) throw new Error("Failed to save project");

      alert("Project completed and saved successfully!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error completing project:", err);
      alert("Error completing project");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-700 mb-4 sm:mb-6 lg:mb-8 border-b pb-4">
          Activities & Tasks Progress
        </h2>

        {activities.map((activity) => (
          <div
            key={activity._id}
            className="mb-6 sm:mb-8 lg:mb-10 border rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
          >
            {/* Activity Header */}
            <div className="bg-blue-100 px-4 sm:px-6 py-3 border-b border-blue-200">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-700">
                {activity.title}
              </h3>
            </div>

            {/* Mobile Card View - Visible only on small screens */}
            <div className="block sm:hidden space-y-4 p-4">
              {activity.tasks.length === 0 ? (
                <div className="text-center py-6 text-gray-500 italic">
                  No tasks found for this activity.
                </div>
              ) : (
                activity.tasks.map((task, i) => (
                  <div key={task._id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded font-medium">
                            #{i + 1}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-800 text-base mb-2">{task.title}</h4>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="block text-gray-500 mb-1">Start Date:</label>
                        <input
                          type="date"
                          value={task.startDate || ""}
                          onChange={(e) => handleTaskChange(task._id, "startDate", e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1">End Date:</label>
                        <input
                          type="date"
                          value={task.endDate || ""}
                          onChange={(e) => handleTaskChange(task._id, "endDate", e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1">Days:</label>
                        <input
                          type="number"
                          placeholder="Days"
                          value={task.days || ""}
                          onChange={(e) => handleTaskChange(task._id, "days", e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1">Performance:</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={task.performance || 50}
                          onChange={(e) => handleTaskChange(task._id, "performance", e.target.value)}
                          className="w-full accent-blue-600"
                        />
                        <div className="text-center mt-1 text-blue-600 font-medium text-sm">
                          {task.performance || 50}%
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <button
                        className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow text-sm"
                        onClick={() =>
                          setShowMaterialForm(
                            showMaterialForm === task._id ? null : task._id
                          )
                        }
                      >
                        Add Material
                      </button>

                      {/* Material Form for Mobile */}
                      {showMaterialForm === task._id && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold mb-3 text-gray-700 text-sm">
                            Add Material
                          </h4>
                          <div className="space-y-3">
                            <select
                              value={formInputs.material}
                              onChange={(e) =>
                                setFormInputs({
                                  ...formInputs,
                                  material: e.target.value,
                                })
                              }
                              className="w-full border rounded-lg px-3 py-2 text-sm"
                            >
                              <option value="">Select Material</option>
                              {materialOptions.length > 0 ? (
                                materialOptions.map((m) => (
                                  <option
                                    key={m._id || m.name}
                                    value={m.name || m.title}
                                  >
                                    {m.name || m.title}
                                  </option>
                                ))
                              ) : (
                                <option value="" disabled>
                                  No materials found
                                </option>
                              )}
                            </select>
                            <input
                              type="number"
                              placeholder="Quantity"
                              value={formInputs.qty}
                              onChange={(e) =>
                                setFormInputs({ ...formInputs, qty: e.target.value })
                              }
                              className="w-full border rounded-lg px-3 py-2 text-sm"
                            />
                            <button
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm"
                              onClick={() => handleAddMaterial(task._id)}
                            >
                              Add
                            </button>
                          </div>

                          <div className="mt-4">
                            <h4 className="font-medium text-gray-700 text-sm mb-2">
                              Added Materials
                            </h4>
                            <div className="space-y-2">
                              {materials[task._id]?.length ? (
                                materials[task._id].map((m, idx) => (
                                  <div key={idx} className="bg-white rounded p-2 border text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Material:</span>
                                      <span className="font-medium">{m.material}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Quantity:</span>
                                      <span className="font-medium">{m.qty}</span>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-3 text-gray-500 text-sm">
                                  No materials added.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Task Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border p-3">#</th>
                    <th className="border p-3 text-left">Task</th>
                    <th className="border p-3">Start Date</th>
                    <th className="border p-3">End Date</th>
                    <th className="border p-3">Days</th>
                    <th className="border p-3">Performance</th>
                    <th className="border p-3">Materials</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.tasks.map((task, i) => (
                    <React.Fragment key={task._id}>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="border p-3 text-center font-medium">
                          {i + 1}
                        </td>
                        <td className="border p-3">{task.title}</td>

                        <td className="border p-2">
                          <input
                            type="date"
                            value={task.startDate || ""}
                            onChange={(e) =>
                              handleTaskChange(task._id, "startDate", e.target.value)
                            }
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="border p-2">
                          <input
                            type="date"
                            value={task.endDate || ""}
                            onChange={(e) =>
                              handleTaskChange(task._id, "endDate", e.target.value)
                            }
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="border p-2">
                          <input
                            type="number"
                            placeholder="Days"
                            value={task.days || ""}
                            onChange={(e) =>
                              handleTaskChange(task._id, "days", e.target.value)
                            }
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="border p-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={task.performance || 50}
                            onChange={(e) =>
                              handleTaskChange(task._id, "performance", e.target.value)
                            }
                            className="w-full accent-blue-600"
                          />
                          <div className="text-xs text-center mt-1 text-blue-600 font-medium">
                            {task.performance || 50}%
                          </div>
                        </td>
                        <td className="border p-2 text-center">
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
                            onClick={() =>
                              setShowMaterialForm(
                                showMaterialForm === task._id ? null : task._id
                              )
                            }
                          >
                            Add Material
                          </button>
                        </td>
                      </tr>

                      {/* Material Form */}
                      {showMaterialForm === task._id && (
                        <tr>
                          <td colSpan="7" className="p-6 bg-gray-50 border">
                            <h3 className="font-semibold mb-3 text-gray-700">
                              Add Material
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <select
                                value={formInputs.material}
                                onChange={(e) =>
                                  setFormInputs({
                                    ...formInputs,
                                    material: e.target.value,
                                  })
                                }
                                className="border rounded-lg px-4 py-2"
                              >
                                <option value="">Select Material</option>
                                {materialOptions.length > 0 ? (
                                  materialOptions.map((m) => (
                                    <option
                                      key={m._id || m.name}
                                      value={m.name || m.title}
                                    >
                                      {m.name || m.title}
                                    </option>
                                  ))
                                ) : (
                                  <option value="" disabled>
                                    No materials found
                                  </option>
                                )}
                              </select>
                              <input
                                type="number"
                                placeholder="Quantity"
                                value={formInputs.qty}
                                onChange={(e) =>
                                  setFormInputs({ ...formInputs, qty: e.target.value })
                                }
                                className="border rounded-lg px-3 py-2"
                              />
                              <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                                onClick={() => handleAddMaterial(task._id)}
                              >
                                Add
                              </button>
                            </div>

                            <h4 className="font-medium text-gray-700">
                              Added Materials
                            </h4>
                            <table className="w-full border mt-2 text-sm">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border p-2">Material</th>
                                  <th className="border p-2">Quantity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {materials[task._id]?.length ? (
                                  materials[task._id].map((m, idx) => (
                                    <tr key={idx}>
                                      <td className="border p-2">{m.material}</td>
                                      <td className="border p-2">{m.qty}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan="2"
                                      className="p-3 text-gray-500 text-center"
                                    >
                                      No Material found.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  {activity.tasks.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-4 text-center text-gray-500 italic"
                      >
                        No tasks found for this activity.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="text-center text-gray-500 py-12 text-lg">
            No activities found. Please create activities and tasks first.
          </div>
        )}

        {activities.length > 0 && (
          <div className="mt-6 sm:mt-8 lg:mt-10 text-center">
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 text-base sm:text-lg font-semibold transition"
              onClick={handleSubmitProject}
            >
              Submit Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
