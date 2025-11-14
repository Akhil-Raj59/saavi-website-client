// src/pages/EventDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventsAPI } from "../services/api";
import { useAuth } from "../context/authContext";
import dayjs from "dayjs";

export default function EventDetail() {
  const { slug } = useParams();
  console.log("EventDetail slug:", slug);
  const [event, setEvent] = useState(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await eventsAPI.get(slug);
        setEvent(res.data.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [slug]);

  if (!event)
    return <div className="container mx-auto px-4 py-10">Loading...</div>;

  const formatPrice = (price) => {
    if (!price) return "—";
    if (price.value === 0) return "Free";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format(price.value);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this event?")) return;
    try {
      await eventsAPI.delete(event._id || event.id);
      navigate("/events");
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* --- Admin Controls --- */}
      {isAdmin() && (
        <div className="flex justify-end mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/admin/events/${slug}/edit`)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* --- Event Image --- */}
      {event.image && (
        <div className="mb-6 md:mb-8 rounded-lg shadow-lg overflow-hidden">
          <img
            src={event.image}
            alt={event.imageAlt || event.title}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Title and Category */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-3">
          {event.title}
        </h1>
        <div className="text-base sm:text-lg md:text-xl font-medium text-indigo-600 mb-4 md:mb-6">
          {event.category} •{" "}
          {event.mode?.charAt(0).toUpperCase() + event.mode?.slice(1)}
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-center border-t border-b py-4 mb-6 md:mb-8">
          <div className="flex flex-col items-center">
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              {dayjs(event.startDate).format("MMM D, YYYY")}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 mt-1">
              {dayjs(event.startDate).format("h:mm A")} -{" "}
              {dayjs(event.endDate).format("h:mm A")} ({event.timezone})
            </span>
          </div>

          <div>
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              {formatPrice(event.price)}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 block mt-1">
              Price
            </span>
          </div>

          <div>
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              {event.attendees} / {event.capacity}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 block mt-1">
              Attendees / Capacity
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 md:mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 md:mb-3">
            About the Workshop
          </h2>
          <div
            className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                event.shortExcerpt ||
                event.description ||
                "No detailed description available.",
            }}
          />
        </div>

        {/* Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
              Meet the Mentor{event.speakers.length > 1 ? "s" : ""}
            </h2>
            <div className="space-y-3 md:space-y-4">
              {event.speakers.map((speaker) => (
                <div
                  key={speaker._id}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border rounded-lg bg-gray-50"
                >
                  <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm sm:text-base">
                    {speaker.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base sm:text-lg font-medium text-gray-900 truncate">
                      {speaker.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {speaker.title} at <strong>{speaker.org}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audience & Tags */}
        <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 md:mb-3">
            Details
          </h2>
          <p className="mb-3 text-sm sm:text-base">
            <span className="font-semibold">Target Audience:</span>{" "}
            {event.audience}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="font-semibold mr-1 sm:mr-2 text-sm sm:text-base">
              Tags:
            </span>
            {event.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
