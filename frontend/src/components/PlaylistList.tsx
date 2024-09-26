import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface NewPlaylist {
  name: string;
  description: string;
  songsCount: number;
}

interface PlaylistListProps {
  playlist: NewPlaylist[];
}

const PlaylistList: React.FC<PlaylistListProps> = ({ playlist }) => {
  const newPlaylists = useSelector(
    (state: RootState) => state.playlist.newPlaylists
  );
  const [playlistList, setPlaylistList] = useState<NewPlaylist[]>(playlist);
  // console.log(playlistList);
  return (
    <div className="p-8">
      <p className="font-bold text-xl mb-5 text-gray-200">Playlists</p>
      {newPlaylists.map((playlist, index) => (
        <div
          key={index}
          className="mb-6 p-4 bg-bgColor shadow-lg rounded-lg transition transform hover:scale-105 cursor-pointer "
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-300 leading-tight">
              {playlist.name}
            </p>
            <p className="font-light text-gray-300">
              {playlist.songsCount} songs
            </p>
          </div>
          <p className="font-light text-gray-300 truncate">
            {playlist.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
