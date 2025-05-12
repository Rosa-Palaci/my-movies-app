// src/app/movie/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getMovieById } from "@/services/movies/getMovieById";
import { IMovieDetail } from "@/types/MovieDetail";
import Image from "next/image";

const MovieDetailPage = () => {
  const { id } = useParams(); // id is a string | string[] | undefined
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  console.log(from);

  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie", err);
        setError("Could not load movie.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading movie...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found.</div>;

  return (
    <div
      className={`relative w-full h-screen ${!isImageLoaded ? "bg-black" : ""}`}
    >
      {!isImageLoaded && <div className="absolute inset-0 bg-black z-10" />}
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        className="object-cover brightness-50"
        priority
        sizes="100vw"
        onLoadingComplete={() => setIsImageLoaded(true)}
      />
      <div className="absolute top-1/2 left-[90px] transform -translate-y-1/2 z-10 max-w-xl">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-md text-white">
          {movie.title}
        </h1>
        <p className="text-lg drop-shadow-md text-white">{movie.overview}</p>
        {/* Add more movie details here */}
      </div>
    </div>
  );
};
export default MovieDetailPage;
