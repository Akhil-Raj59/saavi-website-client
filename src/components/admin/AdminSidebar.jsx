// src/components/admin/AdminSidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const loc = useLocation();
  const isActive = (p) => loc.pathname.startsWith(p);
  return (
    <aside className="w-56 border-r bg-white min-h-screen p-4 hidden md:block">
      <div className="mb-6 font-semibold">Admin</div>
      <nav className="flex flex-col gap-2 text-sm">
        <Link to="/admin" className={isActive("/admin") ? "font-semibold" : ""}>Dashboard</Link>
        <Link to="/admin/events" className={isActive("/admin/events") ? "font-semibold" : ""}>Events</Link>
        <Link to="/admin/articles" className={isActive("/admin/articles") ? "font-semibold" : ""}>Articles</Link>
        <Link to="/admin/testimonials" className={isActive("/admin/testimonials") ? "font-semibold" : ""}>Testimonials</Link>
        <Link to="/admin/contacts" className={isActive("/admin/contacts") ? "font-semibold" : ""}>Contacts</Link>
        <Link to="/admin/users" className={isActive("/admin/users") ? "font-semibold" : ""}>Users</Link>
      </nav>
    </aside>
  );
}
