// src/app/movie/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getMovieById } from "@/services/movies/getMovieById";
import { getMovieRecommendations } from "@/services/movies/getMovieRecommendations";
import { markAsFavorite } from "@/services/accounts/markAsFavorite";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { IMovieDetail } from "@/types/MovieDetail";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/Button/Button";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MovieRecommendation } from "@/types/MovieRecommendation";
import Link from "next/link";

const MovieDetailPage = () => {
  const { id } = useParams(); // id is a string | string[] | undefined
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>(
    []
  );

  const { guestSessionId } = useGuestSession();
  const [sliderRef] = useKeenSlider({
    loop: false,
    slides: { perView: 4, spacing: 15 },
  });

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

  //Cargar recomendaciones
  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const fetchRecommendations = async () => {
      try {
        const recs = await getMovieRecommendations(id);
        setRecommendations(recs);
      } catch (error) {
        console.error("Error loading recommendations", error);
      }
    };
    fetchRecommendations();
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
      className={`relative w-full min-h-screen pb-32 ${
        !isImageLoaded ? "bg-black" : ""
      }`}
    >
      {loading && <div className="absolute inset-0 bg-black z-10" />}
      {loading ? (
        <Loader />
      ) : (
        <>
          {!isImageLoaded && <Loader />}
          {movie && (
            <>
              {movie.backdrop_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover brightness-50"
                  priority
                  sizes="100vw"
                  onLoadingComplete={() => setIsImageLoaded(true)}
                />
              )}
              <div className="relative z-10 px-[90px] pt-[150px] pb-10 max-w-5xl">
                <h1 className="text-5xl font-bold mb-4 drop-shadow-md text-white">
                  {movie.title}
                </h1>
                <p className="text-lg drop-shadow-md text-white">
                  {movie.overview}
                </p>
                <div className="pt-4">
                  <Button
                    isFavorite={isFavorite}
                    label={
                      isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
                    }
                    onClick={handleToggleFavorite}
                  />
                </div>
              </div>
            </>
          )}

          {recommendations.length > 0 && (
            <div className="relative px-[90px] py-10 z-10">
              <h2 className="text-white text-3xl font-semibold mb-4">
                Recomendaciones
              </h2>
              <div ref={sliderRef} className="keen-slider">
                {recommendations.map((rec) => (
                  <Link
                    key={rec.id}
                    href={`/movie/${rec.id}`}
                    className="keen-slider__slide min-w-[200px]"
                  >
                    {rec.poster_path ? (
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                          alt={rec.title}
                          width={200}
                          height={300}
                          className="rounded-[25px] shadow-md"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-[200px] h-[300px] bg-gray-800 rounded-[25px] flex items-center justify-center text-white text-sm text-center">
                        Sin imagen
                      </div>
                    )}
                    <h2 className="text-white mt-2 text-[20px]">{rec.title}</h2>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default MovieDetailPage;
