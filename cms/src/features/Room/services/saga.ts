import { AppActions } from "@app/slice";
import { addToast } from "@heroui/react";
import SysFetch from "@services/axios";
import qs from "qs";
import { delay, put, takeLatest } from "redux-saga/effects";
import { RoomActions } from "./slice";

export function* RoomSaga() {
    yield takeLatest(RoomActions.getRooms, getRooms);
    yield takeLatest(RoomActions.getDetailRoom, getDetailRoom);
    yield takeLatest(RoomActions.addRoom, addRoom);
    yield takeLatest(RoomActions.editRoom, editRoom);
    yield takeLatest(RoomActions.deleteRoom, deleteRoom);
}

export function* addRoom({ payload: { onSuccess, body } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.post(`/room`, body);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Thông báo",
                description: "Thêm mới phòng thành công",
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

export function* getRooms({ payload: { onSuccess, pagination, search } }: any) {
    const body = { ...pagination, search };
    try {
        yield put(AppActions.setIsLoading(true));

        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.get(`/room/?${qs.stringify(body)}`);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            yield put(RoomActions.setRooms(rs.data.rooms));
            onSuccess?.(rs.data);
        } else {
            throw new Error(rs.message);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}

export function* getDetailRoom({ payload: { onSuccess, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);
        const rs: { [x: string]: any } = yield SysFetch.get(`/room/${id}`);
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

export function* editRoom({ payload: { onSuccess, body, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.put(`/room/${id}`, body);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Sửa phòng thành công",
                description: "Phòng đã được cập nhật",
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

export function* deleteRoom({ payload: { onSuccess, id } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);

        const rs: { [x: string]: any } = yield SysFetch.delete(`/room/${id}`);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Xoá phòng thành công",
                description: "Phòng đã được xoá",
                color: "success",
            });
            yield put(RoomActions.getRooms({}));
            onSuccess?.(rs.data);
        } else {
            throw new Error(rs.message);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}
