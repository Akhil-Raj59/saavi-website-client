// src/components/TestimonialCard.jsx
import React from "react";

export default function TestimonialCard({ t }) {
  return (
    <div className="border rounded p-4 bg-white">
      <div className="text-slate-700">“{t.content}”</div>
      <div className="mt-3 text-sm font-semibold">{t.name}</div>
      <div className="text-xs text-slate-500">{t.designation} · {t.company}</div>
    </div>
  );
}
