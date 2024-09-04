import React, { useState } from "react";

interface Playlist {
  name: string;
  description: string;
  songsCount: number;
}

interface PlaylistListProps {
  playlist: Playlist[];
}

const PlaylistList: React.FC<PlaylistListProps> = ({ playlist }) => {
  const [playlistList, setPlaylistList] = useState<Playlist[]>(playlist);

  return (
    <div className="p-8">
      <p className="font-bold text-4xl mb-10 text-gray-200">Playlists</p>
      {playlistList.map((playlist, index) => (
        <div
          key={index}
          className="mb-6 p-4 bg-bgColor shadow-lg rounded-lg transition transform hover:scale-105 cursor-pointer "
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-xl text-gray-300 leading-tight">
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
