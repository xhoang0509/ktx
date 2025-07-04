import { put, delay, takeLatest } from "redux-saga/effects";
import { AppActions } from "./slice";
import SysFetch from "@services/axios";
import { getAccessToken, removeAccessToken, storeAccessToken } from "@utils/token.util";
import { addToast } from "@heroui/react";

export function* AppSaga() {
    yield takeLatest(AppActions.getUserInfo, getUserInfo);
    yield takeLatest(AppActions.getAnalytic, getAnalytic);
    yield takeLatest(AppActions.login, login);
    yield takeLatest(AppActions.logout, logout);
}

export function* getUserInfo({ payload: { onSuccess } }: any) {
    const isLogin: [string: any] = yield getAccessToken();
    if (isLogin) {
        try {
            yield put(AppActions.setIsLoading(true));
            yield delay(50);
            const rs: { [x: string]: any } = yield SysFetch.get(`/admin/info`);
            yield put(AppActions.setIsLoading(false));
            if (rs.status === 200) {
                yield put(AppActions.setUserInfo({
                    id: rs.data.id,
                    username: rs.data.username,
                    role: rs.data.role,
                }));
                onSuccess?.({
                    id: rs.data.id,
                    username: rs.data.username,
                    role: rs.data.role,
                });
            }
        } catch (error) {
            yield put(AppActions.setIsLoading(false));
            onSuccess?.({
                id: null,
                username: null,
                role: "guest",
            });
        }
    } else {
        onSuccess?.({
            id: null,
            username: null,
            role: "guest",
        });
    }
}

export function* login({ payload: { onSuccess, body } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);
        const rs: { [x: string]: any } = yield SysFetch.post(`/admin/login`, body);
        yield put(AppActions.setIsLoading(false));

        if (rs.status === 200) {
            yield storeAccessToken(rs.data);
            addToast({
                title: "Đăng nhập thành công",
                description: "Chào mừng bạn đến với hệ thống quản lý",
                color: "success",
            });
            yield put(
                AppActions.setUserInfo({
                    id: "1",
                    username: "admin",
                    role: "admin",
                })
            );
            onSuccess?.(rs.data);
        } else {
            throw new Error(`Đăng nhập thất bại`);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}

export function* logout({ payload: { onSuccess } }: any) {
    const accessToken: { [x: string]: any } = yield getAccessToken();
    if (!accessToken) {
        window.location.reload();
        return;
    }
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);
        const rs: { [x: string]: any } = yield SysFetch.post(`/admin/logout`, {
            accessToken,
        });
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Đăng xuất thành công",
                description: "Hẹn gặp lại bạn sau",
                color: "success",
            });
            yield removeAccessToken();
            yield put(
                AppActions.setUserInfo({
                    id: null,
                    username: null,
                    role: "guest",
                })
            );
            onSuccess?.(rs.data);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}

export function* getAnalytic({ payload: { onSuccess } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);
        const rs: { [x: string]: any } = yield SysFetch.get(`/admin/analytic`);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            yield put(AppActions.setAnalytic(rs.data));
            onSuccess?.(rs.data);
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}
