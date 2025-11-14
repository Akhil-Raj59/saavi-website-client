// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { dashboardAPI } from "../../services/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await dashboardAPI.stats();
        setStats(res.data.data);
        console.log(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 min-h-screen">
          <AdminHeader />
          <main className="p-6">
            <div className="text-center">Loading...</div>
          </main>
        </div>
      </div>
    );
  }

  const overview = stats?.overview || {};
  const recentActivity = stats?.recentActivity || {};
  const analytics = stats?.analytics || {};

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen bg-slate-50">
        <AdminHeader />
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
          
          {/* Overview Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <div className="text-sm text-slate-500 mb-1">Total Articles</div>
              <div className="text-3xl font-bold text-slate-800">{overview.articles?.total ?? 0}</div>
              <div className="text-xs text-slate-500 mt-2">
                Published: {overview.articles?.published ?? 0} | Drafts: {overview.articles?.drafts ?? 0}
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <div className="text-sm text-slate-500 mb-1">Events</div>
              <div className="text-3xl font-bold text-slate-800">{overview.events?.total ?? 0}</div>
              <div className="text-xs text-slate-500 mt-2">
                Upcoming: {overview.events?.upcoming ?? 0} | Completed: {overview.events?.completed ?? 0}
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <div className="text-sm text-slate-500 mb-1">Contacts</div>
              <div className="text-3xl font-bold text-slate-800">{overview.contacts?.total ?? 0}</div>
              <div className="text-xs text-slate-500 mt-2">
                New: {overview.contacts?.new ?? 0} | Pending: {overview.contacts?.pending ?? 0}
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <div className="text-sm text-slate-500 mb-1">Users</div>
              <div className="text-3xl font-bold text-slate-800">{overview.users?.total ?? 0}</div>
              <div className="text-xs text-slate-500 mt-2">
                Admins: {overview.users?.admins ?? 0}
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Events */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Recent Events</h3>
              {recentActivity.events?.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.events.map((event) => (
                    <div key={event._id} className="border-l-4 border-blue-500 pl-3 py-2">
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-slate-500">
                        {new Date(event.startDate).toLocaleDateString()} • {event.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500">No recent events</div>
              )}
            </div>

            {/* Recent Articles */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Recent Articles</h3>
              {recentActivity.articles?.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.articles.map((article) => (
                    <div key={article._id} className="border-l-4 border-green-500 pl-3 py-2">
                      <div className="font-medium text-sm">{article.title}</div>
                      <div className="text-xs text-slate-500">
                        Views: {article.views} • {article.published ? 'Published' : 'Draft'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500">No recent articles</div>
              )}
            </div>

            {/* Recent Contacts */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Recent Contacts</h3>
              {recentActivity.contacts?.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.contacts.slice(0, 3).map((contact) => (
                    <div key={contact._id} className="border-l-4 border-purple-500 pl-3 py-2">
                      <div className="font-medium text-sm">{contact.name}</div>
                      <div className="text-xs text-slate-500">
                        {contact.email} • {contact.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500">No recent contacts</div>
              )}
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular Articles */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Popular Articles</h3>
              {analytics.popularArticles?.length > 0 ? (
                <div className="space-y-2">
                  {analytics.popularArticles.map((article) => (
                    <div key={article._id} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{article.title}</div>
                        <div className="text-xs text-slate-500">{article.category}</div>
                      </div>
                      <div className="text-sm font-semibold">{article.views} views</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500">No article data yet</div>
              )}
            </div>

            {/* Distribution Stats */}
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Content Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Events by Category</div>
                  {analytics.distribution?.eventsByCategory?.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span>{item._id}</span>
                      <span className="font-semibold">{item.count}</span>
                    </div>
                  ))}
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Articles by Category</div>
                  {analytics.distribution?.articlesByCategory?.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span>{item._id}</span>
                      <span className="font-semibold">{item.count}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Contacts by Service</div>
                  {analytics.distribution?.contactsByService?.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="capitalize">{item._id}</span>
                      <span className="font-semibold">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}