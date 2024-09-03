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
      {playlistList.map((playlist, index) => (
        <div>
          <p>{playlist.name}</p>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
