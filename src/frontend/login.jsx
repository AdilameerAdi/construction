import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation
    if (email.toLowerCase() === "adil" && password === "ameer") {
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid credentials!"); // Wrong credentials
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Sticker Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 justify-center items-center">
        <div className="text-white text-center p-6">
          <div className="text-9xl mb-4">🏗️</div> {/* Construction Sticker */}
          <h2 className="text-3xl font-bold">Build with Confidence</h2>
          <p className="mt-2 text-lg">Professional admin access for MANTRI CONSTRUCTIONS</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <div className="max-w-md w-full p-12">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 text-white text-4xl font-bold rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
              MC
            </div>
            <h1 className="text-3xl font-bold text-gray-800">MANTRI CONSTRUCTIONS</h1>
            <p className="text-gray-500 mt-1 text-lg">Admin Sign In</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">Name</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
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

          {/* Footer */}
          <p className="text-gray-400 text-sm text-center mt-8">
            &copy; 2025 MANTRI CONSTRUCTIONS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
