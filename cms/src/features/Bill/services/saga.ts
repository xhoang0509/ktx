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
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(`/payment/admin-list?${qs.stringify(body)}`);
        
        if (rs.status === 200) {
            yield put(BillActions.setBills(rs.data.bills));
            onSuccess?.(rs.data);
        }
    } catch (error: any) {
        yield put(BillActions.addBillFailure(error.message || "Có lỗi xảy ra khi tải danh sách hóa đơn"));
    }
}

export function* getBillDetail({ payload: { onSuccess, id } }: any) {
    try {
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(`/payment/admin-bill/${id}`);

        if (rs.status === 200) {
            yield put(BillActions.setBillDetail(rs.data));
            onSuccess?.(rs.data);
        }
    } catch (error: any) {
        yield put(BillActions.addBillFailure(error.message || "Có lỗi xảy ra khi tải chi tiết hóa đơn"));
    }
}

export function* addBill({ payload: { onSuccess, body } }: any) {
    try {
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.post(`/payment/admin-bill`, body);
        
        if (rs.status === 200) {
            yield put(BillActions.addBillSuccess(rs.data));
            addToast({
                title: "Thông báo",
                description: "Thêm mới hóa đơn thành công",
                color: "success",
            });
            onSuccess?.(rs.data);
        } else {
            throw new Error(rs.message);
        }
    } catch (error: any) {
        yield put(BillActions.addBillFailure(error.message || "Có lỗi xảy ra khi thêm hóa đơn"));
        addToast({
            title: "Lỗi",
            description: error.message || "Có lỗi xảy ra khi thêm hóa đơn",
            color: "danger",
        });
    }
}

export function* editBill({ payload: { onSuccess, body, id } }: any) {
    try {
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.put(`/payment/admin-bill/${id}`, body);
        
        if (rs.status === 200) {
            yield put(BillActions.editBillSuccess(rs.data));
            addToast({
                title: "Thành công",
                description: "Cập nhật hóa đơn thành công",
                color: "success",
            });
            onSuccess?.(rs.data);
        } else {
            throw new Error(rs.message);
        }
    } catch (error: any) {
        yield put(BillActions.editBillFailure(error.message || "Có lỗi xảy ra khi cập nhật hóa đơn"));
        addToast({
            title: "Lỗi",
            description: error.message || "Có lỗi xảy ra khi cập nhật hóa đơn",
            color: "danger",
        });
    }
}

export function* deleteBill({ payload: { onSuccess, id } }: any) {
    try {
        yield delay(50);
        const rs: { [x: string]: any } = yield SysFetch.delete(`/payment/admin-bill/${id}`);
        
        if (rs.status === 200) {
            onSuccess?.(rs.data);
        } else {
            throw new Error(rs.message);
        }
    } catch (error: any) {
        yield put(BillActions.addBillFailure(error.message || "Có lỗi xảy ra khi xóa hóa đơn"));
    }
}

