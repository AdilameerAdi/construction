// src/frontend/Project2file.jsx
import { useState, useEffect } from "react";

export default function Project2file() {
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedTasks, setSelectedTasks] = useState({}); // { taskId: true/false }

  //  Fetch tasks & activities from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch activities
        const actRes = await fetch("http://localhost:8000/api/activities");
        if (!actRes.ok) throw new Error("Failed to fetch activities");
        const actData = await actRes.json();
        setActivities(actData);

        // Fetch tasks
        const taskRes = await fetch("http://localhost:8000/api/tasks");
        if (!taskRes.ok) throw new Error("Failed to fetch tasks");
        const taskData = await taskRes.json();

        //  Normalize tasks: if task.activity is object → use populated data
        const normalizedTasks = taskData.map((t) => ({
          id: t._id,
          title: t.title,
          status: t.status,
          activityId: t.activity?._id || t.activity, // support populated or plain id
          activityTitle: t.activity?.title || "Unknown Activity",
        }));

        setTasks(normalizedTasks);
      } catch (err) {
        console.error("Error fetching tasks/activities:", err);
      }
    };

    fetchData();
  }, []);

  //  Handle checkbox toggle
  const toggleTask = (taskId) => {
    setSelectedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  //  Filter tasks by title
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 🔍 Search Filter */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/*  Activities and their related tasks */}
      {activities.length === 0 ? (
        <p className="text-gray-500">No activities found.</p>
      ) : (
        activities.map((activity) => {
          //  Get tasks linked to this activity
          const relatedTasks = filteredTasks.filter(
            (task) => task.activityId === activity._id
          );

          return (
            <div key={activity._id} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {activity.title}
              </h2>

              {relatedTasks.length === 0 ? (
                <p className="text-gray-400 ml-4">No tasks for this activity</p>
              ) : (
                <div className="space-y-2 ml-4">
                  {relatedTasks.map((task) => (
                    <label key={task.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={!!selectedTasks[task.id]}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">
                        {task.title}{" "}
                        {/* <span
                          className={`ml-2 text-xs px-2 py-1 rounded ${
                            task.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {task.status}
                        </span> */}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}


// // src/frontend/Project2file.jsx
// import { useState, useEffect } from "react";

// export default function Project2file() {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("");
//   const [selectedTasks, setSelectedTasks] = useState({}); // { taskId: true/false }

//   // Fetch tasks from API
//   useEffect(() => {
//     fetch("https://your-api.com/tasks") // Replace with your real API
//       .then((res) => res.json())
//       .then((data) => {
//         setTasks(data); 
//         // data example: [{id:1, title:"Task 1", activity:"Activity 1"}, ...]
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // Handle checkbox toggle
//   const toggleTask = (taskId) => {
//     setSelectedTasks((prev) => ({
//       ...prev,
//       [taskId]: !prev[taskId],
//     }));
//   };

//   // Filter tasks by name
//   const filteredTasks = tasks.filter((task) =>
//     task.title.toLowerCase().includes(filter.toLowerCase())
//   );

//   // Group tasks by activity
//   const groupedTasks = filteredTasks.reduce((acc, task) => {
//     if (!acc[task.activity]) acc[task.activity] = [];
//     acc[task.activity].push(task);
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Filter input */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search tasks..."
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Task List grouped by Activity */}
//       {Object.keys(groupedTasks).length === 0 ? (
//         <p className="text-gray-500">No tasks found.</p>
//       ) : (
//         Object.keys(groupedTasks).map((activity) => (
//           <div key={activity} className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">{activity}</h2>
//             <div className="space-y-2">
//               {groupedTasks[activity].map((task) => (
//                 <label key={task.id} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={!!selectedTasks[task.id]}
//                     onChange={() => toggleTask(task.id)}
//                     className="w-5 h-5 text-blue-600 border-gray-300 rounded"
//                   />
//                   <span className="text-gray-700">{task.title}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
