"use client";

import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const artist = searchParams.get("artist");
  const tag = searchParams.get("tag");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    if (artist) {
      return event.artist?.toLowerCase() === artist.toLowerCase();
    }

    if (tag) {
      return event.tags?.some(
        (eventTag) => eventTag.toLowerCase() === tag.toLowerCase()
      );
    }

    return true;
  });

  if (loading) {
    return <h1 className="text-center text-3xl mt-10">Loading events...</h1>;
  }

  return (
    <main className="px-8 py-10">
      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4 mb-8">
        Explore Events
      </h1>

      {artist && (
        <p className="mx-4 mb-5 text-xl font-semibold">
          Showing events for artist: {artist}
        </p>
      )}

      {tag && (
        <p className="mx-4 mb-5 text-xl font-semibold">
          Showing events for tag: #{tag}
        </p>
      )}

      <div className="flex flex-wrap items-start justify-center gap-6 mb-32">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((eventData) => (
            <EventCard key={eventData.id} eventData={eventData} />
          ))
        ) : (
          <p className="text-2xl font-semibold">No events found.</p>
        )}
      </div>
    </main>
  );
}