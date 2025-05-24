import { AppActions } from "@app/slice";
import { addToast } from "@heroui/react";
import SysFetch from "@services/axios";
import qs from "qs";
import { delay, put, takeLatest } from "redux-saga/effects";
import { BillActions } from "./slice";

export function* BillSaga() {
    yield takeLatest(BillActions.getBills, getBills);
    yield takeLatest(BillActions.getBillDetail, getBillDetail);
    yield takeLatest(BillActions.addBill, addBill);
    yield takeLatest(BillActions.editBill, editBill);
    yield takeLatest(BillActions.deleteBill, deleteBill);
}

export function* getBills({ payload: { onSuccess, pagination, search } }: any) {
    const body = { ...pagination, search };
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(`/payment/admin-list?${qs.stringify(body)}`);
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

        const rs: { [x: string]: any } = yield SysFetch.get(`/payment/admin-bill/${id}`);

        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            onSuccess?.(rs.data);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}

export function* addBill({ payload: { onSuccess, body } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.post(`/payment/admin-bill`, body);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Thông báo",
                description: "Thêm mới hóa đơn thành công",
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

export function* editBill({ payload: { onSuccess, body, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.put(`/payment/admin-bill/${id}`, body);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Sửa hóa đơn thành công",
                description: "Hóa đơn đã được cập nhật",
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

export function* deleteBill({ payload: { onSuccess, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);
        const rs: { [x: string]: any } = yield SysFetch.delete(`/payment/admin-bill/${id}`);
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

