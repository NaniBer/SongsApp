import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import {
  fetchPlaylistsRequest,
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  fetchNewPlaylistsRequest,
  fetchNewPlaylistsSuccess,
  fetchNewPlaylistsFailure,
} from "../store/slice/playlistSlice";

interface Playlist {
  id: string;
  name: string;
}

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Fetch all playlists API call
const fetchPlaylistsApi = async (userId: string): Promise<Playlist[]> => {
  const response = await fetch(`${backendUrl}/playlist/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }
  return response.json();
};

// Fetch new playlists API call
const fetchNewPlaylistsApi = async (userId: string): Promise<Playlist[]> => {
  const response = await fetch(`${backendUrl}/playlist/getNew/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch new playlists");
  }
  return response.json();
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
    const playlists: Playlist[] = yield call(
      fetchNewPlaylistsApi,
      action.payload
    );
    yield put(fetchNewPlaylistsSuccess(playlists));
  } catch (error) {
    yield put(fetchNewPlaylistsFailure((error as Error).message));
  }
}

// Watcher sagas
function* watchFetchPlaylists() {
  yield takeEvery(fetchPlaylistsRequest.type, fetchPlaylistsSaga);
}

function* watchFetchNewPlaylists() {
  yield takeEvery(fetchNewPlaylistsRequest.type, fetchNewPlaylistsSaga);
}

// Root saga
export function* rootSaga() {
  yield all([
    fork(watchFetchPlaylists),
    fork(watchFetchNewPlaylists),
    // Add other sagas here
  ]);
}
