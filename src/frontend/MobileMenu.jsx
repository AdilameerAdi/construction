// src/components/MobileMenu.jsx
import { Link } from "react-router-dom";

export default function MobileMenu() {
  return (
    <div className="md:hidden bg-white shadow-lg p-2 space-y-2">
      <Link to="/" className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-blue-600">Home</Link>
      <Link to="/activity" className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-blue-600">Activity</Link>
      <Link to="/task" className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-blue-600">Task</Link>
      <Link to="/contractors" className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-blue-600">Contractors</Link>
      <Link to="/vendors" className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-blue-600">Vendors</Link>
      <Link to="/material" className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-blue-600">Material</Link>
      <Link to="/unit" className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-blue-600">Unit</Link>
      <Link to="/admin" className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-blue-600">Admin</Link>
      <Link to="/profile" className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-blue-600">Profile</Link>
      <Link to="/logout" className="flex items-center w-full px-4 py-2 hover:bg-blue-50 text-blue-600">Logout</Link>
    </div>
  );
}
