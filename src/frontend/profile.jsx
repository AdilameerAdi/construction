// src/pages/Profile.jsx
import { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "MANTRI CONSTRUCTIONS",
    email: "surajmantri22@gmail.com",
    phone: "918983451872",
    address: "Nagpur",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert("Profile details saved successfully!");
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password changed successfully!");
    setPassword({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Details Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Manage Details</h2>
          <form onSubmit={handleProfileSave} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleProfileChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Change Password</h2>
          <form onSubmit={handlePasswordSave} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Current Password *</label>
              <input
                type="password"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
                placeholder="Your Current Password"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">New Password *</label>
              <input
                type="password"
                name="new"
                value={password.new}
                onChange={handlePasswordChange}
                placeholder="Your New Password"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password *</label>
              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
