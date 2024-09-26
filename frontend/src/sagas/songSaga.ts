import { call, put, takeEvery, fork } from "redux-saga/effects";
import {
  fetchSongRequest,
  fetchSongSuccess,
  fetchSongFailure,
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

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const fetchSongApi = async (userId: string): Promise<Song[]> => {
  console.log("Fetching songs from:", `${backendUrl}/user/getSongs/${userId}`);
  const response = await fetch(`${backendUrl}/user/getSongs/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Songs");
  }
  const data = await response.json();
  console.log(data);
  return data;
};

// Fetch all Songs saga
function* fetchSongsSaga(action: { type: string; payload: string }) {
  console.log("Action received in saga:", action.type);
  try {
    const songs: Song[] = yield call(fetchSongApi, action.payload);
    yield put(fetchSongSuccess(songs));
  } catch (error) {
    yield put(fetchSongFailure((error as Error).message));
  }
}

// Watcher saga
export function* watchFetchSongs() {
  console.log("Watcher for fetchSongRequest is running");
  yield takeEvery(fetchSongRequest.type, fetchSongsSaga);
}
