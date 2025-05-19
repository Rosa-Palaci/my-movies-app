"use client";

import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";

const TopRatedPage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getTopRatedMovies(page)
      .then((res) => {
        setMovies(res.results);
        setTotalPages(res.total_pages);
      })
      .catch((err) => console.error("Error loading top rated:", err))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="pt-[20px] pl-[90px] pr-[90px]">
      <h2 className="text-4xl font-bold mb-4 text-center">Top Rated Movies</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <>
          <MovieList movies={movies} from="top-rated" />
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

export default TopRatedPage;
