// src/components/admin/AdminHeader.jsx
import React from "react";
import { useAuth } from "../../context/authContext";

export default function AdminHeader() {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="font-semibold">Admin dashboard</div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-600">{user?.fullName || user?.email}</div>
        <button onClick={logout} className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded">Logout</button>
      </div>
    </header>
  );
}
