"use client";
import Image from "next/image";
import { api } from "@/config/axios.config";
import React, { useState, useEffect } from "react";
import { IEvent } from "@/interfaces/event.interface";
import Link from "next/link";
import { event_src } from "@/config/image.config";

const EventCard: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/event");
        const data = (await response.data.data) as IEvent[];
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    fetchEvents();
  }, []);

  // Debouncing
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm.trim() === "") {
        fetchAllEvents();
      } else {
        handleSearch(searchTerm);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // fetching all events
  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get("/event");
      const data = (await response.data.data) as IEvent[];
      setEvents(data);
    } catch (error) {
      console.error("Error fetching all events:", error);
    } finally {
      setLoading(false);
    }
  };

  // handle the API search
  const handleSearch = async (term: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/event?search=${term}`);
      const data = (await response.data.data) as IEvent[];
      setEvents(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Skeleton component
  const SkeletonCard = () => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative animate-pulse">
      <div className="skeleton h-48 w-full bg-gray-200"></div>
      <div className="p-4">
        <div className="skeleton h-6 w-3/4 bg-gray-200 mb-2"></div>
        <div className="skeleton h-4 w-full bg-gray-200 mb-2"></div>
        <div className="skeleton h-4 w-1/2 bg-gray-200 mb-2"></div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold py-4 text-center">Events</h2>

      {/* Search bar */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
        />
      </div>

      {/* Event cards */}
      <div className="grid px-2 py-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // Show skeletons while loading
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
              {/* Poster image */}
              <Image
                src={
                  event.events.image_src
                    ? event_src + event.events.image_src
                    : ""
                }
                alt={event.events.title}
                className="w-full h-48 object-cover"
                width={100}
                height={48}
              />
              {/* Event details */}
              <div className="p-4 pb-16">
                <h3 className="text-lg font-semibold">{event.events.title}</h3>
                <p className="text-gray-600 mt-2">{event.events.description}</p>
                <p className="text-gray-500 mt-2">
                  Event Date: {event.events.event_date.toString()}
                </p>
                <p className="text-gray-700 mt-2 font-semibold">
                  Price:{" "}
                  {event.ticket_type.length > 0
                    ? event.ticket_type.length > 1
                      ? `Rp ${Math.min
                          .apply(
                            Math,
                            event.ticket_type.map((o) => o.price)
                          )
                          .toLocaleString()} - ${Math.max
                          .apply(
                            Math,
                            event.ticket_type.map((o) => o.price)
                          )
                          .toLocaleString()}`
                      : event.ticket_type[0].price == 0
                      ? "Gratis"
                      : `Rp ${event.ticket_type[0].price}`
                    : ""}
                </p>
              </div>
              {/* Buy button */}
              <div className="absolute bottom-4 right-4">
                <Link
                  target="_blank"
                  href={`/events/${event.id}`}
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Lihat Event
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <p className="text-right ml-auto w-full">No events found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
