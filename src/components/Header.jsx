// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import logo from "../assets/logo.png";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="SaaviGen.AI" className="h-10 w-10 object-contain" />
          <div>
            <div className="font-semibold text-lg">SaaviGen.AI</div>
            <div className="text-xs text-slate-500">Responsible GenAI for Enterprises</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/articles" className="hover:underline">Articles</Link>
          <Link to="/events" className="hover:underline">Events</Link>
          <Link to="/about" className="hover:underline">Services</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>


        </nav>
      </div>
    </header>
  );
}
