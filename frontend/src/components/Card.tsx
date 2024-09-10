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

const Card: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
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

  return (
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

      {/* Movie cards */}
      <div className="grid px-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
              {/* Poster image */}
              <img
                src={movie.poster}
                alt={movie.movie_name}
                className="w-full h-48 object-cover"
              />
              {/* Movie details */}
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
              {/* Buy button */}
              <div className="absolute bottom-4 right-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                  onClick={() => addToCart(movie)} // Add to cart when clicked
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

      {/* Cart section */}
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
                  ${(cartItem.movie.price * cartItem.quantity).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Card;
