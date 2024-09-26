import { call, put, takeEvery, fork } from "redux-saga/effects";
import {
  fetchSongRequest,
  fetchSongSuccess,
  fetchSongFailure,
  fetchAlbumSuccess,
  fetchAlbumRequest,
  fetchAlbumFailure,
  fetchArtistRequest,
  fetchArtistFailure,
  fetchArtistSuccess,
} from "../store/slice/songSlice"; // Adjust the path accordingly

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

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const fetchSongApi = async (userId: string): Promise<Song[]> => {
  // console.log("Fetching songs from:", `${backendUrl}/user/getSongs/${userId}`);
  const response = await fetch(`${backendUrl}/user/getSongs/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Songs");
  }
  const data = await response.json();
  console.log(data);
  const songs: Song[] = data.song;
  return songs;
};

// Fetch all Songs saga
function* fetchSongsSaga(action: { type: string; payload: string }) {
  // console.log("Action received in saga:", action.type);
  try {
    const songs: Song[] = yield call(fetchSongApi, action.payload);
    yield put(fetchSongSuccess(songs));
  } catch (error) {
    yield put(fetchSongFailure((error as Error).message));
  }
}
// Fetch all Songs saga
function* fetchAlbumsSaga(action: { type: string; payload: string }) {
  // console.log("Action received in saga:", action.type);
  try {
    const albums: Albums[] = yield call(fetchAlbumApi, action.payload);
    yield put(fetchAlbumSuccess(albums));
  } catch (error) {
    yield put(fetchAlbumFailure((error as Error).message));
  }
}

const fetchAlbumApi = async (userId: string): Promise<Albums[]> => {
  // console.log("Fetching songs from:", `${backendUrl}/user/getSongs/${userId}`);
  const response = await fetch(`${backendUrl}/user/getAlbums/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Songs");
  }
  const data = await response.json();
  console.log(data);
  const albums: Albums[] = data.song;
  return albums;
};
function* fetchArtistsSaga(action: { type: string; payload: string }) {
  // console.log("Action received in saga:", action.type);
  try {
    const artist: Artist[] = yield call(fetchArtistApi, action.payload);
    yield put(fetchArtistSuccess(artist));
  } catch (error) {
    yield put(fetchArtistFailure((error as Error).message));
  }
}

const fetchArtistApi = async (userId: string): Promise<Artist[]> => {
  // console.log("Fetching songs from:", `${backendUrl}/user/getSongs/${userId}`);
  const response = await fetch(`${backendUrl}/user/getAlbums/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Songs");
  }
  const data = await response.json();
  console.log(data);
  const artist: Artist[] = data.artist;
  return artist;
};
// Watcher saga
export function* watchFetchSongs() {
  // console.log("Watcher for fetchSongRequest is running");
  yield takeEvery(fetchSongRequest.type, fetchSongsSaga);
}

export function* watchFetchAlbums() {
  yield takeEvery(fetchAlbumRequest.type, fetchAlbumsSaga);
}

export function* watchFetchArtists() {
  yield takeEvery(fetchArtistRequest.type, fetchArtistsSaga);
}
