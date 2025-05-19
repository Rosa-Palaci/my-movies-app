"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  title: string;
  movies: any[];
};

export default function HorizontalMovieList({ title, movies }: Props) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-black mb-4 px-[90px]">{title}</h2>
      <div className="overflow-x-auto whitespace-nowrap px-[90px]">
        <div className="flex gap-4">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="min-w-[180px] flex-shrink-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-[180px] h-[270px] rounded-[25px] overflow-hidden"
              >
                <div className="relative w-[180px] h-[270px]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </motion.div>
              <p className="mt-2 text-sm text-black whitespace-normal w-[180px]">
                {movie.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
