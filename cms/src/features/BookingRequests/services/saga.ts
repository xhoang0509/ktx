import { AppActions } from "@app/slice";
import SysFetch from "@services/axios";
import { delay, put, takeLatest } from "redux-saga/effects";
import { BookingRequestActions } from "./slice";
import qs from "qs";
import { addToast } from "@heroui/react";

export function* BookingRequestSaga() {
    yield takeLatest(BookingRequestActions.getBookingRequests, getBookingRequests);
    yield takeLatest(BookingRequestActions.getBookingRequestDetail, getBookingRequestDetail);
    yield takeLatest(BookingRequestActions.approveBookingRequest, approveBookingRequest);
    yield takeLatest(BookingRequestActions.rejectBookingRequest, rejectBookingRequest);
    yield takeLatest(BookingRequestActions.editRequest, editRequest);
}

export function* getBookingRequests({ payload: { onSuccess, data } }: any) {
    try {
        const params: any = {};
        if (data?.status) {
            params.status = data.status;
        }
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(
            `/contract/list-admin?${qs.stringify(params)}`
        );
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

export function* approveBookingRequest({ payload: { id, active, onSuccess } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.post(`/contract/${id}/approve`, { active });
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Thông báo",
                description: "Phê duyệt hợp đồng thành công",
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

export function* rejectBookingRequest({ payload: { id, onSuccess } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.post(`/contract/${id}/reject`);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Thông báo",
                description: "Từ chối hợp đồng thành công",
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

export function* editRequest({ payload: { onSuccess, id, body } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.put(`/contract/${id}`, body);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Thông báo",
                description: "Cập nhật hợp đồng thành công",
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
