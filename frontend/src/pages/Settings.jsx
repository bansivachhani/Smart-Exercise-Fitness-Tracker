// pages/Settings.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-10 mt-8">
      <h1 className="text-3xl font-bold mb-6">Settings ⚙️</h1>
      <div className="bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md font-semibold">
          Change Password
        </button>
        <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-md font-semibold">
          Switch Theme
        </button>
        <button
          onClick={logout}
          className="w-full py-2 bg-gradient-to-r from-red-500 to-red-700 rounded-md font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
