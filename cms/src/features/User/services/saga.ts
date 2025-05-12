import { put, delay, takeLatest } from "redux-saga/effects";
import { UserActions } from "./slice";
import SysFetch from "@services/axios";
import { AppActions } from "@app/slice";
import qs from "qs";
import { addToast } from "@heroui/react";

export function* UserSaga() {
  yield takeLatest(UserActions.getUsers, getUsers);
  yield takeLatest(UserActions.getDetailUser, getDetailUser);
  yield takeLatest(UserActions.editUser, editUser);
}

export function* getUsers({ payload: { onSuccess, pagination, search } }: any) {
  const body = { ...pagination, search };
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: { [x: string]: any } = yield SysFetch.get(`/user?${qs.stringify(body)}`);
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200&& rs.data) {
      const {users, page, total, limit} = rs.data;
      yield put(UserActions.setData({users, page, total, limit}));
      onSuccess?.(rs.data);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}


export function* getDetailUser({ payload: { id, onSuccess } }: any) {
  console.log({id, onSuccess})
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: { [x: string]: any } = yield SysFetch.get(`/user/${id}`);
    console.log(`/user/${id}`)
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      onSuccess?.(rs.data);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* editUser({ payload: { id, data, onSuccess, onError } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: { [x: string]: any } = yield SysFetch.put(`/user/${id}`, data);
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      addToast({
        title: "Cập nhật thông tin người dùng thành công",
        description: "Thông tin người dùng đã được cập nhật",
        color: "success",
      });
      onSuccess?.(rs.data);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
    addToast({
      title: "Cập nhật thông tin người dùng thất bại",
      description: "Vui lòng thử lại sau",
      color: "danger",
    });
    onError?.(error);
  }
}