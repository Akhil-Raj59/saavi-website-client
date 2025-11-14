// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user || !isAdmin()) return <Navigate to="/login" replace />;
  return children;
}
