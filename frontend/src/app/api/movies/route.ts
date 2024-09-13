import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() || "";

  const movies = [
    {
      id: 1,
      movie_name: "The Dark Knight",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      director: "Christopher Nolan",
      producer: "Christopher Nolan, Emma Thomas, Charles Roven",
      description: "When the menace known as the Joker wreaks havoc.",
      ratings: 9,
      genre: ["Action", "Crime", "Drama"],
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_SX300.jpg",
      release_date: "2008-07-18",
      runtime: 152,
      price: 10000,
    },
    {
      id: 2,
      movie_name: "Pulp Fiction",
      cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
      director: "Quentin Tarantino",
      producer: "Lawrence Bender",
      description:
        "The lives of two mob hitmen, a boxer, a gangster and his wife.",
      ratings: 8.9,
      genre: ["Crime", "Drama"],
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_SX300.jpg ",
      release_date: "1994-10-14",
      runtime: 154,
      price: 10000,
    },
    {
      id: 3,
      movie_name: "Forrest Gump",
      cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
      director: "Robert Zemeckis",
      producer: "Wendy Finerman, Steve Tisch, Steve Starkey",
      description:
        "The presidencies of Kennedy and Johnson, the events of Vietnam.",
      ratings: 8.8,
      genre: ["Drama", "Romance"],
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_SX300.jpg",
      release_date: "1994-07-06",
      runtime: 142,
      price: 10000,
    },
    {
      id: 4,
      movie_name: "The Shawshank Redemption",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      director: "Frank Darabont",
      producer: "Niki Marvin",
      description:
        "Two imprisoned men bond over a number of years, finding solace.",
      ratings: 9.2,
      genre: ["Drama"],
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjVkMzZmMWEtNjUyMi00MWJlLTg0NDYtN2MzMDQxNWY2MWIxXkEyXkFqcGdeQXVyMTQyNDk2NzE@._V1_.jpg",
      release_date: "1994-09-23",
      runtime: 142,
      price: 10000,
    },
    {
      id: 5,
      movie_name: "The Godfather",
      cast: ["Marlon Brando", "Al Pacino", "James Caan"],
      director: "Francis Ford Coppola",
      producer: "Albert S. Ruddy",
      description: "The aging patriarch of an organized crime dynasty.",
      ratings: 9.2,
      genre: ["Crime", "Drama"],
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjVkMzZmMWEtNjUyMi00MWJlLTg0NDYtN2MzMDQxNWY2MWIxXkEyXkFqcGdeQXVyMTQyNDk2NzE@._V1_.jpg",
      release_date: "1972-03-24",
      runtime: 175,
      price: 10000,
    },
    {
      id: 6,
      movie_name: "Inception",
      cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
      director: "Christopher Nolan",
      producer: "Christopher Nolan, Emma Thomas",
      description: "A thief who steals corporate secrets through the use",
      ratings: 8.8,
      genre: ["Action", "Adventure", "Sci-Fi"],
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjVkMzZmMWEtNjUyMi00MWJlLTg0NDYtN2MzMDQxNWY2MWIxXkEyXkFqcGdeQXVyMTQyNDk2NzE@._V1_.jpg",
      release_date: "2010-07-16",
      runtime: 148,
      price: 10000,
    },
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.movie_name.toLowerCase().includes(search)
  );

  return NextResponse.json(filteredMovies);
}
