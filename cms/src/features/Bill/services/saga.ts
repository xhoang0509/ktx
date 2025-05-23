import { AppActions } from "@app/slice";
import { addToast } from "@heroui/react";
import SysFetch from "@services/axios";
import qs from "qs";
import { delay, put, takeLatest } from "redux-saga/effects";
import { BillActions } from "./slice";

export function* BillSaga() {
    yield takeLatest(BillActions.getBills, getBills);
    yield takeLatest(BillActions.getBillDetail, getBillDetail);
    // yield takeLatest(BillActions.addBill, addBill);
    // yield takeLatest(BillActions.editBill, editBill);
    // yield takeLatest(BillActions.deleteBill, deleteBill);
}

export function* getBills({ payload: { onSuccess, pagination, search } }: any) {
    const body = { ...pagination, search };
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(`/bill?${qs.stringify(body)}`);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            yield put(BillActions.setBills(rs.data.bills));
            onSuccess?.(rs.data);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}

export function* getBillDetail({ payload: { onSuccess, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(`/bill/${id}`);

        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            onSuccess?.(rs.data);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}

export function* addDevice({ payload: { onSuccess, body } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.post(`/device`, body);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Thông báo",
                description: "Thêm mới thiết bị thành công",
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

export function* editDevice({ payload: { onSuccess, body, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.put(`/device/${id}`, body);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Sửa thiết bị thành công",
                description: "Thiết bị đã được cập nhật",
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

export function* deleteDevice({ payload: { onSuccess, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);
        const rs: { [x: string]: any } = yield SysFetch.delete(`/device/${id}`);
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

