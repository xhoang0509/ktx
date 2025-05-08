import { put, delay, takeLatest } from "redux-saga/effects";
import { UserActions } from "./slice";
import SysFetch from "@services/axios";
import { AppActions } from "@app/slice";
import qs from "qs";

export function* UserSaga() {
  yield takeLatest(UserActions.getUsers, getUsers);
  yield takeLatest(UserActions.getDetailUser, getDetailUser);
}

export function* getUsers({ payload: { onSuccess, pagination, search } }: any) {
  const body = { ...pagination, search };
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: { [x: string]: any } = yield SysFetch.get(`/user?${qs.stringify(body)}`);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200&& rs.data) {
      const {users, page, total, limit} = rs.data;
      yield put(UserActions.setData({users, page, total, limit}));
      onSuccess?.(rs.data);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}


// give me function getUser by id
export function* getDetailUser({ payload: { id, onSuccess } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: { [x: string]: any } = yield SysFetch.get(`/user/detail?id=${id}`);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      onSuccess?.(rs.data);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}