import { put, delay, takeLatest } from "redux-saga/effects";
import { StatisticActions } from "./slice";
import SysFetch from "@services/axios";
import { AppActions } from "@app/slice";
import qs from "qs";

export function* StatisticSaga() {
  yield takeLatest(StatisticActions.getImportStatistic, getImportStatistic);
  yield takeLatest(StatisticActions.getOrderStatistic, getOrderStatistic);
  yield takeLatest(StatisticActions.getProductStatistic, getProductStatistic);
  yield takeLatest(StatisticActions.getRevenueStatistic, getRevenueStatistic);
  yield takeLatest(StatisticActions.getUserStatistic, getUserStatistic);
  yield takeLatest(StatisticActions.getBestSeller, getBestSeller);
}

export function* getImportStatistic({ payload: { onSuccess, query } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));

    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(
      `/statistical/product-statistics?${qs.stringify(query)}`
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      yield put(StatisticActions.setImportStatistic(rs.data));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getOrderStatistic({ payload: { onSuccess, query } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));

    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(
      `/statistical/status-order-statistics?${qs.stringify(query)}`
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      yield put(StatisticActions.setOrderStatistic(rs.data));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getProductStatistic({ payload: { onSuccess, query } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));

    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(
      `/statistical/total-product-statistics?${qs.stringify(query)}`
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      yield put(StatisticActions.setProductStatistic(rs.data));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getRevenueStatistic({ payload: { onSuccess, query } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));

    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(
      `/statistical/revenue-statistics?${qs.stringify(query)}`
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      yield put(StatisticActions.setRevenueStatistic(rs.data));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getUserStatistic({ payload: { onSuccess, query } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));

    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(
      `/statistical/user-statistics?${qs.stringify(query)}`
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      yield put(StatisticActions.setUserStatistic(rs.data));
      // onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* getBestSeller({ payload: { onSuccess } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));

    yield delay(50);

    const rs: { [x: string]: any } = yield SysFetch.get(
      `/product/best-sellers?${qs.stringify({ limit: 10 })}`
    );
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      yield put(StatisticActions.setBestSeller(rs.data));
      onSuccess?.(rs.data);
    } else {
      throw new Error(rs.message);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}
