import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NewRelease from "../components/NewRelease";
import RightSideNav from "../components/RightSideNav";
import SongsList from "../components/SongsList";
import PlaylistList from "../components/PlaylistList";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchNewPlaylistsRequest } from "../store/slice/playlistSlice";
import { RootState, AppDispatch } from "../store";

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

interface Playlist {
  name: string;
  description: string;
  songsCount: number;
}

const DashboardPage = () => {
  const dispatch = useDispatch();
  const newPlaylists = useSelector(
    (state: RootState) => state.playlist.newPlaylists
  );
  const loading = useSelector((state: RootState) => state.playlist.loading);
  const error = useSelector((state: RootState) => state.playlist.error);
  useEffect(() => {
    const userId = "someUserId"; // Replace with actual user ID
    dispatch(fetchNewPlaylistsRequest(userId));
    console.log("hello");
  }, [dispatch]);
  const [songList, setSongList] = useState<Song[]>([
    {
      id: "1",
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "Divide",
      genre: "Pop",
      releaseDate: new Date("2017-01-06"),
      duration: 233,
      user: "60d21b4667d0d8992e610c85",
      fav: true,
    },
    {
      id: "2",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      genre: "Synthwave",
      releaseDate: new Date("2019-11-29"),
      duration: 200,
      user: "60d21b4667d0d8992e610c86",
      fav: true,
    },
    {
      id: "3",
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      genre: "Disco-pop",
      releaseDate: new Date("2020-03-27"),
      duration: 203,
      user: "60d21b4667d0d8992e610c87",
      fav: false,
    },
  ]);
  const [playlist, setPlaylist] = useState<Playlist[]>([
    {
      name: "Chill Vibes",
      description: "A collection of relaxing and chill songs.",
      songsCount: 2,
    },
    {
      name: "Workout Hits",
      description: "Energetic tracks to boost your workout sessions.",
      songsCount: 2,
    },
    {
      name: "Classical Essentials",
      description: "Timeless classical music for focus and relaxation.",
      songsCount: 2,
    },
    {
      name: "Summer Hits",
      description: "Top summer tracks to enjoy the sunny season.",
      songsCount: 2,
    },
  ]);

  const handleSearch = (text: string) => {
    console.log(text);
  };
  return (
    <div>
      <div className="flex">
        <div className="flex-grow p-4">
          <NewRelease {...songList[0]} />

          <SongsList songs={songList} />
        </div>
        <div>
          <div className="flex justify-end mr-10 mt-3">
            <UserButton />
          </div>
          <div className="divide-y">
            <div className="flex gap-4 mb-5 mt-4">
              <div className="rounded-full w-60 h-9 border-2 border-tableOdd">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="rounded-full">
                <button className="flex items-center justify-center gap-2 rounded-full h-9 w-32 bg-[#726185] hover:bg-[#685978] text-black font-semibold  text-sm">
                  <AddIcon />
                  Add music
                </button>
              </div>
            </div>
            <div className="w-11/12">
              <RightSideNav />
            </div>
            <div>
              <PlaylistList playlist={playlist} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
