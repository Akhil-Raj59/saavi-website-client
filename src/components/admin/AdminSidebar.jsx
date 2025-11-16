// src/components/admin/AdminSidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const loc = useLocation();
  const isActive = (p) => loc.pathname === p || (p !== "/admin" && loc.pathname.startsWith(p));
  
  const navItems = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/events", label: "Events", icon: "📅" },
    { path: "/admin/articles", label: "Articles", icon: "📝" },
    { path: "/admin/testimonials", label: "Testimonials", icon: "💬" },
    { path: "/admin/contacts", label: "Contacts", icon: "📧" },
    { path: "/admin/users", label: "Users", icon: "👥" },
  ];

  return (
    <aside className="w-64 border-r border-gray-800 bg-gray-900 min-h-screen p-4 hidden md:block">
      {/* Sidebar Header */}
      <div className="mb-8 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center text-black font-bold text-lg">
            A
          </div>
          <div>
            <div className="font-bold text-white">Admin Panel</div>
            <div className="text-xs text-gray-400">SaaviGen.AI</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              isActive(item.path)
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Quick Stats (Optional) */}
      <div className="mt-8 pt-4 border-t border-gray-800">
        <div className="text-xs font-semibold text-gray-400 mb-3 px-4">QUICK INFO</div>
        <div className="space-y-2">
          <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400">System Status</div>
            <div className="text-sm font-semibold text-green-400 flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Online
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}