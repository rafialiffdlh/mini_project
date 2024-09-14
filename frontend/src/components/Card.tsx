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

interface CartItem {
  movie: Movie;
  quantity: number;
}

const SkeletonCard: React.FC = () => (
  <div className="flex w-52 flex-col gap-4 animate-pulse">
    <div className="skeleton h-32 w-full bg-gray-300"></div>
    <div className="skeleton h-4 w-28 bg-gray-300"></div>
    <div className="skeleton h-4 w-full bg-gray-300"></div>
    <div className="skeleton h-4 w-full bg-gray-300"></div>
  </div>
);

const Card: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await fetch(`/api/movies?search=${debouncedSearchTerm}`);
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    };

    fetchMovies();
  }, [debouncedSearchTerm, currentPage]);

  const addToCart = (movie: Movie) => {
    const existingCartItem = cart.find(
      (cartItem) => cartItem.movie.id === movie.id
    );

    if (existingCartItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.movie.id === movie.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { movie, quantity: 1 }]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-4">
      <div className="px-2 mt-8 mx-auto max-w-screen-xl">
        <h2 className="text-2xl font-semibold mb-8 text-center">Movies</h2>

        {/* Search input */}
        <div className="relative flex mt-8 justify-center mb-6">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full max-w-md px-4 py-2 border rounded-md shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* skeleton */}
        <div className="grid px-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden relative"
              >
                <img
                  src={movie.poster}
                  alt={movie.movie_name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 pb-16">
                  <h3 className="text-lg font-semibold">{movie.movie_name}</h3>
                  <p className="text-gray-600 mt-2">{movie.description}</p>
                  <p className="text-gray-500 mt-2">
                    Release Date: {movie.release_date}
                  </p>
                  <p className="text-gray-700 mt-2 font-semibold">
                    Price: ${movie.price.toLocaleString()}
                  </p>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                    onClick={() => addToCart(movie)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No movies found.</p>
          )}
        </div>

        {/* pagination */}
        <div className="flex justify-center mt-6">
          <div className="join">
            {Array.from({ length: 5 }, (_, i) => (
              <input
                key={i + 1}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label={`${i + 1}`}
                checked={currentPage === i + 1}
                onChange={() => handlePageChange(i + 1)}
              />
            ))}
          </div>
        </div>

        {/* add card*/}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Cart</h3>
          {cart.length > 0 ? (
            <ul className="space-y-4">
              {cart.map((cartItem) => (
                <li
                  key={cartItem.movie.id}
                  className="flex justify-between items-center"
                >
                  <span>
                    {cartItem.movie.movie_name} (x{cartItem.quantity})
                  </span>
                  <span>
                    $
                    {(
                      cartItem.movie.price * cartItem.quantity
                    ).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
