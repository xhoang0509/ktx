import { put, delay, takeLatest } from "redux-saga/effects";
import { BlogActions } from "./slice";
import SysFetch from "@services/axios";
import { AppActions } from "@app/slice";
import { addToast } from "@heroui/react";
import qs from "qs";

export function* BlogSaga() {
  yield takeLatest(BlogActions.getBlogs, getBlogs);
  yield takeLatest(BlogActions.addBlog, addBlog);
  yield takeLatest(BlogActions.editBlog, editBlog);
  yield takeLatest(BlogActions.deleteBlog, deleteBlog);
  yield takeLatest(BlogActions.getDetailBlog, getDetailBlog);
}

export function* getBlogs({ payload: { onSuccess, pagination, search } }: any) {
  const body = { ...pagination, search };
  try {
    yield put(AppActions.setIsLoading(true));

    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(
      `/blog/?${qs.stringify(body)}`
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      yield put(BlogActions.setBlogs(rs.data.data));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* addBlog({ payload: { onSuccess, body } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.post(`/blog`, body);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 201) {
      addToast({
        title: "Thông báo",
        description: "Thêm mới bài viết thành công",
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

export function* editBlog({ payload: { onSuccess, body, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.patch(`/blog/${id}`, body);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      addToast({
        title: "Sửa bài viết thành công",
        description: "Bài viết đã được cập nhật",
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

export function* deleteBlog({ payload: { onSuccess, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.delete(`/blog/${id}`);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      addToast({
        title: "Xoá bài viết thành công",
        description: "Bài viết đã được xoá",
        color: "success",
      });
      yield put(BlogActions.getBlogs({}));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getDetailBlog({ payload: { onSuccess, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(`/blog/${id}`);
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
