import React from "react";
import { Link } from "react-router-dom";


export default function Hero() {
  return (
    // Increased vertical padding (py-24) for more space and added 'relative' for potential internal positioning
    <section className="bg-gradient-to-r from-slate-50 to-white py-24 relative overflow-hidden rounded-b-xl shadow-inner">
      <div className="container mx-auto px-6">
        {/* Main Content Area - Centered and set to max-width for readability */}
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            SaaviGen.AI — Responsible Generative AI for Enterprises
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            We help organizations adopt generative AI safely and compliantly — from strategy to production-grade chatbots and document AI.
          </p>
          
          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center bg-indigo-600 text-white font-semibold text-lg px-8 py-3 rounded-xl shadow-lg shadow-indigo-500/50 hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
            <Link 
              to="/articles" 
              className="inline-flex items-center justify-center border-2 border-slate-300 text-gray-800 font-semibold text-lg px-8 py-3 rounded-xl hover:bg-slate-100 transition duration-300"
            >
              Read Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}