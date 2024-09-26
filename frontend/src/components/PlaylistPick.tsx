import React, { useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface PlaylistPickProps {
  name: string;
  description?: string;
  songs: string[];
  createdAt: Date;
  updatedAt: Date;
}
interface Playlist {
  name: string;
  description?: string;
  songs: string[];
  user: string;
  genre: string[]; // Updated to be an array of genres
  createdAt: Date;
  updatedAt: Date;
}

const PlaylistPick = () => {
  const playlist = useSelector((state: RootState) => state.playlist.playlists);
  const getRandomPlaylist = () => {
    let max = playlist.length - 1;
    const index = Math.floor(Math.random() * (max - 0 + 1)) + 0;
    console.log(index);
    return playlist[index];
  };
  const [randomPlaylist, setRandomPlaylist] = useState<Playlist | undefined>(
    undefined
  );

  useEffect(() => {
    setRandomPlaylist(getRandomPlaylist());
  }, []);
  return (
    <div className="p-4 pt-2">
      <p className="font-semibold text-2xl mb-4  text-gray-300">
        Playlist Pick{" "}
      </p>
      <div className="mb-8 bg-bgColor rounded-2xl p-10 shadow-lg flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-gray-200">
            {randomPlaylist?.name}
          </p>
          <p className=" mt-3 flex items-center text-gray-300">
            <DescriptionIcon fontSize="medium" className="mr-1" />
            <span>{randomPlaylist?.description}</span>
          </p>
          <p className="mt-3 flex items-center text-gray-300">
            <MusicNoteIcon fontSize="medium" className="mr-1" />
            <span>{randomPlaylist?.songs?.length} Songs</span>
          </p>

          <button className="bg-btnColor text-white font-semibold py-1 px-2 mt-3 rounded-lg shadow-md transition duration-300 ease-in-out">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPick;
