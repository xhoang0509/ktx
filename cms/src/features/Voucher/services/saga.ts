import { put, delay, takeLatest } from "redux-saga/effects";
import { VoucherActions } from "./slice";
import SysFetch from "@services/axios";
import { AppActions } from "@app/slice";
import { addToast } from "@heroui/react";
import qs from "qs";

export function* VoucherSaga() {
  yield takeLatest(VoucherActions.getVouchers, getVouchers);
  yield takeLatest(VoucherActions.addVoucher, addVoucher);
  yield takeLatest(VoucherActions.editVoucher, editVoucher);
  yield takeLatest(VoucherActions.deleteVoucher, deleteVoucher);
  yield takeLatest(VoucherActions.getDetailVoucher, getDetailVoucher);
}

export function* getVouchers({
  payload: { onSuccess, pagination, search },
}: any) {
  const body = { ...pagination, search };
  try {
    yield put(AppActions.setIsLoading(true));

    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(
      `/voucher/?${qs.stringify(body)}`
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      yield put(VoucherActions.setVouchers(rs.data.data));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* addVoucher({ payload: { onSuccess, body } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.post(`/voucher`, body);
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

export function* editVoucher({ payload: { onSuccess, body, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.put(`/voucher/${id}`, body);
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

export function* deleteVoucher({ payload: { onSuccess, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.delete(`/voucher/${id}`);
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      addToast({
        title: "Xoá sản phẩm thành công",
        description: "Sản phẩm đã được xoá",
        color: "success",
      });
      yield put(VoucherActions.getVouchers({}));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getDetailVoucher({ payload: { onSuccess, id } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(`/voucher/${id}`);
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
