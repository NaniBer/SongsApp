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

interface Albums {
  name: string;
  artist?: string;
  songs: string[];
  user: string;
  releaseDate: Date;
  genre: string[];
}
interface Artist {
  name: string;
  totalSongs: number;
  genre: string[];
  albums: string[];
  totalDuration: string;
}

interface SongState {
  songs: Song[];
  newRelasedSong: Song | null;
  albums: Albums[];
  artist: Artist[];
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  albums: [],
  artist: [],
  newRelasedSong: null,
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
    setNewReleasedSong(state) {
      const newRelease = state.songs.reduce((latestSong, currentSong) => {
        if (
          !latestSong ||
          (currentSong.releaseDate &&
            currentSong.releaseDate > latestSong.releaseDate!)
        ) {
          return currentSong;
        }
        return latestSong;
      }, null as Song | null);

      state.newRelasedSong = newRelease;
    },

    //Albums
    fetchAlbumRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchAlbumSuccess(state, action: PayloadAction<Albums[]>) {
      state.loading = false;
      state.albums = action.payload;
    },
    fetchAlbumFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    //Artists
    fetchArtistRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchArtistSuccess(state, action: PayloadAction<Artist[]>) {
      state.loading = false;
      state.artist = action.payload;
    },
    fetchArtistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongRequest,
  fetchSongSuccess,
  fetchSongFailure,
  setNewReleasedSong,
  fetchAlbumRequest,
  fetchAlbumSuccess,
  fetchAlbumFailure,
  fetchArtistRequest,
  fetchArtistSuccess,
  fetchArtistFailure,
} = songSlice.actions;

export default songSlice.reducer;
