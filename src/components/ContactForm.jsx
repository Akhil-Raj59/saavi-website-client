// src/components/ContactForm.jsx
import React, { useState } from "react";
import { contactAPI } from "../services/api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await contactAPI.submit(form);
      setStatus("success");
      setForm({ name: "", email: "", company: "", service: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={onChange} required placeholder="Full name" className="border rounded px-3 py-2" />
        <input name="email" value={form.email} onChange={onChange} required placeholder="Email" className="border rounded px-3 py-2" />
        <input name="company" value={form.company} onChange={onChange} placeholder="Company" className="border rounded px-3 py-2" />
        <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone" className="border rounded px-3 py-2" />
      </div>
      <input name="service" value={form.service} onChange={onChange} placeholder="Interested service (e.g., training, consulting)" className="border rounded px-3 py-2" />
      <textarea name="message" value={form.message} onChange={onChange} rows={6} placeholder="Your message" className="border rounded px-3 py-2" />
      <div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        {status === "success" && <span className="ml-3 text-green-600">Sent — thank you!</span>}
        {status === "error" && <span className="ml-3 text-red-600">Something went wrong.</span>}
      </div>
    </form>
  );
}
