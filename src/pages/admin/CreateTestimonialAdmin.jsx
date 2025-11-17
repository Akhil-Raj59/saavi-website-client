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
  const [imagePreview, setImagePreview] = useState("");

  const change = (e) => {
    const { name, value, type } = e.target;
    setForm((s) => ({ 
      ...s, 
      // Handle numerical input like 'rating'
      [name]: type === 'number' ? Number(value) : value 
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
    
    // Create image preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview("");
    }
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
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-8 max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <button 
                onClick={() => nav("/admin/testimonials")}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">Create New Testimonial</h1>
                <p className="text-gray-400 mt-1">Add a client testimonial to showcase trust</p>
              </div>
            </div>
          </div>
          
          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-950/50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold text-red-300">Error</p>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            {/* Main Form Card */}
            <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-blue-950/30 to-gray-900">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Testimonial Details
                </h2>
              </div>
              
              <div className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={change}
                    required
                    placeholder="e.g., John Smith"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow placeholder-gray-500"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={change}
                    required
                    placeholder="e.g., Tech Corp Inc."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow placeholder-gray-500"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Designation
                  </label>
                  <input
                    name="designation"
                    value={form.designation}
                    onChange={change}
                    placeholder="e.g., CEO, Product Manager"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow placeholder-gray-500"
                  />
                </div>

                {/* Testimonial Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Testimonial Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={change}
                    required
                    placeholder="Share the client's feedback and experience..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow resize-none placeholder-gray-500"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    {form.content.length} characters
                  </p>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      name="rating"
                      value={form.rating}
                      onChange={change}
                      type="number"
                      min="1"
                      max="5"
                      required
                      className="px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow w-24"
                    />
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-6 h-6 ${
                            star <= form.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">Select a rating from 1 to 5 stars</p>
                </div>
              </div>
            </div>

            {/* Avatar Card */}
            <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-cyan-950/30 to-gray-900">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Client Avatar
                </h3>
              </div>
              <div className="p-6">
                {imagePreview && (
                  <div className="mb-4">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Avatar Preview"
                        className="w-32 h-32 object-cover rounded-full border-4 border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setImagePreview("");
                        }}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Avatar Preview</p>
                  </div>
                )}
                
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload Avatar (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-cyan-900/50 file:text-cyan-300
                    hover:file:bg-cyan-900/70 cursor-pointer file:border file:border-cyan-700"
                />
                
                {file && (
                  <div className="mt-3 p-3 bg-cyan-950/30 rounded-lg border border-cyan-900/50">
                    <p className="text-sm text-cyan-300 font-medium">
                      📎 {file.name}
                    </p>
                    <p className="text-xs text-cyan-400 mt-1">
                      {(file.size / 1024).toFixed(2)} KB • Ready to upload
                    </p>
                  </div>
                )}
                
                <div className="mt-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-xs text-gray-400">
                    💡 <strong className="text-gray-300">Tip:</strong> Use a professional headshot or company logo (square format recommended)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Testimonial
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => nav("/admin/testimonials")}
                disabled={submitting}
                className="px-6 py-3 border-2 border-gray-700 text-gray-300 hover:bg-gray-800 font-medium rounded-lg transition-colors disabled:opacity-50"
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