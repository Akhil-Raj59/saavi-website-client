// src/pages/Events.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { eventsAPI } from "../services/api";
import EventCard from "../components/EventCard";
import { Container } from "../components/layout/Container";

const UPCOMING_STATUSES = ["scheduled", "postponed"];
const PAST_STATUSES = ["completed", "cancelled"];

export default function Events() {
  const [events, setEvents] = useState([]); // filtered for UI
  const [allEvents, setAllEvents] = useState([]); // raw list from backend
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | upcoming | past
  const [error, setError] = useState(null);

  // fetch all events (no status filter) so client can filter by status locally
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await eventsAPI.list({
        page: 1,
        limit: 200, // ensure enough results for client-side filters
        sort: "-startDate",
      });
      const fetched = res?.data?.data?.events || [];
      setAllEvents(fetched);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Failed to load events. Try again.");
      setAllEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // apply filter based on backend 'status' enum
  useEffect(() => {
    if (filter === "upcoming") {
      setEvents(allEvents.filter((e) => UPCOMING_STATUSES.includes(e.status)));
    } else if (filter === "past") {
      setEvents(allEvents.filter((e) => PAST_STATUSES.includes(e.status)));
    } else {
      setEvents(allEvents);
    }
  }, [filter, allEvents]);

  // featured event = first upcoming by status; fallback to first event
  const featuredEvent =
    allEvents.find((e) => UPCOMING_STATUSES.includes(e.status)) || allEvents[0] || null;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <Container className="pt-8"> 
      <div className="min-h-screen bg-black">
      {/* HERO / FEATURED */}
      {featuredEvent && (
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          {featuredEvent.image && (
            <>
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </>
          )}

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="mb-4">
                {UPCOMING_STATUSES.includes(featuredEvent.status) && (
                  <span className="inline-block px-4 py-1 bg-green-500 text-black text-xs font-bold rounded-full mb-2">
                    🎯 Upcoming Event
                  </span>
                )}

                {featuredEvent.category && (
                  <span className="inline-block ml-2 px-4 py-1 bg-gray-800 text-gray-300 text-xs font-semibold rounded-full">
                    {featuredEvent.category}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {featuredEvent.title}
              </h1>

              {featuredEvent.shortExcerpt && (
                <p className="text-gray-300 text-lg mb-6 max-w-2xl">{featuredEvent.shortExcerpt}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                {/* DATE */}
                {featuredEvent.startDate && (
                  <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white font-semibold">
                      {new Date(featuredEvent.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {/* MODE */}
                {featuredEvent.mode && (
                  <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="text-white font-semibold capitalize">{featuredEvent.mode}</span>
                  </div>
                )}

                {/* PRICE */}
                {featuredEvent.price && (
                  <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/30">
                    <span className="text-green-400 font-semibold">
                      {featuredEvent.price?.value === 0 ? "Free" : `₹${featuredEvent.price?.value ?? ""}`}
                    </span>
                  </div>
                )}
              </div>

              <Link
                to={`/events/${featuredEvent.slug || featuredEvent._id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Register Now
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* MAIN CONTENT */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  All <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Events</span>
                </h2>
                <p className="text-gray-400">Workshops, masterclasses, and training sessions</p>
              </div>

              {/* small controls (refresh + optional count) */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => fetchEvents()}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-gray-300 hover:bg-gray-800"
                >
                  Refresh
                </button>
                <div className="text-sm text-gray-400">Showing <span className="text-white font-semibold">{events.length}</span></div>
              </div>
            </div>

            {/* FILTER TABS */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["all", "upcoming", "past"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === opt ? "bg-cyan-500 text-black" : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800"
                  }`}
                  aria-pressed={filter === opt}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ERROR */}
          {error && (
            <div className="text-center text-red-400 mb-6">
              {error}
            </div>
          )}

          {/* EVENTS GRID */}
          {events.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
              <p className="text-gray-400">
                {filter === "all"
                  ? "No events are available at the moment."
                  : `No ${filter} events found. Try selecting \"All\" or press Refresh.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {events.map((ev, i) => (
                <motion.div
                  key={ev._id || ev.slug || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <EventCard event={ev} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
    </Container>
  );
}
