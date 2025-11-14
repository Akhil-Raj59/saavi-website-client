// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t mt-12">
      <div className="container mx-auto px-4 py-8 text-sm text-slate-600">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <div className="font-semibold">SaaviGen.AI</div>
            <div>Responsible Generative AI for enterprises</div>
          </div>
          <div>
            <div>Contact</div>
            <div>hello@saavigen.ai</div>
          </div>
          <div>
            <div>Legal</div>
            <div>Privacy · Terms</div>
          </div>
        </div>
        <div className="mt-6 text-xs text-center">© {new Date().getFullYear()} SaaviGen.AI — All rights reserved.</div>
      </div>
    </footer>
  );
}
