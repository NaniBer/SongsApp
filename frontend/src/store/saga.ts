// store/sagas.ts

import { all, fork } from "redux-saga/effects";
import { watchFetchSongs } from "../sagas/songSaga"; // Adjust the path accordingly
import { watchFetchPlaylists } from "../sagas/playlistSaga"; // Assuming you have a similar watcher

// Root saga
export function* rootSaga() {
  yield all([
    // fork(watchFetchSongs), // Watcher for songs
    fork(watchFetchPlaylists), // Watcher for playlists
  ]);
}
