import { put, delay, takeLatest } from "redux-saga/effects";
import { CategoryActions } from "./slice";
import SysFetch from "@services/axios";
import { AppActions } from "@app/slice";
import { addToast } from "@heroui/react";

export function* CategorySaga() {
  yield takeLatest(CategoryActions.getCategories, getCategories);
  yield takeLatest(CategoryActions.addCategory, addCategory);
  yield takeLatest(CategoryActions.editCategory, editCategory);
  yield takeLatest(CategoryActions.deleteCategory, deleteCategory);
  yield takeLatest(CategoryActions.getDetailCategory, getDetailCategory);
}

export function* getCategories({ payload: { onSuccess } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(`/category`);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      yield put(CategoryActions.setCategories(rs.data));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* addCategory({ payload: { onSuccess, body } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.post(`/category`, body);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 201) {
      addToast({
        title: "Thông báo",
        description: "Thêm mới danh mục thành công",
        color: "success",
      });
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* editCategory({ payload: { onSuccess, body, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.put(
      `/category/${id}`,
      body
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      addToast({
        title: "Sửa danh mục thành công",
        description: "Danh mục đã được cập nhật",
        color: "success",
      });
      yield put(CategoryActions.getCategories({}));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* deleteCategory({ payload: { onSuccess, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.delete(`/category/${id}`);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      addToast({
        title: "Xoá danh mục thành công",
        description: "Danh mục đã được xoá",
        color: "success",
      });
      yield put(CategoryActions.getCategories({}));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getDetailCategory({ payload: { onSuccess, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(`/category/${id}`);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}
