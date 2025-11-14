// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(form.email, form.password);
      nav("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form className="space-y-4" onSubmit={submit}>
        <input name="email" value={form.email} onChange={onChange} required placeholder="Email" className="border rounded px-3 py-2 w-full" />
        <input name="password" value={form.password} onChange={onChange} type="password" required placeholder="Password" className="border rounded px-3 py-2 w-full" />
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </div>
  );
}
