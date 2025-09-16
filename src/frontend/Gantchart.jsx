import React, { useState, useEffect } from "react";
// Removed Google Chart import
import { useLocation } from "react-router-dom";

export default function GanttChart({ projectId: propProjectId }) {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null); // ✅ For modal
  const location = useLocation();
  const projectId = propProjectId || location.state?.projectId;

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        if (!projectId) {
          setLoading(false);
          return;
        }
        const res = await fetch(`http://localhost:8000/api/projects/${projectId}`);
        const data = await res.json();
        setProjectData(data);
      } catch (err) {
        setProjectData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [projectId]);

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  // Generate rows for a specific activity, filter to only current month
  const generateRowsForActivity = (activity) => {
    const rows = [];
    let taskCounter = 1;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    activity.tasks?.forEach((task) => {
      if (task.startDate && task.endDate) {
        const startDate = new Date(task.startDate);
        const endDate = new Date(task.endDate);
        // Only include tasks that are in the current month
        if (
          (startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) ||
          (endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear)
        ) {
          // Calculate progress based on current date
          const today = now;
          let progress = 0;
          if (today >= endDate) {
            progress = 100;
          } else if (today >= startDate) {
            const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
            const elapsedDays = (today - startDate) / (1000 * 60 * 60 * 24);
            progress = Math.min(Math.round((elapsedDays / totalDays) * 100), 100);
          }
          // Duration from input days or calculated
          const duration = task.days
            ? parseInt(task.days)
            : Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
          // Use input performance or calculate default
          const performance = task.performance ? parseInt(task.performance) : 50;
          // Resources from materials - show actual material values
          const resources =
            task.materials?.length > 0
              ? task.materials.map((m) => `${m.material} (${m.qty})`).join(", ")
              : "No materials";
          rows.push([
            `Task${taskCounter}`,
            task.title,
            resources,
            startDate,
            endDate,
            duration * 24 * 60 * 60 * 1000,
            performance,
            null,
          ]);
          taskCounter++;
        }
      }
    });
    return rows;
  };

  // Get activities with valid tasks
  const getActivitiesWithTasks = () => {
    if (!projectData?.projectDetails?.activities) {
      console.log("No projectDetails.activities found");
      return [];
    }

    console.log("Project details activities:", projectData.projectDetails.activities);

    const validActivities = projectData.projectDetails.activities.filter((activity) => {
      const hasValidTasks = activity.tasks?.some((task) => {
        console.log("Checking task:", task);
        return task.startDate && task.endDate;
      });
      console.log(`Activity ${activity.title} has valid tasks:`, hasValidTasks);
      return hasValidTasks;
    });

    console.log("Valid activities:", validActivities);
    return validActivities;
  };

  const activitiesWithTasks = getActivitiesWithTasks();

  // Custom Gantt chart bar colors
  const getBarColor = (percent) => {
    if (percent >= 67) return "#44cc44"; // High
    if (percent >= 34) return "#ffaa00"; // Medium
    return "#ff4444"; // Low
  };

  // Custom Gantt chart renderer
  function CustomGanttChart({ activities }) {
    // Flatten all tasks for the current month
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    let allTasks = [];
    activities.forEach((activity) => {
      activity.tasks?.forEach((task) => {
        if (task.startDate && task.endDate) {
          const startDate = new Date(task.startDate);
          const endDate = new Date(task.endDate);
          if (
            (startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) ||
            (endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear)
          ) {
            // Calculate progress
            let progress = 0;
            if (now >= endDate) progress = 100;
            else if (now >= startDate) {
              const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
              const elapsedDays = (now - startDate) / (1000 * 60 * 60 * 24);
              progress = Math.min(Math.round((elapsedDays / totalDays) * 100), 100);
            }
            allTasks.push({
              title: task.title,
              startDate,
              endDate,
              progress,
              resources:
                task.materials?.length > 0
                  ? task.materials.map((m) => `${m.material} (${m.qty})`).join(", ")
                  : "No materials",
              materials: task.materials || [],
              activity: activity.title,
            });
          }
        }
      });
    });

    if (allTasks.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          Nothing is present here.
        </div>
      );
    }

    // Find min/max date for chart scale
    const minDate = new Date(Math.min(...allTasks.map((t) => t.startDate.getTime())));
    const maxDate = new Date(Math.max(...allTasks.map((t) => t.endDate.getTime())));
    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;

    // Helper to get left offset and width for a bar
    const dayWidth = 32; // px per day
    const getBarStyle = (start, end) => {
      const left = ((start - minDate) / (1000 * 60 * 60 * 24)) * dayWidth;
      const width = ((end - start) / (1000 * 60 * 60 * 24) + 1) * dayWidth;
      return { left, width };
    };

    // Render day headers
    const daysArray = Array.from({ length: totalDays }, (_, i) => {
      const d = new Date(minDate.getTime() + i * 24 * 60 * 60 * 1000);
      return d;
    });

    // Add some extra width for the right button column (so button does not overlap)
    const extraRightSpace = 240; // px for right button column and padding
    const containerMinWidth = `${totalDays * dayWidth + extraRightSpace}px`;

    return (
      <div className="overflow-x-auto border rounded-lg p-2 sm:p-4 bg-white">
        <div style={{ minWidth: containerMinWidth }}>
          {/* Day headers with vertical grid */}
          <div className="flex border-b pb-2 mb-2 relative" style={{ minHeight: 32 }}>
            <div className="w-48 text-xs font-bold text-gray-700">Task</div>
            {daysArray.map((d, idx) => (
              <div
                key={idx}
                className="w-8 text-xs text-gray-500 text-center border-l border-gray-200"
              >
                {d.getDate()}
              </div>
            ))}
            {/* Right spacer so headers align with button column */}
            <div className="w-28 flex-shrink-0" />
            {/* Vertical grid lines */}
            <div
              className="absolute left-48 top-0 h-full w-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              {daysArray.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    left: idx * dayWidth,
                    width: 0,
                    borderLeft: "1px solid #e5e7eb",
                    position: "absolute",
                    height: "100%",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Task bars with alternating backgrounds and tooltips */}
          {allTasks.map((task, idx) => {
            const { left, width } = getBarStyle(task.startDate, task.endDate);
            return (
              <div
                key={idx}
                className={`flex items-center relative ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } rounded-lg mb-2`}
                style={{ height: 64 }}
              >
                {/* Label column */}
                <div className="w-48 pr-2 text-sm text-gray-800 font-medium py-2">
                  <div>{task.title}</div>
                  <div className="text-xs text-gray-500">{task.activity}</div>
                </div>

                {/* Timeline column */}
                <div
                  className="relative flex-1"
                  style={{ height: 64 }}
                >
                  {/* Inner timeline sized to totalDays (keeps bars and headers aligned) */}
                  <div style={{ position: "relative", minWidth: `${totalDays * dayWidth}px`, height: "100%" }}>
                    <div
                      className="absolute rounded-full shadow-lg group cursor-pointer"
                      style={{
                        left,
                        width,
                        height: 32,
                        background: getBarColor(task.progress),
                        opacity: 0.92,
                        transition: "width 0.3s",
                        top: 16,
                        zIndex: 2,
                      }}
                    >
                      <span className="absolute left-2 top-1 text-xs text-white font-bold">
                        {task.progress}%
                      </span>

                      {/* Tooltip - multi-line */}
                      <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 -top-24 bg-gray-900 text-white text-xs rounded px-3 py-2 z-10 whitespace-pre-line text-left w-max max-w-xs">
                        <div><strong>Task:</strong> {task.title}</div>
                        <div><strong>Activity:</strong> {task.activity}</div>
                        <div><strong>Materials:</strong></div>
                        {task.materials.length > 0 ? (
                          task.materials.map((m, i) => (
                            <div key={i} className="pl-2">- {m.material}: {m.qty}</div>
                          ))
                        ) : (
                          <div className="pl-2">No materials</div>
                        )}
                        <div><strong>Progress:</strong> {task.progress}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button column (fixed width, does not overlap the bar) */}
                <div className="w-28 flex-shrink-0 flex items-center justify-center pr-2">
                  <button
                    className="bg-blue-500 text-white text-xs px-3 py-1 rounded shadow hover:bg-blue-600"
                    onClick={() => setSelectedTask(task)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (activitiesWithTasks.length === 0 || !projectData) {
    return (
      <div className="px-3 sm:px-6 py-4 text-center text-gray-500">
        Nothing is present here.
      </div>
    );
  }

  // Remove loading screen, always show chart or simple message
  return (
    <div className="px-3 sm:px-6 py-4 space-y-6 sm:space-y-8 max-w-full lg:max-w-[1000px] mx-auto">
      <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 break-words">
        Gantt Chart - {projectData?.name || "Project Timeline"}
      </h2>
      {/* Project Info */}
      {projectData && (
        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-700">
            <strong>Project:</strong> {projectData.name} | <strong>Location:</strong>{" "}
            {projectData.location} | <strong>Status:</strong> {projectData.status}
          </p>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-2xl p-3 sm:p-6">
        <h3 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">
          Project Timeline (Gantt Chart)
        </h3>
        <CustomGanttChart activities={activitiesWithTasks} />
      </div>

      {/* ✅ Modal for View Details */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-96 relative border border-gray-200">
    <h3 className="text-xl font-bold mb-4 text-gray-800">Task Details</h3>

    <div className="space-y-2 text-gray-700">
      <p><strong>Task:</strong> {selectedTask.title}</p>
      <p><strong>Activity:</strong> {selectedTask.activity}</p>
      <p><strong>Progress:</strong> {selectedTask.progress}%</p>

      <div>
        <strong>Materials:</strong>
        {selectedTask.materials.length > 0 ? (
          <ul className="list-disc list-inside mt-1">
            {selectedTask.materials.map((m, i) => (
              <li key={i}>{m.material}: {m.qty}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No materials</p>
        )}
      </div>
    </div>

    <button
      className="mt-6 w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded-xl shadow hover:from-red-600 hover:to-red-700 transition"
      onClick={() => setSelectedTask(null)}
    >
      Close
    </button>
  </div>
</div>
      )}
    </div>
  );
}
