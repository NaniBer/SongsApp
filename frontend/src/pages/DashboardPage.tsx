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
import { fetchSongRequest, setNewReleasedSong } from "../store/slice/songSlice";

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
  description?: string;
  songs: string[];
  user: string;
  genre: string[]; // Updated to be an array of genres
  createdAt: Date;
  updatedAt: Date;
}
interface NewPlaylist {
  name: string;
  description: string;
  songsCount: number;
}

const DashboardPage = () => {
  const dispatch = useDispatch();
  const newPlaylists = useSelector(
    (state: RootState) => state.playlist.newPlaylists
  );
  const songs = useSelector((state: RootState) => state.song.songs);
  const newReleasedSong = useSelector(
    (state: RootState) => state.song.newRelasedSong
  );
  const loading = useSelector((state: RootState) => state.playlist.loading);
  const error = useSelector((state: RootState) => state.playlist.error);
  const { user } = useUser();
  const clerkId = user?.id;
  useEffect(() => {
    if (clerkId) {
      dispatch(fetchNewPlaylistsRequest(clerkId));
      dispatch(fetchSongRequest(clerkId));
      if (songs.length > 0) {
        dispatch(setNewReleasedSong());
      }
    }
  }, [dispatch, clerkId]);
  // useEffect(() => {
  //   if (songs) {
  //     console.log("Fetched songs:", songs); // Check the playlists here
  //   }
  //   if (newPlaylists) {
  //     console.log("Fetched playlists:", newPlaylists); // Check the playlists here
  //   }
  // }, [songs, newPlaylists]);

  const handleSearch = (text: string) => {
    console.log(text);
  };
  return (
    <div>
      <div className="flex">
        <div className="flex-grow p-4 pr-2">
          {newReleasedSong && <NewRelease />}
          <SongsList songs={songs} />
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
              <PlaylistList playlist={newPlaylists} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
