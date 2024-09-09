import React, { useState, useEffect } from "react";
import PlaylistPick from "../components/PlaylistPick";
import SearchBar from "../components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import RandomPick from "../components/RandomPick";

// Define the TypeScript type for Playlist
interface Albums {
  name: string;
  artist?: string;
  songs: string[];
  user: string;
  releaseDate: Date;
  genre: string[];
}

const AlbumsPage: React.FC = () => {
  const [albums, setAlbums] = useState<Albums[]>([]);

  const sampleAlbums: Albums[] = [
    {
      name: "Divide",
      artist: "Ed Sheeran",
      songs: ["Shape of You", "Perfect", "Castle on the Hill"],
      genre: ["Pop", "Folk-pop"],
      releaseDate: new Date("2017-03-03"),
      user: "60d21b4667d0d8992e610c85",
    },
    {
      name: "After Hours",
      artist: "The Weeknd",
      songs: [
        "Blinding Lights",
        "Heartless",
        "Save Your Tears",
        "In Your Eyes",
      ],
      genre: ["R&B", "Synth-pop"],
      releaseDate: new Date("2020-03-20"),
      user: "60d21b4667d0d8992e610c86",
    },
    {
      name: "Future Nostalgia",
      artist: "Dua Lipa",
      songs: ["Levitating", "Don't Start Now", "Physical", "Break My Heart"],
      genre: ["Pop", "Disco"],
      releaseDate: new Date("2020-03-27"),
      user: "60d21b4667d0d8992e610c87",
    },
    {
      name: "Folklore",
      artist: "Taylor Swift",
      songs: ["Cardigan", "Exile", "The Last Great American Dynasty", "August"],
      genre: ["Indie folk", "Alternative"],
      releaseDate: new Date("2020-07-24"),
      user: "60d21b4667d0d8992e610c88",
    },
    {
      name: "Hotline Bling",
      artist: "Drake",
      songs: ["Hotline Bling", "One Dance", "God's Plan", "In My Feelings"],
      genre: ["Hip-Hop", "R&B"],
      releaseDate: new Date("2015-07-31"),
      user: "60d21b4667d0d8992e610c89",
    },
  ];

  // Simulate fetching playlists data
  useEffect(() => {
    // Instead of fetching data, use sample data
    setAlbums(sampleAlbums);
  }, []);

  const handleSearch = (text: string) => {
    console.log(text);
  };

  return (
    <div className="flex h-full m-4 mt-8 ml-10">
      <div className="flex-grow h-full">
        <div className="m-2 h-full">
          <p className="font-semibold text-xl mb-8 text-gray-300">Albums</p>
          <div className="space-y-4 pl-2 w-full overflow-auto custom-scrollbar">
            {albums.map((album, index) => (
              <div
                key={index}
                className="p-4 bg-bgColor rounded-lg shadow-lg hover:scale-105  transition-transform"
              >
                <h3 className="font-bold text-white">{album.name}</h3>
                {album.name && (
                  <p className="text-gray-300 mt-1">{album.artist}</p>
                )}
                <p className="text-gray-400 mt-1">
                  Songs: {album.songs.length}
                </p>
                <p className="text-gray-400 mt-1">
                  Genres: {album.genre.join(", ")}
                </p>{" "}
                <p className="text-gray-400 mt-1">
                  Created: {new Date(album.name).toLocaleDateString()}
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
        <div>
          <RandomPick album={albums[0]} />
        </div>
      </div>
    </div>
  );
};

export default AlbumsPage;
