import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    workActivity: false,
    agencies: false,
    inventory: false,
    manage: false,
  });

  const toggleDropdown = (name) => {
    setDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar dropdowns={dropdowns} toggleDropdown={toggleDropdown} />
      <div className="flex-1 flex flex-col">
        <TopNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Mobile menu */}
        {menuOpen && <MobileMenu />}

        {/* Nested pages will render here */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
