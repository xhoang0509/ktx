import { put, delay, takeLatest } from "redux-saga/effects";
import { OrderActions } from "./slice";
import SysFetch from "@services/axios";
import { AppActions } from "@app/slice";
import qs from "qs";
import { addToast, pagination } from "@heroui/react";
import { defaultPagination } from "./const";

export function* OrderSaga() {
  yield takeLatest(OrderActions.getOrders, getOrders);
  yield takeLatest(OrderActions.updateStatusOrder, updateStatusOrder);
  yield takeLatest(OrderActions.getDetailOrder, getDetailOrder);
}

export function* getOrders({ payload: { onSuccess, pagination } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(
      `/order/admin?${qs.stringify(pagination)}`
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      yield put(OrderActions.setOrders(rs.data.data));
      onSuccess?.(rs.data);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* updateStatusOrder({
  payload: { onSuccess, orderId, status },
}: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.patch(
      `/order/${orderId}/status`,
      { status }
    );

    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      addToast({
        title: "Cập nhật trạng thái thiết bị thành công",
        description: `Thiết bị đã được chuyển sang trạng thái ${status}`,
        color: "success",
      });
      onSuccess?.();
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getDetailOrder({ payload: { onSuccess, orderId } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(`/order/${orderId}`);

    yield put(AppActions.setIsLoading(false));
    if (rs.status === 200) {
      onSuccess?.(rs.data);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}
