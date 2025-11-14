//  src/pages/admin/ArticlesAdmin.jsx =====
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/AdminDatatable";
import { articlesAPI } from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 50,
    totalPages: 0
  });
  const nav = useNavigate();

  const load = async (page = 1) => {
    setLoading(true);
    try {
      const res = await articlesAPI.list({ page, limit: 50 });
      console.log("Articles API Response:", res.data);
      
      // Extract articles array from response
      // API returns: { data: { articles: [...], pagination: {...} } }
      const articlesData = res.data.data?.articles || res.data.articles || [];
      const paginationData = res.data.data?.pagination || {};
      
      setArticles(articlesData);
      setPagination(paginationData);
    } catch (e) {
      console.error("Failed to load articles:", e);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    
    try {
      await articlesAPI.delete(id); // Uses _id for deletion
      setArticles((prevArticles) => prevArticles.filter((a) => a._id !== id));
      alert("Article deleted successfully");
    } catch (e) {
      console.error("Delete failed:", e);
      alert("Failed to delete article");
    }
  };

 

  const featuredToggle = async (id) => {
    try {
      await articlesAPI.featuredToggle(id);
      await load(pagination.page);
    } catch (e) {
      console.error("Toggle featured failed:", e);
      alert("Failed to update featured status");
    }
  };

  const columns = [
    {
      key: "featuredImage",
      label: "Image",
      render: (r) => r.featuredImage?.url ? (
        <img 
          src={r.featuredImage} 
          alt={r.title} 
          className="w-16 h-16 object-cover rounded"
        />
      ) : (
        <div className="w-16 h-16 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-500">
          No image
        </div>
      )
    },
    {
      key: "title",
      label: "Title",
      render: (r) => (
        <div>
          <div className="font-medium">{r.title}</div>
          <div className="flex gap-2 mt-1">
            {r.published && (
              <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                Published
              </span>
            )}
            {r.featured && (
              <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                Featured
              </span>
            )}
          </div>
        </div>
      )
    },
    {
      key: "category",
      label: "Category",
      render: (r) => (
        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
          {r.category}
        </span>
      )
    },
    {
      key: "author",
      label: "Author",
      render: (r) => (
        <div className="text-sm">
          <div>{r.author?.name || "Unknown"}</div>
          {r.author?.designation && (
            <div className="text-xs text-slate-500">{r.author.designation}</div>
          )}
        </div>
      )
    },
    {
      key: "views",
      label: "Views",
      render: (r) => (
        <div className="text-sm font-semibold">{r.views || 0}</div>
      )
    },
    {
      key: "createdAt",
      label: "Created",
      render: (r) => (
        <div className="text-sm text-slate-600">
          {new Date(r.createdAt).toLocaleDateString()}
        </div>
      )
    }
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen bg-slate-50">
        <AdminHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Articles Management</h2>
              <p className="text-sm text-slate-600 mt-1">
                Total: {pagination.total} article{pagination.total !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/admin/articles/create"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                + Create Article
              </Link>
              <button
                onClick={() => load(pagination.page)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                disabled={loading}
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bg-white border rounded-lg p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-blue-600"></div>
              <div className="mt-2 text-slate-600">Loading articles...</div>
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white border rounded-lg p-8 text-center">
              <div className="text-slate-500 mb-4">No articles found</div>
              <Link
                to="/admin/articles/create"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Create Your First Article
              </Link>
            </div>
          ) : (
            <>
              <DataTable
                columns={columns}
                data={articles}
                actions={(row) => (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => nav(`/articles/${row.slug}`)}
                      className="text-sm text-blue-600 hover:text-blue-800 text-left"
                    >
                      View
                    </button>
                    <button
                      onClick={() => nav(`/admin/articles/${row.slug}/edit`)}
                      className="text-sm text-slate-600 hover:text-slate-800 text-left"
                    >
                      Edit
                    </button>
                    
                    <button
                      onClick={() => featuredToggle(row._id)}
                      className="text-sm text-amber-600 hover:text-amber-800 text-left"
                    >
                      {row.featured ? "Unfeature" : "Feature"}
                    </button>
                    <button
                      onClick={() => handleDelete(row._id)}
                      className="text-sm text-red-600 hover:text-red-800 text-left"
                    >
                      Delete
                    </button>
                  </div>
                )}
              />

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-4 flex justify-between items-center bg-white border rounded-lg p-4">
                  <div className="text-sm text-slate-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => load(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => load(pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages}
                      className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}