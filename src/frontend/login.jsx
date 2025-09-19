import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyPassword } from "../utils/passwordUtils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Main admin credentials (hardcoded for fresh setup)
    const mainAdminUsername = "adil";
    const mainAdminPassword = "123";
    
    // Check if main admin login
    if (username === mainAdminUsername && password === mainAdminPassword) {
      const mainAdmin = {
        id: "main-admin-001",
        name: "Adil",
        username: mainAdminUsername,
        position: "Main Administrator",
        status: "Active",
        isMainAdmin: true,
        permissions: [
          "New Projects",
          "Finance",
          "Reports",
          "Stock Management",
          "Technical Files",
          "Legal Files",
          "Leads",
          "Customers",
          "Materials",
          "Activities",
          "Tasks",
          "Contractors",
          "Vendors",
          "Units",
          "Admin Management"
        ],
      };
      
      localStorage.setItem("admin", JSON.stringify(mainAdmin));
      navigate("/dashboard");
      return;
    }
    
    // Check client admin users from database
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        const foundAdmin = await response.json();
        
        const clientAdmin = {
          id: foundAdmin._id || foundAdmin.id,
          name: foundAdmin.fullName || foundAdmin.name,
          username: foundAdmin.username,
          position: foundAdmin.position || "Client Admin",
          status: foundAdmin.status,
          isMainAdmin: false,
          permissions: Array.isArray(foundAdmin.permissions) 
            ? foundAdmin.permissions 
            : [],
          email: foundAdmin.email,
          mobile: foundAdmin.mobile
        };
        
        localStorage.setItem("admin", JSON.stringify(clientAdmin));
        navigate("/dashboard");
        return;
      }
    } catch (error) {
      console.error("Database authentication error:", error);
    }
    
    alert("Invalid credentials! Contact system administrator.");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Sticker Panel */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 justify-center items-center">
        <div className="text-white text-center p-6">
          <div className="text-6xl md:text-9xl mb-4">🏗️</div>
          <h2 className="text-2xl md:text-3xl font-bold">Build with Confidence</h2>
          <p className="mt-2 text-base md:text-lg">
            Professional admin access for MANTRI CONSTRUCTIONS
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white min-h-screen">
        <div className="max-w-md w-full p-6 sm:p-8 md:p-12">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="bg-blue-600 text-white text-3xl sm:text-4xl font-bold rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4 shadow-lg">
              MC
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
              MANTRI CONSTRUCTIONS
            </h1>
          
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-8">
            &copy; 2025 MANTRI CONSTRUCTIONS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}