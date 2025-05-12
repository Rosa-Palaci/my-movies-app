import { useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { useRouter } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  overview: string;
}

interface MovieListProps {
  movies: Movie[];
  from?: string; // página de origen (opcional)
}

const MovieList: React.FC<MovieListProps> = ({ movies, from = "" }) => {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = (id: number) => {
    setShowOverlay(true);
    setTimeout(() => {
      router.push(`/movie/${id}?from=${from}`);
    }, 2000); // Espera 2 segundos
  };

  return (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-6" />
          <h1 className="text-white text-5xl font-bold">Cine Rosa</h1>
        </div>
      )}

      {/* Movie grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => handleClick(movie.id)}
          >
            <MovieCard
              title={movie.title}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              releaseYear={parseInt(movie.release_date?.split("-")[0])}
              description={movie.overview}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieList;
