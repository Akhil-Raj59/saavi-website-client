// src/pages/admin/CreateEventAdmin.jsx
import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { eventsAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateEventAdmin() {
  const nav = useNavigate();
  
  // State initialization for a new event
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
    shortExcerpt: "",
    fullDescription: "", // Added fullDescription as it is in the backend controller
    category: "",
    audience: "",
    mode: "online",
    status: "scheduled",
    startDate: "",
    endDate: "",
    timezone: "Asia/Kolkata",
    capacity: "",
    price: '{"currency":"INR","value":0}',
    speakers: '[]',
    tags: "",
    imageAlt: "", // Added imageAlt
    registrationLink: "", // Added links
    recordingLink: "",
    slidesLink: "",
    featured: false
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((s) => ({ 
      ...s, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setSubmitting(true);
    setError("");

    // --- Validation specific to Creation ---
    if (!file) {
      setError("Event image is required.");
      setSubmitting(false);
      return;
    }
    if (!values.title || !values.startDate || !values.shortExcerpt) {
      setError("Title, start date, and excerpt are required.");
      setSubmitting(false);
      return;
    }
    // ----------------------------------------

    const fd = new FormData();
    
    // Add all form values
    Object.entries(values).forEach(([key, value]) => {
      if (key === "tags") {
        // Convert comma-separated tags to array (sent as JSON string)
        const tagsArray = value.split(",").map(t => t.trim()).filter(Boolean);
        fd.append(key, JSON.stringify(tagsArray));
      } else if (key === "capacity") {
        // Convert capacity to number or empty string
        fd.append(key, value ? parseInt(value) : "");
      } else if (key === "featured") {
        // Boolean values (sent as string "true" or "false")
        fd.append(key, value.toString());
      } else {
        fd.append(key, value);
      }
    });
    
    // Add image file 
    fd.append("image", file);

    try {
      const response = await eventsAPI.create(fd);
      console.log("Create response:", response.data);
      
      alert("Event created successfully!");
      nav("/admin/events");
    } catch (err) {
      console.error("Creation failed:", err);
      setError(err.response?.data?.message || "Failed to create event");
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
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Create New Event
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Fill in the event details below to create a new event.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6 max-w-4xl">
            {/* Basic Information */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    name="title"
                    value={values.title}
                    onChange={onChange}
                    required
                    placeholder="Event Title"
                    className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Short Excerpt *</label>
                  <textarea
                    name="shortExcerpt"
                    value={values.shortExcerpt}
                    onChange={onChange}
                    required
                    placeholder="Brief description of the event"
                    rows="3"
                    className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Full Description</label>
                  <textarea
                    name="fullDescription"
                    value={values.fullDescription}
                    onChange={onChange}
                    placeholder="Detailed description of the event"
                    rows="6"
                    className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Title</label>
                    <input
                      name="metaTitle"
                      value={values.metaTitle}
                      onChange={onChange}
                      placeholder="SEO Title"
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Description</label>
                    <input
                      name="metaDescription"
                      value={values.metaDescription}
                      onChange={onChange}
                      placeholder="SEO Description"
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Event Details</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                      name="category"
                      value={values.category}
                      onChange={onChange}
                      placeholder="e.g., Workshop, Webinar"
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Audience</label>
                    <input
                      name="audience"
                      value={values.audience}
                      onChange={onChange}
                      placeholder="e.g., Developers, Students"
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      name="status"
                      value={values.status}
                      onChange={onChange}
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="scheduled">Scheduled</option>
                      {/* Added 'ongoing' for completeness, check your backend */}
                      <option value="ongoing">Ongoing</option> 
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="postponed">Postponed</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date & Time *</label>
                    <input
                      name="startDate"
                      value={values.startDate}
                      onChange={onChange}
                      type="datetime-local"
                      required
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date & Time</label>
                    <input
                      name="endDate"
                      value={values.endDate}
                      onChange={onChange}
                      type="datetime-local"
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Mode</label>
                    <select
                      name="mode"
                      value={values.mode}
                      onChange={onChange}
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Capacity</label>
                    <input
                      name="capacity"
                      value={values.capacity}
                      onChange={onChange}
                      type="number"
                      placeholder="Maximum attendees"
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Timezone</label>
                    <input
                      name="timezone"
                      value={values.timezone}
                      onChange={onChange}
                      placeholder="e.g., Asia/Kolkata"
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Additional Links & Pricing</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Registration Link</label>
                    <input
                      name="registrationLink"
                      value={values.registrationLink}
                      onChange={onChange}
                      placeholder="https://..."
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Recording Link</label>
                    <input
                      name="recordingLink"
                      value={values.recordingLink}
                      onChange={onChange}
                      placeholder="https://youtube.com/..."
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Slides Link</label>
                    <input
                      name="slidesLink"
                      value={values.slidesLink}
                      onChange={onChange}
                      placeholder="https://drive.google.com/..."
                      className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Price (JSON format)</label>
                  <textarea
                    name="price"
                    value={values.price}
                    onChange={onChange}
                    placeholder='{"currency":"INR","value":0}'
                    rows="2"
                    className="border border-slate-300 px-3 py-2 rounded-lg w-full font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">Format: {`{"currency":"INR","value":0}`}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Speakers (JSON format)</label>
                  <textarea
                    name="speakers"
                    value={values.speakers}
                    onChange={onChange}
                    placeholder='[{"name":"John Doe","title":"CEO","org":"Company"}]'
                    rows="3"
                    className="border border-slate-300 px-3 py-2 rounded-lg w-full font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">Format: {`[{"name":"...","title":"...","org":"..."}]`}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                  <input
                    name="tags"
                    value={values.tags}
                    onChange={onChange}
                    placeholder="genai, workshop, llm"
                    className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={values.featured}
                      onChange={onChange}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium">Featured Event</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Event Image</h3>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  // Use required attribute or handle required state validation in submit
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {file && (
                  <p className="text-xs text-slate-500 mt-1">
                    Selected: {file.name}
                  </p>
                )}
                <div className="mt-2">
                    <label className="block text-sm font-medium mb-1">Image Alt Text</label>
                    <input
                        name="imageAlt"
                        value={values.imageAlt}
                        onChange={onChange}
                        placeholder="Descriptive alt text for the image"
                        className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pb-6">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Creating..." : "Create Event"}
              </button>
              <button
                type="button"
                onClick={() => nav("/admin/events")}
                disabled={submitting}
                className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
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