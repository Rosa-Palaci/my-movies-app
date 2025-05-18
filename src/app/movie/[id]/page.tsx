// src/app/movie/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getMovieById } from "@/services/movies/getMovieById";
import { markAsFavorite } from "@/services/accounts/markAsFavorite";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { IMovieDetail } from "@/types/MovieDetail";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";

const MovieDetailPage = () => {
  const { id } = useParams(); // id is a string | string[] | undefined
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { guestSessionId } = useGuestSession();

  //Cargar movie
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

  // Verificar favoritos
  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const storedFavorites = localStorage.getItem("favoriteMovieIds");
    const favoriteIds: number[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
    setIsFavorite(favoriteIds.includes(Number(id)));
  }, [id]);

  // Toggle favorito
  const handleToggleFavorite = async () => {
    if (!guestSessionId || !movie) return;
    const newFavoriteState = !isFavorite;

    try {
      await markAsFavorite(movie.id, newFavoriteState, guestSessionId);
      setIsFavorite(newFavoriteState);

      const stored = localStorage.getItem("favoriteMovieIds");
      const ids: number[] = stored ? JSON.parse(stored) : [];

      const updated = newFavoriteState
        ? [...new Set([...ids, movie.id])]
        : ids.filter((mid) => mid !== movie.id);

      localStorage.setItem("favoriteMovieIds", JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div
      className={`relative w-full h-screen ${!isImageLoaded ? "bg-black" : ""}`}
    >
      {loading && <div className="absolute inset-0 bg-black z-10" />}
      {loading ? (
        <Loader />
      ) : (
        <>
          {!isImageLoaded && <Loader />}
          {movie && (
            <>
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                fill
                className="object-cover brightness-50"
                priority
                sizes="100vw"
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
              {isImageLoaded && (
                <div className="absolute top-1/2 left-[90px] transform -translate-y-1/2 z-10 max-w-xl">
                  <h1 className="text-5xl font-bold mb-4 drop-shadow-md text-white">
                    {movie.title}
                  </h1>
                  <p className="text-lg drop-shadow-md text-white">
                    {movie.overview}
                  </p>
                  <button
                    onClick={handleToggleFavorite}
                    className={`px-4 py-2 rounded ${
                      isFavorite
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } text-white font-bold w-max`}
                  >
                    {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default MovieDetailPage;
