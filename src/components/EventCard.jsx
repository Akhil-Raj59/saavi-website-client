// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function EventCard({ event }) {
  const slug = event.slug || event._id;
  const dateStr = event.startDate ? dayjs(event.startDate).format("MMM D, YYYY") : "";
  const timeStr = event.startDate ? dayjs(event.startDate).format("h:mm A") : "";
  
  return (
    <article className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Event Image */}
      {event.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.imageAlt || event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Status Badge */}
          <span className="absolute top-4 left-4 px-3 py-1 bg-green-500/90 backdrop-blur-sm text-black text-xs font-semibold rounded-full">
            {event.status === 'scheduled' ? '🎯 Upcoming' : '✅ Completed'}
          </span>
          
          {/* Mode Badge */}
          {event.mode && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/90 backdrop-blur-sm text-black text-xs font-semibold rounded-full">
              {event.mode === 'online' ? '🌐 Online' : '📍 ' + event.mode}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Date & Time */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{dateStr}</span>
          </div>
          
          {timeStr && (
            <>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{timeStr}</span>
              </div>
            </>
          )}
        </div>

        {/* Category */}
        {event.category && (
          <div className="mb-3">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full border border-purple-500/30">
              {event.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          <Link to={`/events/${slug}`} className="hover:underline">
            {event.title}
          </Link>
        </h3>

        {/* Short Excerpt */}
        {event.shortExcerpt && (
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {event.shortExcerpt}
          </p>
        )}

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          {/* Price */}
          {event.price && (
            <div className="flex items-center gap-1 text-sm">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-400 font-semibold">
                {event.price.value === 0 ? 'Free' : `₹${event.price.value}`}
              </span>
            </div>
          )}

          {/* View Details Link */}
          <Link
            to={`/events/${slug}`}
            className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all"
          >
            View Details
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-10 transition-opacity -z-10" />
    </article>
  );
}