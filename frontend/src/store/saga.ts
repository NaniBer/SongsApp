// store/sagas.ts

import { all, fork } from "redux-saga/effects";
import {
  watchFetchAlbums,
  watchFetchArtists,
  watchFetchSongs,
} from "../sagas/songSaga"; // Adjust the path accordingly
import {
  watchFetchNewPlaylists,
  watchFetchPlaylists,
} from "../sagas/playlistSaga"; // Assuming you have a similar watcher

// Root saga
export function* rootSaga() {
  yield all([
    fork(watchFetchSongs), // Watcher for songs
    fork(watchFetchNewPlaylists), // Watcher for playlists
    fork(watchFetchPlaylists),
    fork(watchFetchAlbums),
    fork(watchFetchArtists),
  ]);
}
