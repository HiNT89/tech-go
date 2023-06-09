import { all, takeEvery } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    // takeEvery(DELETE_SONG, handleDeleteSong),
    // takeEvery(POST_SONG, handlePostSong),
  ]);
}
