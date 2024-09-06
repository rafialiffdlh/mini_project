import { NextResponse } from "next/server";

export async function GET() {
  const movies = [
    {
      id: 1,
      movie_name: "The Dark Knight",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      director: "Christopher Nolan",
      producer: "Christopher Nolan, Emma Thomas, Charles Roven",
      description: "When the menace known as the Joker wreaks havoc...",
      ratings: 9,
      genre: ["Action", "Crime", "Drama"],
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjVkMzZmMWEtNjUyMi00MWJlLTg0NDYtN2MzMDQxNWY2MWIxXkEyXkFqcGdeQXVyMTQyNDk2NzE@._V1_.jpg",
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
        "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      ratings: 8.9,
      genre: ["Crime", "Drama"],
      poster: "https://www.imdb.com/title/tt0110912/mediaviewer/rm1126166785/",
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
        "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
      ratings: 8.8,
      genre: ["Drama", "Romance"],
      poster: "https://www.imdb.com/title/tt0109830/mediaviewer/rm2196052224/",
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
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      ratings: 9.2,
      genre: ["Drama"],
      poster: "https://www.imdb.com/title/tt0111161/mediaviewer/rm1743887873/",
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
      description:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      ratings: 9.2,
      genre: ["Crime", "Drama"],
      poster: "https://www.imdb.com/title/tt0068646/mediaviewer/rm1808768000/",
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
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      ratings: 8.8,
      genre: ["Action", "Adventure", "Sci-Fi"],
      poster: "https://www.imdb.com/title/tt1375666/mediaviewer/rm1718345216/",
      release_date: "2010-07-16",
      runtime: 148,
      price: 10000,
    },
    // Add more movies here...
  ];

  return NextResponse.json(movies);
}
