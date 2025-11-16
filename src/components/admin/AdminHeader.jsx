// src/components/admin/AdminHeader.jsx
import React from "react";
import { useAuth } from "../../context/authContext";

export default function AdminHeader() {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
      <div className="font-semibold text-white">Admin Dashboard</div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400">{user?.fullName || user?.email}</div>
        <button 
          onClick={logout} 
          className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  );
}