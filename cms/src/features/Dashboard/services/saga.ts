import { put, delay, takeLatest } from "redux-saga/effects";
import { StatisticActions } from "./slice";
import SysFetch from "@services/axios";
import { AppActions } from "@app/slice";
import qs from "qs";

export function* StatisticSaga() {
    yield takeLatest(StatisticActions.getUserStatistic, getUserStatistic);
    yield takeLatest(StatisticActions.getRoomStatistic, getRoomStatistic);
    yield takeLatest(StatisticActions.getDevice, getDevice);
    // yield takeLatest(StatisticActions.getOrderStatistic, getOrderStatistic);
    // yield takeLatest(StatisticActions.getProductStatistic, getProductStatistic);
    // yield takeLatest(StatisticActions.getRevenueStatistic, getRevenueStatistic);
    // yield takeLatest(StatisticActions.getBestSeller, getBestSeller);
}

export function* getRoomStatistic({ payload: { onSuccess, query } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));

        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(
            `/analytic/room?${qs.stringify(query)}`
        );
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            yield put(StatisticActions.setRoomStatistic(rs.data));
            onSuccess?.(rs.data);
        } else {
            throw new Error(rs.message);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}

export function* getDevice({ payload: { onSuccess, query } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));

        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(
            `/analytic/device?${qs.stringify(query)}`
        );
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            yield put(StatisticActions.setDevice(rs.data));
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
            `/analytic/user?${qs.stringify(query)}`
        );
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            yield put(StatisticActions.setUserStatistic(rs.data));
            onSuccess?.(rs.data);
        } else {
            throw new Error(rs.message);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}
