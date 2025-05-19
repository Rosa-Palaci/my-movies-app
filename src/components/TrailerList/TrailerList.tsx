"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Video } from "@/types/Video";

type Props = {
  videos: Video[];
};

export default function TrailerList({ videos }: Props) {
  const [selected, setSelected] = useState<Video | null>(null);

  return (
    <>
      <section className="mt-12 px-[90px]">
        <h2 className="text-3xl font-bold text-black mb-4">Últimos tráilers</h2>

        <div className="flex gap-4 overflow-x-auto pb-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="w-[300px] flex-shrink-0 cursor-pointer"
              onClick={() => setSelected(video)}
            >
              <div className="w-full h-[170px] relative rounded-[30px] overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${video.posterPath}`}
                  alt={video.movieTitle}
                  fill
                  className="object-cover"
                />
                <span className="absolute inset-0 grid place-items-center text-black text-5xl">
                  ▶
                </span>
              </div>
              <p className="mt-2 text-black text-center font-medium">
                {video.movieTitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal video trailer */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl w-full aspect-video p-0 bg-black">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Tráiler de {selected?.movieTitle}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <iframe
              className="w-full h-full rounded-md"
              src={`https://www.youtube.com/embed/${selected.key}?autoplay=1`}
              title={selected.name}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
