import React, { useState, useEffect } from "react";
import PlaylistPick from "../components/PlaylistPick";
import SearchBar from "../components/SearchBar";
import AddIcon from "@mui/icons-material/Add";

// Define the TypeScript type for Playlist
interface Playlist {
  name: string;
  description?: string;
  songs: string[];
  user: string;
  genre: string[]; // Updated to be an array of genres
  createdAt: Date;
  updatedAt: Date;
}

const PlaylistPage: React.FC = () => {
  // State to hold the list of playlists
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // Sample data for playlists
  const samplePlaylists: Playlist[] = [
    {
      name: "Chill Vibes",
      description: "A collection of relaxing tunes.",
      songs: ["song1", "song2"],
      user: "user1",
      genre: ["Lo-fi", "Chill"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Top Hits",
      description: "The most popular songs right now.",
      songs: ["song3", "song4"],
      user: "user2",
      genre: ["Pop", "Dance"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Workout Mix",
      description: "Energetic songs to keep you motivated.",
      songs: ["song5", "song6"],
      user: "user3",
      genre: ["Hip-Hop", "Electronic"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Add more playlists as needed
  ];

  // Simulate fetching playlists data
  useEffect(() => {
    // Instead of fetching data, use sample data
    setPlaylists(samplePlaylists);
  }, []);

  const handleSearch = (text: string) => {
    console.log(text);
  };

  return (
    <div className="flex h-full m-4 mt-8 ml-10">
      <div className="flex-grow h-full">
        <div className="m-2 h-full">
          <p className="font-semibold text-4xl mb-8 text-gray-300">Playlists</p>
          <div className="space-y-4 pl-10 w-full overflow-auto custom-scrollbar">
            {playlists.map((playlist, index) => (
              <div
                key={index}
                className="p-4 bg-bgColor rounded-lg shadow-lg hover:scale-105 transition-transform"
              >
                <h3 className="text-xl font-bold text-white">
                  {playlist.name}
                </h3>
                {playlist.description && (
                  <p className="text-gray-300 mt-2">{playlist.description}</p>
                )}
                <p className="text-gray-400 mt-2">
                  Songs: {playlist.songs.length}
                </p>
                <p className="text-gray-400 mt-2">
                  Genre: {playlist.genre.join(", ")}
                </p>{" "}
                {/* Display genre as a comma-separated list */}
                <p className="text-gray-400 mt-2">
                  Created: {new Date(playlist.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex gap-4 mb-5">
          <div className="rounded-full w-80 border-2 border-tableOdd">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="rounded-full">
            <button className="flex items-center justify-center gap-2 rounded-full h-12 w-36 bg-[#726185] hover:bg-[#685978] text-black font-semibold">
              <AddIcon />
              Add Playlist
            </button>
          </div>
        </div>

        <div className="w-11/12"></div>
        <div>
          <PlaylistPick {...playlists[0]} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
