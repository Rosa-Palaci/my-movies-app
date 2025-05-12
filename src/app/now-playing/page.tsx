"use client";

import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import MovieList from "@/components/MovieList/MovieList";

const NowPlayingPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNowPlayingMovies()
      .then((res) => setMovies(res.results))
      .catch((err) => console.error("Error loading now playing:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="pt-[120px] pl-[90px] pr-[90px]"
      style={{
        background:
          "linear-gradient(to bottom right, #9031FF, #21C5FE, #001B96)",
      }}
    >
      <h2 className="text-4xl font-bold mb-4 text-center">Now Playing</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <MovieList movies={movies} from="now-playing" />
      )}
    </div>
  );
};

export default NowPlayingPage;
