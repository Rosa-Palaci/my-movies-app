"use client";

import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import MovieList from "@/components/MovieList/MovieList";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";

const NowPlayingPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getNowPlayingMovies(page)
      .then((res) => {
        setMovies(res.results);
        setTotalPages(res.total_pages);
      })
      .catch((err) => console.error("Error loading now playing:", err))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="pt-[20px] pl-[90px] pr-[90px]">
      <h2 className="text-4xl font-bold mb-4 text-center">Now Playing</h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MovieList movies={movies} from="now-playing" />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default NowPlayingPage;
