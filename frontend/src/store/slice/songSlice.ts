import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    fetchSongRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchSongSuccess(state, action: PayloadAction<Song[]>) {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSongRequest, fetchSongSuccess, fetchSongFailure } =
  songSlice.actions;

export default songSlice.reducer;
