// src/components/ContactForm.jsx
import React, { useState } from "react";
import { contactAPI } from "../services/api";

export default function ContactForm() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    company: "", 
    service: "other", 
    phone: "", 
    message: "" 
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const serviceOptions = [
    { value: "strategy", label: "Strategy Consulting" },
    { value: "training", label: "Training & Workshops" },
    { value: "security", label: "Security Solutions" },
    { value: "development", label: "Development Services" },
    { value: "chatbot", label: "Chatbot Solutions" },
    { value: "other", label: "Other" }
  ];

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Name can only contain letters and spaces";
        return "";
      
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
        return "";
      
      case "phone":
        if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) return "Please enter a valid phone number";
        if (value && value.replace(/\D/g, '').length < 10) return "Phone number must be at least 10 digits";
        return "";
      
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return "";
      
      case "service":
        if (!value) return "Please select a service";
        return "";
      
      default:
        return "";
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((s) => ({ ...s, [name]: "" }));
    }
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((s) => ({ ...s, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("submitting");
    try {
      await contactAPI.submit(form);
      setStatus("success");
      setForm({ name: "", email: "", company: "", service: "other", phone: "", message: "" });
      setErrors({});
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      setStatus("error");
      console.error(err);
      
      // Clear error message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const inputClass = (fieldName) => 
    `border rounded px-3 py-2 w-full ${errors[fieldName] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`;

  return (
    <form onSubmit={submit} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input 
            name="name" 
            value={form.name} 
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Full name *" 
            className={inputClass("name")}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <input 
            name="email" 
            type="email"
            value={form.email} 
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Email *" 
            className={inputClass("email")}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <input 
            name="company" 
            value={form.company} 
            onChange={onChange}
            placeholder="Company" 
            className={inputClass("company")}
          />
        </div>
        
        <div>
          <input 
            name="phone" 
            value={form.phone} 
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Phone" 
            className={inputClass("phone")}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
      
      <div>
        <select 
          name="service" 
          value={form.service} 
          onChange={onChange}
          onBlur={onBlur}
          className={inputClass("service")}
        >
          <option value="" disabled>Select a service *</option>
          {serviceOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
      </div>
      
      <div>
        <textarea 
          name="message" 
          value={form.message} 
          onChange={onChange}
          onBlur={onBlur}
          rows={6} 
          placeholder="Your message *" 
          className={inputClass("message")}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          type="submit" 
          disabled={status === "submitting"}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
        
        {status === "success" && (
          <span className="text-green-600 font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Message sent successfully!
          </span>
        )}
        
        {status === "error" && (
          <span className="text-red-600 font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            Failed to send. Please try again.
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-500">* Required fields</p>
    </form>
  );
}