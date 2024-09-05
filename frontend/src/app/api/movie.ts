import { NextResponse } from "next/server";

export async function GET() {
  const movies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      year: 1994,
      genre: ["Drama"],
      rating: 9.3,
      director: "Frank Darabont",
      poster: "https://fakeimg.pl/220x310/ff0000",
      trailer: "https://example.com/shawshank_redemption_trailer.mp4",
    },
    // Add other movies here...
  ];

  return NextResponse.json(movies);
}
