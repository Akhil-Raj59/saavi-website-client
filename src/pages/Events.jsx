// src/pages/Events.jsx
import React, { useEffect, useState, useRef } from "react";
import { eventsAPI } from "../services/api";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await eventsAPI.list({
        page: 1,
        limit: 50,
        sort: "-startDate",
      });
      const list = res?.data?.data?.events || [];
      setEvents([...list, ...list]); // duplicate for infinite loop
    } catch (err) {
      console.error(err);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Auto slide
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollInterval = setInterval(() => {
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollTo({ left: 0, behavior: "auto" });
      } else {
        slider.scrollBy({ left: slider.clientWidth / 3, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [events]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-14 text-center pt-28">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Our{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Events
          </span>
        </h1>
        <p className="text-gray-400 mt-3">
          Workshops, masterclasses & training sessions
        </p>
      </div>

      {/* Error */}
      {error && <p className="text-center text-red-400 mb-6">{error}</p>}

      {/* If No Events */}
      {events.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-xl text-white font-semibold">
            No Events Available
          </p>
        </div>
      ) : (
        <div className="relative max-w-7xl mx-auto pb-20">
          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-scroll no-scrollbar scroll-smooth"
            style={{
              scrollSnapType: "x mandatory",
            }}
          >
            {events.map((event, i) => (
              <div
                key={i}
                className="min-w-[300px] sm:min-w-[350px] lg:min-w-[400px] scroll-snap-center"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
