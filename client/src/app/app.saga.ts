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
    const isLogin: [string: any] = yield getAccessToken();
    if (isLogin) {
        // onSuccess?.({
        //     id: "1",
        //     username: "admin",
        //     role: "admin",
        // });
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
                    username: rs.data.username,
                    role: 'user'
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
        }
    } catch (error) {
        yield put(AppActions.setIsLoading(false));
    }
}

export function* register({ payload: { onSuccess, body } }: any) {
    try {
        yield put(AppActions.setIsLoading(true));
        yield delay(50);
        const rs: { [x: string]: any } = yield SysFetch.post(`/user`, body);
        yield put(AppActions.setIsLoading(false));
        console.log('run line 74',rs)
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
            console.log('run line 85')
            yield put(AppActions.setIsLoading(false));
            addToast({
                title: "Đăng ký thất bại",
                description: "Vui lòng kiểm tra lại thông tin",
                color: "danger",
            });
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
        const rs: { [x: string]: any } = yield SysFetch.post(`/user/logout`, {
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
