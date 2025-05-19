"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HorizontalMovieList from "@/components/HorizontalMovieList/HorizontalMovieList";
import { getTrendingMovies } from "@/services/movies/getTrendingMovies";
import { IMovie } from "@/types/Movie";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [trending, setTrending] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=es-MX",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
              Accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, []);

  //Cambio de imagen
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  // Trending movies
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingMovies();
        setTrending(data.results || []);
      } catch (error) {
        console.error("Error fetching trending or trailers:", error);
      }
    };

    fetchTrending();
  }, []);

  const movie = movies[index];

  if (!movie)
    return (
      <div className="text-center text-white mt-10">Cargando imagen...</div>
    );

  return (
    <div>
      <div className="relative w-full h-screen z-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || "Imagen de película"}
          fill
          className="object-cover transition-opacity duration-1000"
          priority
          sizes="100vw"
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 text-white z-10 text-left max-w-lg pl-[90px]">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-md mb-4">
            Bienvenido profesor César Betancourt a Cine Rosa
          </h1>
          <h2 className="text-xl md:text-2xl font-medium drop-shadow-md">
            By Rosa Vanessa Palacios Beltrán – A01652612
          </h2>
        </div>
      </div>
      {/* Trending */}
      {trending.length > 0 && (
        <HorizontalMovieList title="Tendencias" movies={trending} />
      )}
    </div>
  );
}
