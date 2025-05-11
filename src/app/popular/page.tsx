// src/app/popular/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";

const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  const fetchPopularMovies = async () => {
    setLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
    try {
      const data = await getPopularMovies();
      setMovies(data.results);
    } catch (err) {
      console.error("Error loading movies: ", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Client-rendered Popular Movies</h2>
      {loading && <p className="text-sm text-muted-foreground">Cargando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.map((movie) => (
          <Link
            key={movie.id}
            href={{
              pathname: `/movie/${movie.id}`,
              query: { from: "popular" },
            }}
          >
            <MovieCard
              title={movie.title}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              releaseYear={parseInt(movie.release_date?.split("-")[0])}
              description={movie.overview}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularClientPage;
