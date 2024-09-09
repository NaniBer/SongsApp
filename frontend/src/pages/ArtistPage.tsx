import React, { useState, useEffect } from "react";
import PlaylistPick from "../components/PlaylistPick";
import SearchBar from "../components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import RandomPick from "../components/RandomPick";

// Define the TypeScript type for Playlist
interface Artist {
  name: string;
  totalSongs: number;
  genre: string[];
  albums: string[];
  totalDuration: string;
}

const ArtistPage: React.FC = () => {
  const [artist, setArtist] = useState<Artist[]>([]);

  const sampleArtist: Artist[] = [
    {
      name: "Ed Sheeran",
      totalSongs: 3,
      genre: ["Pop", "Folk-pop"],
      albums: ["Divide"],
      totalDuration: "N/A", // You can calculate totalDuration if needed
    },
    {
      name: "The Weeknd",
      totalSongs: 4,
      genre: ["R&B", "Synth-pop"],
      albums: ["After Hours"],
      totalDuration: "N/A", // You can calculate totalDuration if needed
    },
    {
      name: "Dua Lipa",
      totalSongs: 4,
      genre: ["Pop", "Disco"],
      albums: ["Future Nostalgia"],
      totalDuration: "N/A", // You can calculate totalDuration if needed
    },
    {
      name: "Taylor Swift",
      totalSongs: 4,
      genre: ["Indie folk", "Alternative"],
      albums: ["Folklore"],
      totalDuration: "N/A", // You can calculate totalDuration if needed
    },
    {
      name: "Drake",
      totalSongs: 4,
      genre: ["Hip-Hop", "R&B"],
      albums: ["Hotline Bling"],
      totalDuration: "N/A", // You can calculate totalDuration if needed
    },
  ];

  // Simulate fetching playlists data
  useEffect(() => {
    // Instead of fetching data, use sample data
    setArtist(sampleArtist);
  }, []);

  const handleSearch = (text: string) => {
    console.log(text);
  };

  return (
    <div className="flex h-full m-4 mt-8 ml-10">
      <div className="flex-grow h-full">
        <div className="m-2 h-full">
          <p className="font-semibold text-xl mb-8 text-gray-300">Artists</p>
          <div className="space-y-4 pl-2 w-full overflow-auto custom-scrollbar">
            {artist.map((artist, index) => (
              <div
                key={index}
                className="p-4 bg-bgColor rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-opacity-90"
              >
                <h3 className="font-bold text-white">{artist.name}</h3>
                <p className="text-gray-400 mt-1">
                  Total Songs: {artist.totalSongs}
                </p>
                <p className="text-gray-400">
                  Genres: {artist.genre.join(", ")}
                </p>
                <p className="text-gray-400">
                  Albums: {artist.albums.join(", ")}
                </p>
                <p className="text-gray-400">
                  Total Duration: {artist.totalDuration}
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
            <button className="flex items-center justify-center gap-2 rounded-full h-9 w-32 bg-[#726185] hover:bg-[#685978] text-black font-semibold text-sm">
              <AddIcon />
              Add Song
            </button>
          </div>
          <div className="rounded-full"></div>
        </div>
        <div className="w-11/12"></div>
        <div>
          <RandomPick artist={artist[0]} />
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
