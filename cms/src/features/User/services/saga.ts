import { put, delay, takeLatest } from "redux-saga/effects";
import { UserActions } from "./slice";
import SysFetch from "@services/axios";
import { AppActions } from "@app/slice";

export function* UserSaga() {
  yield takeLatest(UserActions.getUsers, getUsers);
}

export function* getUsers({ payload: { onSuccess } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: { [x: string]: any } = yield SysFetch.get(`/user`);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      yield put(UserActions.setUsers(rs.data));
      onSuccess?.(rs.data);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}
