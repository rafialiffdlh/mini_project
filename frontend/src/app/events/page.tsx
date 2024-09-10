import React from "react";

type Props = {};

export default function EventsPage({}: Props) {
  return (
    <div className="bg-black text-white">
      <nav className="p-4">
        {/* Navigation bar */}
        <ul className="flex space-x-4">
          <li>Home</li>
          <li>Movies</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className="p-4">
        {/* Movie header with title and description */}
        <h1 className="text-4xl font-bold">TIX ID</h1>
        <p className="mt-2">Your favorite movie ticketing platform.</p>
      </div>
      <main className="p-4">
        <section className="mb-8">
          {/* Videos/trailers section */}
          <h2 className="text-2xl font-semibold">Trailers</h2>
          <div className="flex space-x-4">
            <div className="w-1/3 bg-gray-800 p-4">Video 1</div>
            <div className="w-1/3 bg-gray-800 p-4">Video 2</div>
            <div className="w-1/3 bg-gray-800 p-4">Video 3</div>
          </div>
        </section>
        <section className="mb-8">
          {/* Cast & Crew section */}
          <h2 className="text-2xl font-semibold">Cast & Crew</h2>
          <div className="flex space-x-4">
            <div className="w-1/4 bg-gray-800 p-4">Cast 1</div>
            <div className="w-1/4 bg-gray-800 p-4">Cast 2</div>
            <div className="w-1/4 bg-gray-800 p-4">Cast 3</div>
            <div className="w-1/4 bg-gray-800 p-4">Cast 4</div>
          </div>
        </section>
        <section className="mb-8">
          {/* Photos gallery */}
          <h2 className="text-2xl font-semibold">Photos</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4">Photo 1</div>
            <div className="bg-gray-800 p-4">Photo 2</div>
            <div className="bg-gray-800 p-4">Photo 3</div>
          </div>
        </section>
      </main>
      <div className="p-4">
        {/* Other movies section */}
        <h2 className="text-2xl font-semibold">Other Movies</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4">Movie 1</div>
          <div className="bg-gray-800 p-4">Movie 2</div>
          <div className="bg-gray-800 p-4">Movie 3</div>
          <div className="bg-gray-800 p-4">Movie 4</div>
        </div>
      </div>
    </div>
  );
}
