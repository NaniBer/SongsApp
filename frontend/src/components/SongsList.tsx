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
    <div className="p-2 mb-4">
      <h2 className="text-xl font-bold mb-2 text-gray-200">Song List</h2>
      <table className="min-w-full rounded-2xl p-3 shadow-lg text-sm  ">
        <thead>
          <tr className="border-b border-gray-400 pb-4">
            <th className="py-6 px-2 text-left text-gray-300">Title</th>
            <th className="py-6 px-2 text-left text-gray-300">Artist</th>
            <th className="py-6 px-2 text-left text-gray-300">Album</th>
            <th className="py-6 px-2 text-left text-gray-300">Genre</th>
            <th className="py-6 px-2 text-left text-gray-300">Duration</th>
          </tr>
        </thead>
        <tbody>
          {songList.map((song, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-tableEven" : "bg-tableOdd"
              } border-b border-gray-200`}
            >
              <td className="py-2 px-4 text-left text-gray-300">
                {song.title}
              </td>
              <td className="py-2 px-4 text-left text-gray-300">
                {song.artist}
              </td>
              <td className="py-2 px-4 text-left text-gray-300">
                {song.album || "-"}
              </td>
              <td className="py-2 px-4 text-left text-gray-300">
                {song.genre || "-"}
              </td>
              <td className="py-2 px-4 text-left text-gray-300">
                {song.duration ? formatDuration(song.duration) : "-"}
              </td>
              <td className="py-2 px-4 text-left text-gray-300">
                <Tooltip
                  title={
                    <span className="text-base text-gray-300">
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
