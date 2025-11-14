// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function EventCard({ event }) {
  const slug = event.slug || event._id;
  const dateStr = event.startDate ? dayjs(event.startDate).format("MMM D, YYYY — h:mm A") : "";
  return (
    <div className="border rounded p-4 bg-white">
      <h4 className="font-semibold text-md"><Link to={`/events/${slug}`} className="hover:underline">{event.title}</Link></h4>
      <div className="mt-2 text-sm text-slate-600">{event.shortExcerpt}</div>
      <div className="mt-3 text-xs text-slate-500">{dateStr} · {event.mode || event.category}</div>
    </div>
  );
}
