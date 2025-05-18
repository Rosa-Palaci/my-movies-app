"use client";

import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import MovieList from "@/components/MovieList/MovieList";

const TopRatedPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopRatedMovies()
      .then((res) => setMovies(res.results))
      .catch((err) => console.error("Error loading top rated:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-[20px] pl-[90px] pr-[90px]">
      <h2 className="text-4xl font-bold mb-4 text-center">Top Rated Movies</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <MovieList movies={movies} from="top-rated" />
      )}
    </div>
  );
};

export default TopRatedPage;
