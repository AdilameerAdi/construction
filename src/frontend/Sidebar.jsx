import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    setIsSidebarOpen(false);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg transform transition-transform duration-300 z-50
      ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Sidebar as flex column */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between h-16 border-b border-white/20 px-4">
          <div className="flex items-center">
            <div className="bg-white text-blue-600 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
              MC
            </div>
            <span className="ml-3 font-bold text-lg">MANTRI</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white text-2xl font-bold hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Navigation (scrollable if too long) */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-4">
          <Link
            to="/dashboard"
            onClick={handleLinkClick}
            className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-white/20"
          >
            Home
          </Link>

          {/* Work Activity */}
          <div>
            <span className="block px-4 py-2 font-semibold">Work Activity</span>
            <div className="ml-6 mt-1 space-y-1">
              <Link to="/dashboard/activity" onClick={handleLinkClick} className="block px-4 py-2 rounded-lg hover:bg-white/30">Activity</Link>
              <Link to="/dashboard/task" onClick={handleLinkClick} className="block px-4 py-2 rounded-lg hover:bg-white/30">Task</Link>
            </div>
          </div>

          {/* Agencies */}
          <div>
            <span className="block px-4 py-2 font-semibold">Agencies</span>
            <div className="ml-6 mt-1 space-y-1">
              <Link to="/dashboard/contractors" onClick={handleLinkClick} className="block px-4 py-2 rounded-lg hover:bg-white/30">Contractors</Link>
              <Link to="/dashboard/vendors" onClick={handleLinkClick} className="block px-4 py-2 rounded-lg hover:bg-white/30">Vendors</Link>
            </div>
          </div>

          {/* Inventory */}
          <div>
            <span className="block px-4 py-2 font-semibold">Inventory</span>
            <div className="ml-6 mt-1 space-y-1">
              <Link to="/dashboard/material" onClick={handleLinkClick} className="block px-4 py-2 rounded-lg hover:bg-white/30">Material</Link>
              <Link to="/dashboard/unit" onClick={handleLinkClick} className="block px-4 py-2 rounded-lg hover:bg-white/30">Unit</Link>
            </div>
          </div>

          {/* Manage */}
          <div>
            <span className="block px-4 py-2 font-semibold">Manage</span>
            <div className="ml-6 mt-1 space-y-1">
              <Link to="/dashboard/admin" onClick={handleLinkClick} className="block px-4 py-2 rounded-lg hover:bg-white/30">Admin</Link>
              <Link to="/dashboard/profile" onClick={handleLinkClick} className="block px-4 py-2 rounded-lg hover:bg-white/30">Profile</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/30"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
