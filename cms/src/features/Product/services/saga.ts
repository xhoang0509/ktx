import { put, delay, takeLatest } from "redux-saga/effects";
import { ProductActions } from "./slice";
import SysFetch from "@services/axios";
import { AppActions } from "@app/slice";
import { addToast } from "@heroui/react";
import qs from "qs";

export function* ProductSaga() {
  yield takeLatest(ProductActions.getCategories, getCategories);
  yield takeLatest(ProductActions.getProducts, getProducts);
  yield takeLatest(ProductActions.addProduct, addProduct);
  yield takeLatest(ProductActions.editProduct, editProduct);
  yield takeLatest(ProductActions.deleteProduct, deleteProduct);
  yield takeLatest(ProductActions.getDetailProduct, getDetailProduct);
}

export function* getCategories({ payload: { onSuccess } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(`/category`);
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      yield put(ProductActions.setCategories(rs.data));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getProducts({
  payload: { onSuccess, pagination, search },
}: any) {
  const body = { ...pagination, search };
  try {
    yield put(AppActions.setIsLoading(true));

    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(
      `/product/?${qs.stringify(body)}`
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      yield put(ProductActions.setProducts(rs.data.data));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* addProduct({ payload: { onSuccess, body } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.post(`/product`, body);
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      addToast({
        title: "Thông báo",
        description: "Thêm mới sản phẩm thành công",
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

export function* editProduct({ payload: { onSuccess, body, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.put(`/product/${id}`, body);
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      addToast({
        title: "Sửa sản phẩm thành công",
        description: "Sản phẩm đã được cập nhật",
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

export function* deleteProduct({ payload: { onSuccess, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.delete(`/product/${id}`);
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      addToast({
        title: "Xoá sản phẩm thành công",
        description: "Sản phẩm đã được xoá",
        color: "success",
      });
      yield put(ProductActions.getProducts({}));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getDetailProduct({ payload: { onSuccess, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(`/product/${id}`);
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}
