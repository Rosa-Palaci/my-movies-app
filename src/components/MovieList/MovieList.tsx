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

  const handleClick = (id: number) => {
    router.push(`/movie/${id}?from=${from}`);
  };

  return (
    <>
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
