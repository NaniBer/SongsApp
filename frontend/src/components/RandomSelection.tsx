import React, { useState } from "react";

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
interface RandomSelectionProps {
  song: Song;
}

const RandomSelection: React.FC<RandomSelectionProps> = ({ song }) => {
  const [playlistList, setPlaylistList] = useState<Song>(song);
  return (
    <div className="p-8">
      <p className="font-semibold text-4xl mb-8 text-gray-800">Playlists</p>
    </div>
  );
};

export default RandomSelection;
