"use client";

import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import MovieList from "@/components/MovieList/MovieList";
import Loader from "@/components/Loader/Loader";

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
    <div className="pt-[20px] pl-[90px] pr-[90px]">
      <h2 className="text-4xl font-bold mb-4 text-center">Now Playing</h2>
      {loading ? <Loader /> : <MovieList movies={movies} from="now-playing" />}
    </div>
  );
};

export default NowPlayingPage;
