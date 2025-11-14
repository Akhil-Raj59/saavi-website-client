// src/pages/admin/UsersAdmin.jsx
import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

export default function UsersAdmin() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="mt-4 text-slate-600">User management will be implemented as needed. For now, please use backend/admin APIs directly.</p>
        </main>
      </div>
    </div>
  );
}
