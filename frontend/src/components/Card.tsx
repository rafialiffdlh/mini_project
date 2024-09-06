"use client";
import React, { useState, useEffect } from "react";

interface Movie {
  id: number;
  movie_name: string;
  description: string;
  poster: string;
  release_date: string;
  price: number;
}

const Card: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch movie data from the API
    const fetchMovies = async () => {
      const response = await fetch("/api/movies");
      const data = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.movie_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-2 py-2">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold mb-8 text-center">Movies</h2>

        <div className="relative flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full max-w-md px-4 py-2 border rounded-md shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={movie.poster}
                  alt={movie.movie_name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{movie.movie_name}</h3>
                  <p className="text-gray-600 mt-2">{movie.description}</p>
                  <p className="text-gray-500 mt-2">
                    Release Date: {movie.release_date}
                  </p>
                  <p className="text-gray-700 mt-2 font-semibold">
                    Price: ${movie.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
