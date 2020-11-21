import { takeLatest } from "redux-saga/effects";

import axiosMiddleware from "../middlewares/axios.middleware";
import ActionTypes from "../actionTypes";

export default function* profileSaga() {
  yield takeLatest(ActionTypes.LOAD_PROFILE, axiosMiddleware);
  yield takeLatest(ActionTypes.UPDATE_PROFILE, axiosMiddleware);
}
