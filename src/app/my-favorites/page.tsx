"use client";

import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList/MovieList";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";
import Pagination from "@/components/Pagination/Pagination";
import { MyMovie } from "@/types/MyMovie";

const MyFavoritePage = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<MyMovie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavoriteMovies(guestSessionId, page);
        setMovies(data?.results || []);
        setTotalPages(data?.total_pages || 1);
      } catch (err) {
        console.error("Error al cargar favoritos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [guestSessionId, page]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Mis Películas Favoritas</h1>

      {loading && (
        <p className="text-lg text-gray-500">Cargando favoritos...</p>
      )}

      {!loading && movies.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-xl">Aún no tienes películas favoritas.</p>
          <p className="text-sm mt-2">
            Ve al detalle de una película y haz clic en{" "}
            <b>&quot;Agregar a favoritos&quot;</b>.
          </p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <>
          <MovieList movies={movies} />{" "}
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

export default MyFavoritePage;
