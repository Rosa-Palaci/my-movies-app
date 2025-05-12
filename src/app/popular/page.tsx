// src/app/popular/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import Link from "next/link";
import MovieList from "@/components/MovieList/MovieList";

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
    <div
      className="pt-[120px] pl-[90px] pr-[90px]"
      style={{
        background:
          "linear-gradient(to bottom right, #9031FF, #21C5FE, #001B96)",
      }}
    >
      <h1 className="text-4xl font-bold mb-4 text-center">Popular Movies</h1>
      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <MovieList movies={movies} from="popular" />
      )}
    </div>
  );
};

export default PopularClientPage;
