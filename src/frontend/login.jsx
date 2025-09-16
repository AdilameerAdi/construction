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
            <p className="text-gray-500 mt-1 text-base sm:text-lg">Admin Sign In</p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 w-full">
              <p className="text-sm text-blue-700 font-medium">Main Admin Access:</p>
              <p className="text-sm text-blue-600">Username: <span className="font-mono">adil</span></p>
              <p className="text-sm text-blue-600">Password: <span className="font-mono">123</span></p>
              <p className="text-xs text-blue-500 mt-1">Other admin users can login with their assigned credentials</p>
            </div>
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




// Firt i change this code for dynamic data 

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState(""); // ✅ renamed from email
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:8000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || "Login failed");
//       }

//       const data = await res.json();

//       // ✅ Save logged-in admin details
//       localStorage.setItem("admin", JSON.stringify(data));

//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.message || "Invalid credentials!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Sticker Panel */}
//       <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 justify-center items-center">
//         <div className="text-white text-center p-6">
//           <div className="text-9xl mb-4">🏗️</div>
//           <h2 className="text-3xl font-bold">Build with Confidence</h2>
//           <p className="mt-2 text-lg">Professional admin access for MANTRI CONSTRUCTIONS</p>
//         </div>
//       </div>

//       {/* Right Form Panel */}
//       <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
//         <div className="max-w-md w-full p-12">
//           <div className="flex flex-col items-center mb-8">
//             <div className="bg-blue-600 text-white text-4xl font-bold rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
//               MC
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800">MANTRI CONSTRUCTIONS</h1>
//             <p className="text-gray-500 mt-1 text-lg">Admin Sign In</p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="username">Name</label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter your username"
//                 className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//             >
//               Sign In
//             </button>
//           </form>

//           <p className="text-gray-400 text-sm text-center mt-8">
//             &copy; 2025 MANTRI CONSTRUCTIONS. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }












// This for static login code 


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Simple validation
//     if (email.toLowerCase() === "adil" && password === "ameer") {
//       navigate("/dashboard"); // Redirect to dashboard
//     } else {
//       alert("Invalid credentials!"); // Wrong credentials
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Sticker Panel */}
//       <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 justify-center items-center">
//         <div className="text-white text-center p-6">
//           <div className="text-9xl mb-4">🏗️</div> {/* Construction Sticker */}
//           <h2 className="text-3xl font-bold">Build with Confidence</h2>
//           <p className="mt-2 text-lg">Professional admin access for MANTRI CONSTRUCTIONS</p>
//         </div>
//       </div>

//       {/* Right Form Panel */}
//       <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
//         <div className="max-w-md w-full p-12">
//           {/* Logo */}
//           <div className="flex flex-col items-center mb-8">
//             <div className="bg-blue-600 text-white text-4xl font-bold rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
//               MC
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800">MANTRI CONSTRUCTIONS</h1>
//             <p className="text-gray-500 mt-1 text-lg">Admin Sign In</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="email">Name</label>
//               <input
//                 type="text"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your name"
//                 className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//             >
//               Sign In
//             </button>
//           </form>

//           {/* Footer */}
//           <p className="text-gray-400 text-sm text-center mt-8">
//             &copy; 2025 MANTRI CONSTRUCTIONS. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
