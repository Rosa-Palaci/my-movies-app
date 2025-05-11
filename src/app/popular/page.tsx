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
    <div>
      <h2 className="text-xl font-bold mb-4">Client-rendered Popular Movies</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <MovieList movies={movies} from="popular" />
      )}
    </div>
  );
};

export default PopularClientPage;
