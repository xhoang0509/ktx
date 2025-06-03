import axios, { AxiosRequestConfig } from "axios";
import CONST from "../constants/app.const";
import { getAccessToken, removeAccessToken } from "@utils/token.util";
import { addToast } from "@heroui/react";

const timeout = CONST.REQUEST.TIME_OUT;
const AxiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout,
});

AxiosClient.interceptors.request.use(
    function (config) {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

AxiosClient.interceptors.response.use(
    function (response) {
        const data = response.data || response;
        if (data.success) {
            return response.data || response;
        } else {
            if (data?.message && data?.noti) {
                addToast({
                    title: "Lỗi",
                    description: data?.message.toString() || "Truy cập thất bại",
                    color: "danger",
                });
            }
            return response.data || response;
        }
    },
    function (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            addToast({
                title: "Thông báo",
                description: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại",
                color: "danger",
            });
            removeAccessToken();
            window.location.href = "/login";
        } else {
            let description = error?.response?.data?.message || error.message;
            if (description === "Request failed with status code 404") {
                description = "Không tìm thấy dữ liệu";
            }
            addToast({
                title: "Lỗi",
                description: description,
                color: "danger",
            });
        }

        return Promise.reject(error);
    }
);

const post = (url: string, data?: any, config = {}) => {
    return AxiosClient.post(url, data, config);
};

const get = (url: string, data?: AxiosRequestConfig<any> | undefined) => {
    return AxiosClient.get(url, data);
};

const put = (url: string, data?: any, config = {}) => {
    return AxiosClient.put(url, data, config);
};

const patch = (url: string, data?: any, config = {}) => {
    return AxiosClient.patch(url, data, config);
};

const del = (url: string, config = {}) => {
    return AxiosClient.delete(url, config);
};

const postWithCustomHeader = (url: string, data: any, customHeaders: any) => {
    const config = {
        headers: {
            ...AxiosClient.defaults.headers.common,
            ...customHeaders,
        },
    };

    return AxiosClient.post(url, data, config);
};
const SysFetch = {
    post,
    get,
    put,
    patch,
    delete: del,
    postWithCustomHeader,
};

export default SysFetch;
