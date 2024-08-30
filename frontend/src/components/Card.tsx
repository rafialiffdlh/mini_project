"use client";
import React, { useRef } from "react";
import "./Card.css";
const Card: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className=" px-2 py-6 md:py-12">
      <div className="md:mt-4 mt-0 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Event Pilihan
        </h2>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64">
              <img
                src="https://cdn1-production-images-kly.akamaized.net/ekI52FZFaRdHP7TyD4z8YP6vmw8=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4871366/original/058485700_1719041559-_JKT__BRMS_1x1.JPG"
                alt="Event 1"
                className="w-full h-45 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Event Title 1</h3>
                <p className="text-gray-600 mt-2">
                  Event description goes here.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64">
              <img
                src="https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg"
                alt="Event 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Event Title 2</h3>
                <p className="text-gray-600 mt-2">
                  Event description goes here.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64">
              <img
                src="https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg"
                alt="Event 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Event Title 3</h3>
                <p className="text-gray-600 mt-2">
                  Event description goes here.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64">
              <img
                src="https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg"
                alt="Event 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Event Title 3</h3>
                <p className="text-gray-600 mt-2">
                  Event description goes here.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64">
              <img
                src="https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg"
                alt="Event 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Event Title 3</h3>
                <p className="text-gray-600 mt-2">
                  Event description goes here.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64">
              <img
                src="https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg"
                alt="Event 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Event Title 3</h3>
                <p className="text-gray-600 mt-2">
                  Event description goes here.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64">
              <img
                src="https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg"
                alt="Event 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Event Title 3</h3>
                <p className="text-gray-600 mt-2">
                  Event description goes here.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64">
              <img
                src="https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg"
                alt="Event 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Event Title 3</h3>
                <p className="text-gray-600 mt-2">
                  Event description goes here.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64">
              <img
                src="https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg"
                alt="Event 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Event Title 3</h3>
                <p className="text-gray-600 mt-2">
                  Event description goes here.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-64">
              <img
                src="https://bankbjb.co.id/files/2024/05/465ea52a-5155-4391-9c81-a74e650945d6.jpg"
                alt="Event 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Event Title 3</h3>
                <p className="text-gray-600 mt-2">
                  Event description goes here.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={scrollLeft}
            className="absolute top-1/3 left-0 transform -translate-y-1/2  text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={scrollRight}
            className="absolute top-1/3 right-0 transform -translate-y-1/2  text-white p-2 rounded-full shadow-lg text-2x1"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
