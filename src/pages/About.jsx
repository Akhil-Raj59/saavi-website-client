// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Services & Training</h1>
      <div className="mt-4 text-slate-600 space-y-4 max-w-3xl">
        <p><strong>AI readiness & strategy:</strong> Assess your organization's maturity and map a responsible GenAI roadmap.</p>
        <p><strong>Compliance & security:</strong> Guidance for EU AI Act, ISO/IEC 42001 and secure deployment.</p>
        <p><strong>Custom development:</strong> Enterprise chatbots, RAG pipelines, and document processing AI.</p>
        <p><strong>Training:</strong> Programs for fresh graduates, corporates, execs and developers.</p>
      </div>
    </div>
  );
}
