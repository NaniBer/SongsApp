import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
interface PlaylistState {
  playlists: Playlist[];
  newPlaylists: NewPlaylist[];
  loading: boolean;
  error: string | null;
}

const initialState: PlaylistState = {
  playlists: [],
  newPlaylists: [],
  loading: false,
  error: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    fetchPlaylistsRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchPlaylistsSuccess(state, action: PayloadAction<Playlist[]>) {
      state.loading = false;
      state.playlists = action.payload;
    },
    fetchPlaylistsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchNewPlaylistsRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchNewPlaylistsSuccess(state, action: PayloadAction<NewPlaylist[]>) {
      state.loading = false;
      state.newPlaylists = action.payload;
    },
    fetchNewPlaylistsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPlaylistsRequest,
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  fetchNewPlaylistsRequest,
  fetchNewPlaylistsSuccess,
  fetchNewPlaylistsFailure,
} = playlistSlice.actions;

export default playlistSlice.reducer;
