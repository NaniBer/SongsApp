import React, { useState } from "react";
import NewRelease from "./NewRelease";
import RightSideNav from "./RightSideNav";

// Define the TypeScript type for a song
interface Song {
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  releaseDate?: Date;
  duration?: number;
  user?: string; // Assuming user ID is a string
}

const SongList = () => {
  // Initialize the state with an array of song objects
  const [songList, setSongList] = useState<Song[]>([
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "Divide",
      genre: "Pop",
      releaseDate: new Date("2017-01-06"),
      duration: 233,
      user: "60d21b4667d0d8992e610c85",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      genre: "Synthwave",
      releaseDate: new Date("2019-11-29"),
      duration: 200,
      user: "60d21b4667d0d8992e610c86",
    },
    {
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      genre: "Disco-pop",
      releaseDate: new Date("2020-03-27"),
      duration: 203,
      user: "60d21b4667d0d8992e610c87",
    },
  ]);

  return (
    <div>
      <p>List of music</p>
      <div className="flex">
        <div className="flex-grow p-4">
          <NewRelease {...songList[0]} />
        </div>
        <div className="w-1/4 p-4">
          <RightSideNav />
        </div>
      </div>
      <ul>
        {songList.map((song, index) => (
          <li key={index}>
            <div>
              {song.title} <br />
              {song.artist} <br />
            </div>
            <strong>Album:</strong> {song.album || "N/A"} <br />
            <strong>Genre:</strong> {song.genre || "N/A"} <br />
            <strong>Release Date:</strong>{" "}
            {song.releaseDate?.toLocaleDateString() || "N/A"} <br />
            <strong>Duration:</strong>{" "}
            {song.duration ? `${song.duration} seconds` : "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
