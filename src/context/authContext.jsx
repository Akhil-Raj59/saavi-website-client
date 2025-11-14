// src/context/authContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem("saavi_access_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await authAPI.me();
      // assume backend returns user in res.data.data
      setUser(res.data.data);
    } catch (err) {
      console.warn("Failed to load user", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    const { accessToken, refreshToken, user: u } = res.data.data;
    localStorage.setItem("saavi_access_token", accessToken);
    if (refreshToken) localStorage.setItem("saavi_refresh_token", refreshToken);
    setUser(u);
    return u;
  };

  const logout = async () => {
    try { await authAPI.logout(); } catch (e) { /* ignore */ }
    localStorage.removeItem("saavi_access_token");
    localStorage.removeItem("saavi_refresh_token");
    setUser(null);
  };

  const isAdmin = () => !!user && (user.role === "admin" || user.roles?.includes?.("admin"));

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser: loadUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
