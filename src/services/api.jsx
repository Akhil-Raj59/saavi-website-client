// src/services/api.jsx
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("saavi_access_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (
      err.response &&
      err.response.status === 401 &&
      !original._retry &&
      localStorage.getItem("saavi_refresh_token")
    ) {
      original._retry = true;
      try {
        const r = await api.post("/api/v1/auth/refresh-token", { refreshToken: localStorage.getItem("saavi_refresh_token") });
        const { accessToken, refreshToken } = r.data.data;
        localStorage.setItem("saavi_access_token", accessToken);
        if (refreshToken) localStorage.setItem("saavi_refresh_token", refreshToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        original.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(original);
      } catch (e) {
        localStorage.removeItem("saavi_access_token");
        localStorage.removeItem("saavi_refresh_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

/* ===== Auth ===== */
export const authAPI = {
  register: (payload) => api.post("/api/v1/auth/register", payload),
  login: (payload) => api.post("/api/v1/auth/login", payload),
  me: () => api.get("/api/v1/auth/me"),
  logout: () => api.post("/api/v1/auth/logout"),
  refresh: (payload) => api.post("/api/v1/auth/refresh-token", payload),
};

/* ===== Events ===== */
export const eventsAPI = {
  list: (params) => api.get("/api/v1/events", { params }),
  get: (slugOrId) => api.get(`/api/v1/events/${slugOrId}`),
  upcoming: (limit = 5) => api.get("/api/v1/events/upcoming", { params: { limit } }),
  featured: (limit = 3) => api.get("/api/v1/events/featured", { params: { limit } }),
  create: (formdata) => api.post("/api/v1/events", formdata, { headers: { "Content-Type": "multipart/form-data" } }),
  update: (id, formdata) => api.put(`/api/v1/events/${id}`, formdata, { headers: { "Content-Type": "multipart/form-data" } }),
  toggleStatus: (id, status) => api.patch(`/api/v1/events/${id}/status`, { status }),
  toggleFeatured: (id) => api.patch(`/api/v1/events/${id}/featured`),
  delete: (id) => api.delete(`/api/v1/events/${id}`),
};

/* ===== Articles ===== */
/* ===== Articles ===== */
export const articlesAPI = {
    list: (params) => api.get("/api/v1/articles", { params }),
    getBySlug: (slug) => api.get(`/api/v1/articles/${slug}`),
    // 💡 FIX: Added a dedicated function to get article by its MongoDB ID (_id).
    getById: (id) => api.get(`/api/v1/articles/id/${id}`), // Assuming you create a route for this, or modify getBySlug logic
    
    // NOTE: The controller logic suggests `getArticleBySlug` uses the slug as the param.
    // If you need to fetch by ID, you must ensure your backend has a route like:
    // router.route("/id/:id").get(verifyJWT, getArticleById) 
    // For now, let's rename the function used for ID lookup in the Admin page.

    featured: (limit = 3) => api.get("/api/v1/articles/featured", { params: { limit } }),
    latest: (limit = 5) => api.get("/api/v1/articles/latest", { params: { limit } }),
    create: (formdata) => api.post("/api/v1/articles", formdata, { headers: { "Content-Type": "multipart/form-data" } }),
    update: (id, formdata) => api.put(`/api/v1/articles/${id}`, formdata, { headers: { "Content-Type": "multipart/form-data" } }),
    publishToggle: (id) => api.patch(`/api/v1/articles/${id}/publish`),
    featuredToggle: (id) => api.patch(`/api/v1/articles/${id}/featured`),
    delete: (id) => api.delete(`/api/v1/articles/${id}`),
    search: (q, page = 1, limit = 10) => api.get("/api/v1/articles/search", { params: { q, page, limit } }),
};

/* ===== Testimonials ===== */
export const testimonialsAPI = {
  list: (params) => api.get("/api/v1/testimonials", { params }),
  featured: (limit = 3) => api.get("/api/v1/testimonials/featured", { params: { limit } }),
  create: (formdata) => api.post("/api/v1/testimonials", formdata, { headers: { "Content-Type": "multipart/form-data" } }),
  get: (id) => api.get(`/api/v1/testimonials/${id}`),
  update: (id, formdata) => api.put(`/api/v1/testimonials/${id}`, formdata, { headers: { "Content-Type": "multipart/form-data" } }),
  toggleStatus: (id) => api.patch(`/api/v1/testimonials/${id}/toggle-status`),
  toggleFeatured: (id) => api.patch(`/api/v1/testimonials/${id}/toggle-featured`),
  delete: (id) => api.delete(`/api/v1/testimonials/${id}`),
};

/* ===== Contact ===== */
export const contactAPI = {
  submit: (payload) => api.post("/api/v1/contact", payload),
  list: (params) => api.get("/api/v1/contact", { params }),
  get: (id) => api.get(`/api/v1/contact/${id}`),
  update: (id, payload) => api.put(`/api/v1/contact/${id}`, payload),
  markSpam: (id) => api.patch(`/api/v1/contact/${id}/spam`),
  delete: (id) => api.delete(`/api/v1/contact/${id}`),
  stats: () => api.get("/api/v1/contact/stats"),
};

/* ===== Dashboard ===== */
export const dashboardAPI = {
  stats: () => api.get("/api/v1/dashboard/stats"),
  eventsAnalytics: (params) => api.get("/api/v1/dashboard/analytics/events", { params }),
  articlesAnalytics: (params) => api.get("/api/v1/dashboard/analytics/articles", { params }),
  contactsAnalytics: (params) => api.get("/api/v1/dashboard/analytics/contacts", { params }),
  growth: () => api.get("/api/v1/dashboard/growth"),
};

export default api;
