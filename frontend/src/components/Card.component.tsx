"use client";
import Image from "next/image";
import { api } from "@/config/axios.config";
import React, { useState, useEffect } from "react";
import { IEvent } from "@/interfaces/event.interface";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { event_src } from "@/config/image.config";

interface CartItem {
  event: IEvent;
  quantity: number;
}

const EventCard: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await api.get("/event");
      console.log(response);
      const data = (await response.data.data) as IEvent[];

      setEvents(data);
    };
    fetchEvents();
  }, []);

  // const addToCart = (event: IEvent) => {
  //   const existingCartItem = cart.find(
  //     (cartItem) => cartItem.event.id === event.id
  //   );

  //   if (existingCartItem) {
  //     const updatedCart = cart.map((cartItem) =>
  //       cartItem.event.id === event.id
  //         ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //         : cartItem
  //     );
  //     setCart(updatedCart);
  //   } else {
  //     setCart([...cart, { event, quantity: 1 }]);
  //   }
  // };

  return (
    <div>
      <h2 className="text-2xl font-semibold py-4 text-center">Events</h2>

      {/* Movie cards */}
      <div className="grid px-2 py-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.length > 0 ? (
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
            <p className="text-right ml-auto w-full ">No events found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
