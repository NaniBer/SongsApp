import React from "react";

interface Song {
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  releaseDate?: Date;
  duration?: number;
  user?: string;
}

// Define the props type for SongList
interface SongsListProps {
  songs: Song[];
}

// Define the SongList component
const SongsList: React.FC<SongsListProps> = ({ songs }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Song List</h2>
      <table className="min-w-full border rounded-2xl p-10 shadow-lg  ">
        <thead>
          <tr className="">
            <th className="py-2 px-4 text-left text-gray-700">Title</th>
            <th className="py-2 px-4 text-left text-gray-700">Artist</th>
            <th className="py-2 px-4 text-left text-gray-700">Album</th>
            <th className="py-2 px-4 text-left text-gray-700">Genre</th>
            <th className="py-2 px-4 text-left text-gray-700">Release Date</th>
            <th className="py-2 px-4 text-left text-gray-700">Duration</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              } border-b border-gray-200`}
            >
              <td className="py-2 px-4 text-left">{song.title}</td>
              <td className="py-2 px-4 text-left">{song.artist}</td>
              <td className="py-2 px-4 text-left">{song.album || "-"}</td>
              <td className="py-2 px-4 text-left">{song.genre || "-"}</td>
              <td className="py-2 px-4 text-left">
                {song.releaseDate ? song.releaseDate.toDateString() : "-"}
              </td>
              <td className="py-2 px-4 text-center">
                {song.duration ? `${song.duration} seconds` : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongsList;
