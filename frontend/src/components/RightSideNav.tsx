import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  releaseDate?: Date;
  duration?: number;
  user?: string;
  fav: boolean;
}
const RightSideNav = () => {
  const songs = useSelector((state: RootState) => state.song.songs);
  const extractGenres = (songs: Song[]) => {
    const genres = new Set<string>();
    songs.forEach((song) => {
      if (song.genre) {
        genres.add(song.genre);
      }
    });
    return Array.from(genres);
  };
  const genres = extractGenres(songs);
  return (
    <div className="p-3 mb-4">
      <p className="font-semibold text-xl mb-8 text-gray-200 ">Genres</p>
      <div className="flex flex-wrap gap-4 mt-2 ml-3 text-gray-300">
        {genres.map((genre, index) => (
          <div
            key={index}
            className="bg-bgColor rounded-2xl py-2 px-4 transition transform hover:scale-105 cursor-pointer "
          >
            <p className="text-sm">{genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideNav;
