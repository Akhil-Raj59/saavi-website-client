// src/pages/admin/ContactsAdmin.jsx
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/AdminDataTable";
import { contactAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 50,
    totalPages: 0
  });
  const [statusCounts, setStatusCounts] = useState([]);
  const [filter, setFilter] = useState("all");
  const nav = useNavigate();

  const load = async (page = 1, status = filter) => {
    setLoading(true);
    try {
      const params = { page, limit: 50 };
      if (status !== "all") {
        params.status = status;
      }
      
      const res = await contactAPI.list(params);
      console.log("Contacts API Response:", res.data);
      
      const contactsData = res.data.data?.contacts || res.data.contacts || [];
      const paginationData = res.data.data?.pagination || {};
      const statusCountsData = res.data.data?.statusCounts || [];
      
      setContacts(contactsData);
      setPagination(paginationData);
      setStatusCounts(statusCountsData);
    } catch (e) {
      console.error("Failed to load contacts:", e);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    
    try {
      await contactAPI.delete(id);
      setContacts((prevContacts) => prevContacts.filter((c) => c._id !== id));
      alert("Contact deleted successfully");
      await load(pagination.page, filter);
    } catch (e) {
      console.error("Delete failed:", e);
      alert("Failed to delete contact");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await contactAPI.updateStatus(id, newStatus);
      await load(pagination.page, filter);
    } catch (e) {
      console.error("Status update failed:", e);
      alert("Failed to update status");
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    load(1, newFilter);
  };

  const getStatusCount = (status) => {
    const statusData = statusCounts.find(s => s._id === status);
    return statusData ? statusData.count : 0;
  };

  const columns = [
    {
      key: "name",
      label: "Contact Info",
      render: (r) => (
        <div>
          <div className="font-medium text-white">{r.name}</div>
          <div className="text-sm text-gray-400">{r.email}</div>
          {r.phone && (
            <div className="text-xs text-gray-500 mt-0.5">📞 {r.phone}</div>
          )}
        </div>
      )
    },
    {
      key: "company",
      label: "Company",
      render: (r) => (
        <div>
          <div className="text-sm text-gray-300">{r.company || "—"}</div>
          {r.service && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
              {r.service}
            </span>
          )}
        </div>
      )
    },
    {
      key: "message",
      label: "Message",
      render: (r) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-400 line-clamp-2">
            {r.message || "No message"}
          </p>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (r) => {
        const statusColors = {
          new: "bg-green-500/20 text-green-400 border-green-500/30",
          contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          resolved: "bg-gray-500/20 text-gray-400 border-gray-500/30"
        };
        return (
          <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full border ${statusColors[r.status] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
            {r.status}
          </span>
        );
      }
    },
    {
      key: "priority",
      label: "Priority",
      render: (r) => {
        const priorityColors = {
          high: "bg-red-500/20 text-red-400 border border-red-500/30",
          medium: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
          low: "bg-gray-500/20 text-gray-400 border border-gray-500/30"
        };
        return (
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${priorityColors[r.priority] || priorityColors.medium}`}>
            {r.priority || "medium"}
          </span>
        );
      }
    },
    {
      key: "createdAt",
      label: "Received",
      render: (r) => (
        <div className="text-sm">
          <div className="text-white">
            {new Date(r.createdAt).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-400">
            {new Date(r.createdAt).toLocaleTimeString()}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Contact Submissions</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Manage and respond to customer inquiries
                </p>
              </div>
              <button
                onClick={() => load(pagination.page, filter)}
                className="px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                disabled={loading}
              >
                <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex gap-2 border-b border-gray-800 pb-0">
              <button
                onClick={() => handleFilterChange("all")}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  filter === "all"
                    ? "border-cyan-500 text-cyan-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                All Contacts
                <span className="ml-2 px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full text-xs">
                  {pagination.total}
                </span>
              </button>
              <button
                onClick={() => handleFilterChange("new")}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  filter === "new"
                    ? "border-green-500 text-green-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                New
                <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-500/30">
                  {getStatusCount("new")}
                </span>
              </button>
              <button
                onClick={() => handleFilterChange("contacted")}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  filter === "contacted"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Contacted
                <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30">
                  {getStatusCount("contacted")}
                </span>
              </button>
              <button
                onClick={() => handleFilterChange("resolved")}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  filter === "resolved"
                    ? "border-gray-500 text-gray-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Resolved
                <span className="ml-2 px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded-full text-xs border border-gray-500/30">
                  {getStatusCount("resolved")}
                </span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{pagination.total}</div>
                  <div className="text-xs text-gray-400">Total Contacts</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{getStatusCount("new")}</div>
                  <div className="text-xs text-gray-400">New Inquiries</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{getStatusCount("contacted")}</div>
                  <div className="text-xs text-gray-400">In Progress</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-300">{getStatusCount("resolved")}</div>
                  <div className="text-xs text-gray-400">Resolved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-700 border-t-cyan-500"></div>
              <div className="mt-2 text-gray-400">Loading contacts...</div>
            </div>
          ) : contacts.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <div className="text-gray-400 mb-2">No contacts found</div>
              <p className="text-sm text-gray-500">
                {filter !== "all" ? `No ${filter} contacts at the moment` : "Contact submissions will appear here"}
              </p>
            </div>
          ) : (
            <>
              <DataTable
                columns={columns}
                data={contacts}
                actions={(row) => (
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <button
                      onClick={() => nav(`/admin/contacts/${row._id}`)}
                      className="text-sm text-cyan-400 hover:text-cyan-300 text-left"
                    >
                      View Details
                    </button>
                    
                    {row.status !== "contacted" && (
                      <button
                        onClick={() => updateStatus(row._id, "contacted")}
                        className="text-sm text-blue-400 hover:text-blue-300 text-left"
                      >
                        Mark Contacted
                      </button>
                    )}
                    
                    {row.status !== "resolved" && (
                      <button
                        onClick={() => updateStatus(row._id, "resolved")}
                        className="text-sm text-green-400 hover:text-green-300 text-left"
                      >
                        Mark Resolved
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(row._id)}
                      className="text-sm text-red-400 hover:text-red-300 text-left"
                    >
                      Delete
                    </button>
                  </div>
                )}
              />

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-4 flex justify-between items-center bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400">
                    Page {pagination.page} of {pagination.totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => load(pagination.page - 1, filter)}
                      disabled={pagination.page <= 1}
                      className="px-3 py-1 border border-gray-700 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => load(pagination.page + 1, filter)}
                      disabled={pagination.page >= pagination.totalPages}
                      className="px-3 py-1 border border-gray-700 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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