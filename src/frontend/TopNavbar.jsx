// src/components/TopNavbar.jsx
import { FaBars } from "react-icons/fa";

export default function TopNavbar({ menuOpen, setMenuOpen }) {
  return (
    <>
      {/* Desktop Top Navbar */}
<div className="hidden md:flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 h-16 shadow-lg mb-4">
  <span className="text-white text-lg font-semibold">
    Welcome to MANTRI CONSTRUCTIONS – Building Excellence Together
  </span>
</div>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg flex items-center justify-between px-4 h-16">
        <div className="flex items-center space-x-3">
          <div className="bg-white text-blue-600 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">MC</div>
          <h1 className="text-white text-lg font-bold">MANTRI CONSTRUCTIONS</h1>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
          <FaBars size={28} />
        </button>
      </div>
    </>
  );
}
