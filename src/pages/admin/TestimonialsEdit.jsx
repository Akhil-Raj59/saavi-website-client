// src/pages/admin/TestimonialsEdit.jsx
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { testimonialsAPI } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function TestimonialsEdit() {
  const { id } = useParams();
  const editing = id !== "create";
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", company: "", designation: "", content: "", rating: 5 });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (editing) {
      (async () => {
        try {
          const res = await testimonialsAPI.get(id);
          setForm(res.data.data);
        } catch (e) { console.error(e); }
      })();
    }
  }, [id]);

  const change = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (ev) => {
    ev.preventDefault();
    const fd = new FormData();
    
    // Only append the fields we want to update
    const fieldsToUpdate = ['name', 'company', 'designation', 'content', 'rating'];
    
    fieldsToUpdate.forEach(field => {
      if (form[field] !== undefined && form[field] !== null) {
        fd.append(field, form[field]);
      }
    });
    
    if (file) fd.append("avatar", file);
    
    try {
      if (editing) {
        await testimonialsAPI.update(id, fd);
      } else {
        await testimonialsAPI.create(fd);
      }
      nav("/admin/testimonials");
    } catch (e) {
      console.error(e);
      alert("Save failed: " + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen">
        <AdminHeader />
        <main className="p-6">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Edit testimonial" : "Create testimonial"}</h2>
          <form onSubmit={submit} className="space-y-4 max-w-2xl">
            <input name="name" value={form.name} onChange={change} placeholder="Name" className="border px-3 py-2 w-full rounded" required />
            <input name="company" value={form.company} onChange={change} placeholder="Company" className="border px-3 py-2 w-full rounded" required />
            <input name="designation" value={form.designation} onChange={change} placeholder="Designation" className="border px-3 py-2 w-full rounded" required />
            <textarea name="content" value={form.content} onChange={change} rows={6} placeholder="Testimonial content" className="border px-3 py-2 w-full rounded" required />
            <input name="rating" value={form.rating} onChange={change} type="number" min="1" max="5" className="border px-3 py-2 w-24 rounded" required />
            <div>
              <label className="block text-sm">Avatar (optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0])} />
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
              <button type="button" onClick={() => nav(-1)} className="px-3 py-1 border rounded">Cancel</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}