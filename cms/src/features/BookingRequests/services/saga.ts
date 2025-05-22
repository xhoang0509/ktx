import { AppActions } from "@app/slice";
import SysFetch from "@services/axios";
import { delay, put, takeLatest } from "redux-saga/effects";
import { BookingRequestActions } from "./slice";

export function* BookingRequestSaga() {
    yield takeLatest(BookingRequestActions.getBookingRequests, getBookingRequests);
    yield takeLatest(BookingRequestActions.getBookingRequestDetail, getBookingRequestDetail);
    yield takeLatest(BookingRequestActions.approveBookingRequest, approveBookingRequest);
    yield takeLatest(BookingRequestActions.rejectBookingRequest, rejectBookingRequest);
}

export function* getBookingRequests({ payload: { onSuccess } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(`/contract`);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            yield put(BookingRequestActions.setBookingRequests(rs.data));
            onSuccess?.(rs.data);
        } else {
            throw new Error(rs.message);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}

export function* getBookingRequestDetail({ payload: { onSuccess, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(`/contract/${id}`);
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

export function* approveBookingRequest({ payload: { onSuccess, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.post(`/contract/${id}/approve`);
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

export function* rejectBookingRequest({ payload: { onSuccess, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.post(`/contract/${id}/reject`);
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
