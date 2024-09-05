"use client";
import React, { useRef, useState } from "react";

interface Event {
  title: string;
  description: string;
  imageUrl: string;
}

const events: Event[] = [
  {
    title: "Event Title 1",
    description: "Event description goes here.",
    imageUrl:
      "https://cdn1-production-images-kly.akamaized.net/ekI52FZFaRdHP7TyD4z8YP6vmw8=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4871366/original/058485700_1719041559-_JKT__BRMS_1x1.JPG",
  },
  {
    title: "Event Title 2",
    description: "Event description goes here.",
    imageUrl:
      "https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg",
  },
  {
    title: "Event Title 2",
    description: "Event description goes here.",
    imageUrl:
      "https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg",
  },
  {
    title: "Event Title 3",
    description: "Event description goes here.",
    imageUrl:
      "https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg",
  },
  {
    title: "Event Title 4",
    description: "Event description goes here.",
    imageUrl:
      "https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg",
  },
];

const Card: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-2 py-2">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Event Pilihan
        </h2>

        <div className="relative flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full max-w-md px-4 py-2 border rounded-md shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64"
                >
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-gray-600 mt-2">{event.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No events found.</p>
            )}
          </div>

          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/3 left-0 transform -translate-y-1/2 text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={scrollRight}
            className="absolute top-1/3 right-0 transform -translate-y-1/2 text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
