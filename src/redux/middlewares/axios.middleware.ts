import { call, put } from "redux-saga/effects";

import { axiosHelper } from "helpers";

export default function* axiosMiddleware(action) {
  const { type, resolve, reject, ...params } = action;

  yield put({ type: `${type}_REQUESTING` });

  try {
    const { data } = yield call(axiosHelper, params);

    yield put({ type: `${type}_SUCCESS`, data });
    if (resolve) resolve(data);
  } catch (error) {
    const data = error?.response?.data || error;

    yield put({ type: `${type}_FAILURE`, error: data });
    if (reject) reject(data);
  }
}
