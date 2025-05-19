// src/app/popular/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";

const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPopularMovies = async (page: number) => {
    setLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
    try {
      const data = await getPopularMovies(page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Error loading movies: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies(page);
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="pt-[20px] pl-[90px] pr-[90px]">
      <h1 className="text-4xl font-bold mb-4 text-center">Popular Movies</h1>
      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <>
          <MovieList movies={movies} from="popular" />
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

export default PopularClientPage;
