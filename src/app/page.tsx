"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import HorizontalMovieList from "@/components/HorizontalMovieList/HorizontalMovieList";
import TrailerList from "@/components/TrailerList/TrailerList";

import { getTrendingMovies } from "@/services/movies/getTrendingMovies";
import { getTrendingTrailers } from "@/services/movies/getTrendingTrailers";

import { IMovie } from "@/types/Movie";
import { Video } from "@/types/Video";

export default function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [index, setIndex] = useState(0);

  const [trending, setTrending] = useState<IMovie[]>([]);
  const [trailers, setTrailers] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchPopular() {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=es-MX",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
            Accept: "application/json",
          },
        }
      );
      const { results } = await res.json();
      setMovies(results ?? []);
    }
    fetchPopular().catch(console.error);
  }, []);

  /* Carrusel imagenes */
  useEffect(() => {
    if (!movies.length) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % movies.length),
      5_000
    );
    return () => clearInterval(id);
  }, [movies]);

  // Trending movies
  useEffect(() => {
    getTrendingMovies()
      .then((data) => setTrending(data.results ?? []))
      .catch(console.error);
  }, []);

  //Traileres
  useEffect(() => {
    getTrendingTrailers().then(setTrailers).catch(console.error);
  }, []);

  const movie = movies[index];

  if (!movie)
    return (
      <div className="text-center text-white mt-10">Cargando imagen...</div>
    );

  return (
    <div>
      <div className="relative w-full h-screen z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={movie.id}
            className="absolute inset-0"
            /* la nueva imagen entra desde la derecha */
            initial={{ x: "100%" }} // fuera de pantalla a la derecha
            animate={{ x: 0 }} // posición normal
            /* la imagen saliente sale hacia la izquierda */
            exit={{ x: "-100%" }} // se va completamente a la izquierda
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 transform -translate-y-1/2 text-white z-10 text-left max-w-lg pl-[90px]">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-md mb-4">
            Bienvenido profesor César Betancourt a Cine Rosa
          </h1>
          <h2 className="text-xl md:text-2xl font-medium drop-shadow-md">
            By Rosa Vanessa Palacios Beltrán – A01652612
          </h2>
        </div>
      </div>
      {/* Traileres */}
      {trailers.length > 0 && <TrailerList videos={trailers} />}
      {/* Trending */}
      {trending.length > 0 && (
        <HorizontalMovieList title="Tendencias" movies={trending} />
      )}
    </div>
  );
}
