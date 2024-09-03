import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Tooltip from "@mui/material/Tooltip";

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
interface SongsListProps {
  songs: Song[];
}

const SongsList: React.FC<SongsListProps> = ({ songs }) => {
  const [songList, setSongList] = useState<Song[]>(songs);
  const changeFavStatus = (id: string) => {
    setSongList((prevSongs) =>
      prevSongs.map((song) =>
        song.id === id ? { ...song, fav: !song.fav } : song
      )
    );
  };
  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-10">Song List</h2>
      <table className="min-w-full rounded-2xl p-10 shadow-lg text-xl  ">
        <thead>
          <tr className="border-b border-gray-400 pb-4">
            <th className="py-6 px-4 text-left text-gray-700">Title</th>
            <th className="py-6 px-4 text-left text-gray-700">Artist</th>
            <th className="py-6 px-4 text-left text-gray-700">Album</th>
            <th className="py-6 px-4 text-left text-gray-700">Genre</th>
            <th className="py-6 px-4 text-left text-gray-700">Release Date</th>
            <th className="py-6 px-4 text-left text-gray-700">Duration</th>
          </tr>
        </thead>
        <tbody>
          {songList.map((song, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              } border-b border-gray-200`}
            >
              <td className="py-8 px-4 text-left">{song.title}</td>
              <td className="py-2 px-4 text-left">{song.artist}</td>
              <td className="py-2 px-4 text-left">{song.album || "-"}</td>
              <td className="py-2 px-4 text-left">{song.genre || "-"}</td>
              <td className="py-2 px-4 text-left">
                {song.releaseDate ? song.releaseDate.toDateString() : "-"}
              </td>
              <td className="py-2 px-4 text-left">
                {song.duration ? formatDuration(song.duration) : "-"}
              </td>
              <td className="py-2 px-4 text-left">
                <Tooltip
                  title={
                    <span className="text-base ">
                      {song.fav ? "Remove from Favorites" : "Add to Favorites"}
                    </span>
                  }
                >
                  {song.fav ? (
                    <FavoriteIcon
                      style={{ color: "red" }}
                      className=" cursor-pointer"
                      onClick={() => changeFavStatus(song.id)}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      className=" cursor-pointer"
                      onClick={() => changeFavStatus(song.id)}
                    />
                  )}
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongsList;
