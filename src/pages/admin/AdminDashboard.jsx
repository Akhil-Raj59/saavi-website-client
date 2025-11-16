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
        <div className="flex-1 min-h-screen bg-black">
          <AdminHeader />
          <main className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-cyan-500 mb-4"></div>
                <div className="text-gray-400">Loading dashboard...</div>
              </div>
            </div>
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
      <div className="flex-1 min-h-screen bg-black">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
            <p className="text-gray-400">Monitor your content and engagement metrics</p>
          </div>
          
          {/* Overview Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-6 border border-gray-800 rounded-lg bg-gradient-to-br from-gray-900 to-black shadow-lg hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400">Total Articles</div>
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{overview.articles?.total ?? 0}</div>
              <div className="text-xs text-gray-500">
                Published: <span className="text-green-400 font-semibold">{overview.articles?.published ?? 0}</span> • Drafts: <span className="text-gray-400">{overview.articles?.drafts ?? 0}</span>
              </div>
            </div>

            <div className="p-6 border border-gray-800 rounded-lg bg-gradient-to-br from-gray-900 to-black shadow-lg hover:border-purple-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400">Events</div>
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{overview.events?.total ?? 0}</div>
              <div className="text-xs text-gray-500">
                Upcoming: <span className="text-blue-400 font-semibold">{overview.events?.upcoming ?? 0}</span> • Completed: <span className="text-gray-400">{overview.events?.completed ?? 0}</span>
              </div>
            </div>

            <div className="p-6 border border-gray-800 rounded-lg bg-gradient-to-br from-gray-900 to-black shadow-lg hover:border-teal-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400">Contacts</div>
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{overview.contacts?.total ?? 0}</div>
              <div className="text-xs text-gray-500">
                New: <span className="text-green-400 font-semibold">{overview.contacts?.new ?? 0}</span> • Pending: <span className="text-amber-400">{overview.contacts?.pending ?? 0}</span>
              </div>
            </div>

            <div className="p-6 border border-gray-800 rounded-lg bg-gradient-to-br from-gray-900 to-black shadow-lg hover:border-blue-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400">Users</div>
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{overview.users?.total ?? 0}</div>
              <div className="text-xs text-gray-500">
                Admins: <span className="text-cyan-400 font-semibold">{overview.users?.admins ?? 0}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Events */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-semibold text-lg text-white">Recent Events</h3>
              </div>
              {recentActivity.events?.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.events.map((event) => (
                    <div key={event._id} className="border-l-4 border-purple-500 pl-3 py-2 bg-gray-800/50 rounded-r">
                      <div className="font-medium text-sm text-white">{event.title}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(event.startDate).toLocaleDateString()} • <span className="capitalize">{event.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 text-center py-8">No recent events</div>
              )}
            </div>

            {/* Recent Articles */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="font-semibold text-lg text-white">Recent Articles</h3>
              </div>
              {recentActivity.articles?.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.articles.map((article) => (
                    <div key={article._id} className="border-l-4 border-cyan-500 pl-3 py-2 bg-gray-800/50 rounded-r">
                      <div className="font-medium text-sm text-white">{article.title}</div>
                      <div className="text-xs text-gray-400">
                        Views: <span className="text-cyan-400 font-semibold">{article.views}</span> • {article.published ? <span className="text-green-400">Published</span> : <span className="text-gray-500">Draft</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 text-center py-8">No recent articles</div>
              )}
            </div>

            {/* Recent Contacts */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="font-semibold text-lg text-white">Recent Contacts</h3>
              </div>
              {recentActivity.contacts?.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.contacts.slice(0, 3).map((contact) => (
                    <div key={contact._id} className="border-l-4 border-teal-500 pl-3 py-2 bg-gray-800/50 rounded-r">
                      <div className="font-medium text-sm text-white">{contact.name}</div>
                      <div className="text-xs text-gray-400">
                        {contact.email} • <span className="capitalize">{contact.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 text-center py-8">No recent contacts</div>
              )}
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular Articles */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <h3 className="font-semibold text-lg text-white">Popular Articles</h3>
              </div>
              {analytics.popularArticles?.length > 0 ? (
                <div className="space-y-2">
                  {analytics.popularArticles.map((article) => (
                    <div key={article._id} className="flex justify-between items-center p-3 hover:bg-gray-800 rounded transition-colors">
                      <div>
                        <div className="font-medium text-sm text-white">{article.title}</div>
                        <div className="text-xs text-gray-400">{article.category}</div>
                      </div>
                      <div className="text-sm font-semibold text-cyan-400">{article.views} <span className="text-gray-500 text-xs">views</span></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 text-center py-8">No article data yet</div>
              )}
            </div>

            {/* Distribution Stats */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="font-semibold text-lg text-white">Content Distribution</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium mb-3 text-gray-300">Events by Category</div>
                  {analytics.distribution?.eventsByCategory?.length > 0 ? (
                    <div className="space-y-2">
                      {analytics.distribution.eventsByCategory.map((item) => (
                        <div key={item._id} className="flex justify-between items-center text-sm bg-gray-800/50 p-2 rounded">
                          <span className="text-gray-300">{item._id}</span>
                          <span className="font-semibold text-purple-400">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-600">No data</div>
                  )}
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-3 text-gray-300">Articles by Category</div>
                  {analytics.distribution?.articlesByCategory?.length > 0 ? (
                    <div className="space-y-2">
                      {analytics.distribution.articlesByCategory.map((item) => (
                        <div key={item._id} className="flex justify-between items-center text-sm bg-gray-800/50 p-2 rounded">
                          <span className="text-gray-300">{item._id}</span>
                          <span className="font-semibold text-cyan-400">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-600">No data</div>
                  )}
                </div>

                <div>
                  <div className="text-sm font-medium mb-3 text-gray-300">Contacts by Service</div>
                  {analytics.distribution?.contactsByService?.length > 0 ? (
                    <div className="space-y-2">
                      {analytics.distribution.contactsByService.map((item) => (
                        <div key={item._id} className="flex justify-between items-center text-sm bg-gray-800/50 p-2 rounded">
                          <span className="capitalize text-gray-300">{item._id}</span>
                          <span className="font-semibold text-teal-400">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-600">No data</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}