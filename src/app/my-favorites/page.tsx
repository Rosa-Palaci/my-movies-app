"use client";

import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList/MovieList";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";

const MyFavoritePage = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]); // Puedes tiparlo luego con IMovie[] si lo tienes

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavoriteMovies(guestSessionId);
        setMovies(data?.results || []);
      } catch (err) {
        console.error("Error al cargar favoritos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [guestSessionId]);

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
            <b>"Agregar a favoritos"</b>.
          </p>
        </div>
      )}

      {!loading && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MyFavoritePage;
