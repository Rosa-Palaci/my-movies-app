import { MyMovie } from "@/types/MyMovie";
import { Video } from "@/types/Video";

const BASE_URL = "https://api.themoviedb.org/3";
const AUTH_HEADER = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
  Accept: "application/json",
};

export const getTrendingTrailers = async (): Promise<Video[]> => {
  const trending = await fetch(
    `${BASE_URL}/trending/movie/week?language=es-MX`,
    { headers: AUTH_HEADER }
  ).then((r) => r.json());

  const trailers = await Promise.all(
    (trending.results as MyMovie[])
      .slice(0, 10)
      .filter((m) => !!m.poster_path)
      .map(async (movie) => {
        const { results } = await fetch(
          `${BASE_URL}/movie/${movie.id}/videos?language=es-MX`,
          { headers: AUTH_HEADER }
        ).then((r) => r.json());

        const trailer = results?.find(
          (v: Video) => v.type === "Trailer" && v.site === "YouTube"
        );

        if (!trailer) return null;

        return {
          ...trailer,
          movieTitle: movie.title,
          posterPath: movie.poster_path,
        };
      })
  );
  return trailers.filter(Boolean) as Video[];
};
