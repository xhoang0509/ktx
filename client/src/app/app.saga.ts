import { addToast } from "@heroui/react";
import { getAccessToken, removeAccessToken, storeAccessToken } from "@utils/token.util";
import { delay, put, takeLatest } from "redux-saga/effects";
import SysFetch from "./axios";
import { AppActions } from "./slice";

export function* AppSaga() {
    yield takeLatest(AppActions.getUserInfo, getUserInfo);
    yield takeLatest(AppActions.login, login);
    yield takeLatest(AppActions.logout, logout);
    yield takeLatest(AppActions.register, register);
}

export function* getUserInfo({ payload: { onSuccess } }: any) {
    const token: [string: any] = yield getAccessToken();
    if (token) {
        try {
            yield put(AppActions.setIsLoading(true));
            yield delay(50);
            const rs: { [x: string]: any } = yield SysFetch.postWithCustomHeader(
                `/user/info`,
                {},
                {
                    Authorization: `Bearer ${token}`,
                }
            );
            
            yield put(AppActions.setIsLoading(false));
            if (rs.status === 200) {
                const userInfo = {
                    id: rs.data.id,
                    email: rs.data.email,
                    role: rs.data.role,
                    full_name: rs.data.full_name,
                    avatar: rs.data.avatar,
                };
                onSuccess?.(userInfo);
            }
        } catch (error) {
            yield put(AppActions.setIsLoading(false));
            removeAccessToken();
            window.location.href = "/login";
        }
    } else {
        onSuccess?.({
            id: null,
            email: null,
            full_name: null,
            role: "guest",
        });
    }
}

export function* login({ payload: { onSuccess, body, onError } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);
        const rs: { [x: string]: any } = yield SysFetch.post(`/user/login`, body);
        yield put(AppActions.setIsLoading(false));

        if (rs.status === 200) {
            yield storeAccessToken(rs.data.token);
            addToast({
                title: "Đăng nhập thành công",
                description: "Chào mừng bạn đến với hệ thống đăng ký phòng",
                color: "success",
            });
            yield put(
                AppActions.setUserInfo({
                    id: rs.data.id,
                    email: rs.data.email,
                    full_name: rs.data.full_name,
                    role: "user",
                    avatar: rs.data.avatar,
                })
            );
            onSuccess?.(rs.data);
        } else {
            yield put(AppActions.setIsLoading(false));
            addToast({
                title: "Đăng nhập thất bại",
                description: "Vui lòng kiểm tra lại thông tin",
                color: "danger",
            });
            onError?.();
        }
    } catch (error) {
        addToast({
            title: "Đăng nhập thất bại",
            description: "Vui lòng kiểm tra lại thông tin",
            color: "danger",
        });
        yield put(AppActions.setIsLoading(false));
        onError?.();
    }
}

export function* register({ payload: { onSuccess, body, onError } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);
        const rs: { [x: string]: any } = yield SysFetch.post(`/user`, body);
        yield put(AppActions.setIsLoading(false));
        if (rs.status === 200) {
            addToast({
                title: "Đăng ký thành công",
                description: "Hãy đăng nhập để sử dụng hệ thống",
                color: "success",
            });
            onSuccess?.(rs.data);
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        } else {
            yield put(AppActions.setIsLoading(false));
            addToast({
                title: "Đăng ký thất bại",
                description: "Vui lòng kiểm tra lại thông tin",
                color: "danger",
            });
            onError?.();
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
        onError?.();
    }
}
export function* logout({ payload: { onSuccess } }: any) {
    yield removeAccessToken();
    addToast({
        title: "Đăng xuất thành công",
        description: "Hẹn gặp lại bạn sau",
        color: "success",
    });
    window.location.reload();
}
