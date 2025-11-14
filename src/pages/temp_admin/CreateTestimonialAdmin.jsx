// src/pages/admin/CreateTestimonialAdmin.jsx
import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { testimonialsAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateTestimonialAdmin() {
  const nav = useNavigate();
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Initialize form for creation (default rating is 5)
  const [form, setForm] = useState({ 
    name: "", 
    company: "", 
    designation: "", 
    content: "", 
    rating: 5 
  });
  
  const [file, setFile] = useState(null); // For new avatar upload

  const change = (e) => {
    const { name, value, type } = e.target;
    setForm((s) => ({ 
      ...s, 
      // Handle numerical input like 'rating'
      [name]: type === 'number' ? Number(value) : value 
    }));
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setSubmitting(true);
    setError("");

    const fd = new FormData();
    // Append form data (no ID needed for creation)
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    
    // Add image if selected
    if (file) {
      fd.append("avatar", file);
    }

    try {
      // Use the create API call
      await testimonialsAPI.create(fd); 
      
      alert("Testimonial created successfully!");
      nav("/admin/testimonials");
    } catch (e) {
      console.error("Save failed:", e.response?.data?.message || e);
      setError(e.response?.data?.message || "Failed to create testimonial.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen bg-slate-50">
        <AdminHeader />
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Create New Testimonial</h2>
          
          {error && (
             <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
               {error}
             </div>
          )}

          <form onSubmit={submit} className="space-y-4 max-w-2xl bg-white p-6 rounded-lg shadow">
            
            {/* Input fields */}
            <input name="name" value={form.name} onChange={change} required placeholder="Name" className="border border-slate-300 px-3 py-2 w-full rounded-lg focus:ring-blue-500" />
            <input name="company" value={form.company} onChange={change} required placeholder="Company" className="border border-slate-300 px-3 py-2 w-full rounded-lg focus:ring-blue-500" />
            <input name="designation" value={form.designation} onChange={change} placeholder="Designation" className="border border-slate-300 px-3 py-2 w-full rounded-lg focus:ring-blue-500" />
            <textarea name="content" value={form.content} onChange={change} required placeholder="Testimonial Content" rows={6} className="border border-slate-300 px-3 py-2 w-full rounded-lg focus:ring-blue-500" />
            
            <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Rating (1-5):</label>
                <input name="rating" value={form.rating} onChange={change} type="number" min="1" max="5" required className="border border-slate-300 px-3 py-2 w-24 rounded-lg focus:ring-blue-500" />
            </div>

            {/* Avatar handling */}
            <div className="pt-2">
              <label className="block text-sm font-medium mb-2">Client Avatar (optional)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0])}
                className="block w-full text-sm text-slate-500 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {file && <p className="text-xs text-slate-500 mt-1">Selected file: {file.name}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button 
                type="submit" 
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Create"}
              </button>
              <button 
                type="button" 
                onClick={() => nav("/admin/testimonials")} 
                disabled={submitting}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}