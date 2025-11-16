// src/pages/admin/TestimonialsAdmin.jsx
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/AdminDataTable";
import { testimonialsAPI } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function TestimonialsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await testimonialsAPI.list({ page: 1, limit: 50 });
      
      // Access res.data.data.testimonials for the array of items
      const testimonialList = res.data.data?.testimonials || []; 
      
      setItems(testimonialList);
    } catch (e) { 
      console.error("Failed to load testimonials:", e); 
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await testimonialsAPI.delete(id);
      setItems((s) => s.filter((x) => x._id !== id));
      alert("Testimonial deleted successfully!");
    } catch (e) { 
      console.error("Delete failed:", e);
      alert("Delete failed"); 
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen bg-black">
        <AdminHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">Testimonials Management</h2>
              <p className="text-sm text-gray-400 mt-1">Total: {items.length} testimonial{items.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex gap-2">
              <Link 
                to="/admin/testimonials/create" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                + Create Testimonial
              </Link>
              <button 
                onClick={load} 
                className="px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                disabled={loading}
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-700 border-t-cyan-500"></div>
              <div className="mt-2 text-gray-400">Loading testimonials...</div>
            </div>
          ) : items.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <div className="text-gray-400 mb-4">No testimonials found</div>
              <Link
                to="/admin/testimonials/create"
                className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Create Your First Testimonial
              </Link>
            </div>
          ) : (
            <DataTable
              data={items}
              columns={[
                { 
                  key: "name", 
                  label: "Client",
                  render: (r) => (
                    <div>
                      <div className="font-medium text-white">{r.name}</div>
                      <div className="text-xs text-gray-400">{r.designation}</div>
                    </div>
                  )
                },
                { 
                  key: "company", 
                  label: "Company",
                  render: (r) => (
                    <span className="text-gray-300">{r.company}</span>
                  )
                },
                { 
                  key: "rating", 
                  label: "Rating",
                  render: (r) => (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < (r.rating || 0) ? 'text-yellow-400' : 'text-gray-700'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-400 ml-1">({r.rating || 0})</span>
                    </div>
                  )
                },
                { 
                  key: "featured", 
                  label: "Featured",
                  render: (r) => r.featured ? (
                    <span className="inline-block px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/30">
                      ⭐ Yes
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs rounded border border-gray-500/30">
                      No
                    </span>
                  )
                },
                {
                  key: "quote",
                  label: "Testimonial",
                  render: (r) => (
                    <div className="max-w-md">
                      <p className="text-sm text-gray-400 line-clamp-2">
                        "{r.quote}"
                      </p>
                    </div>
                  )
                }
              ]}
              
              actions={(row) => (
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => nav(`/admin/testimonials/${row._id}/edit`)} 
                    className="text-sm text-cyan-400 hover:text-cyan-300 text-left"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => del(row._id)} 
                    className="text-sm text-red-400 hover:text-red-300 text-left"
                  >
                    Delete
                  </button>
                </div>
              )}
            />
          )}
          
        </main>
      </div>
    </div>
  );
}