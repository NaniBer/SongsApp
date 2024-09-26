// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/slice/userSlice";
import createSagaMiddleware from "redux-saga";
import playlistReducer from "./store/slice/playlistSlice";
import songReducer from "./store/slice/songSlice";
import { rootSaga } from "./store/saga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    user: userReducer,
    playlist: playlistReducer,
    song: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
