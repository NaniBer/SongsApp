import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import {
  fetchPlaylistsRequest,
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  fetchNewPlaylistsRequest,
  fetchNewPlaylistsSuccess,
  fetchNewPlaylistsFailure,
} from "../store/slice/playlistSlice";

interface NewPlaylist {
  name: string;
  description: string;
  songsCount: number;
}

interface Playlist {
  name: string;
  description?: string;
  songs: string[];
  user: string;
  genre: string[];
  createdAt: Date;
  updatedAt: Date;
}
const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Fetch all playlists API call
const fetchPlaylistsApi = async (userId: string): Promise<Playlist[]> => {
  const response = await fetch(
    `${backendUrl}/playlist/getPlaylistsOfUser/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }
  const data = await response.json();

  const playlists = data.playlist.playlists.map((item: any) => ({
    ...item,
    genre: item.genres.map((g: any) => g.name),
  }));
  return playlists;
};

// Fetch new playlists API call
const fetchNewPlaylistsApi = async (
  clerkId: string
): Promise<NewPlaylist[]> => {
  const response = await fetch(`${backendUrl}/playlist/getNew/${clerkId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch new playlists");
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  const newPlaylists: NewPlaylist[] = data.playlist.playlists.map(
    (item: any) => ({
      name: item.name,
      description: item.description,
      songsCount: item.songs ? item.songs.length : 0,
    })
  );
  return newPlaylists;
};

// Fetch all playlists saga
function* fetchPlaylistsSaga(action: { type: string; payload: string }) {
  try {
    const playlists: Playlist[] = yield call(fetchPlaylistsApi, action.payload);
    yield put(fetchPlaylistsSuccess(playlists));
  } catch (error) {
    yield put(fetchPlaylistsFailure((error as Error).message));
  }
}

// Fetch new playlists saga
function* fetchNewPlaylistsSaga(action: { type: string; payload: string }) {
  try {
    const playlists: NewPlaylist[] = yield call(
      fetchNewPlaylistsApi,
      action.payload
    );
    yield put(fetchNewPlaylistsSuccess(playlists));
  } catch (error) {
    yield put(fetchNewPlaylistsFailure((error as Error).message));
  }
}

// Watcher sagas
export function* watchFetchPlaylists() {
  console.log("watchFetchPlaylist");
  yield takeEvery(fetchPlaylistsRequest.type, fetchPlaylistsSaga);
}

export function* watchFetchNewPlaylists() {
  yield takeEvery(fetchNewPlaylistsRequest.type, fetchNewPlaylistsSaga);
}
