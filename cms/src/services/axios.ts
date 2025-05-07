import axios, { AxiosRequestConfig } from "axios";
import CONST from "../constants/app.const";
import { getAccessToken, removeAccessToken } from "@utils/token.util";
import { addToast } from "@heroui/react";

const timeout = CONST.REQUEST.TIME_OUT;
const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout,
});
// Add a request interceptor
AxiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response?.data?.errors) {
      addToast({
        title: response?.data.message,
        description: response?.data?.errors?.join(", "),
        color: "danger",
      });
    }

    return response.data || response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response?.status === 401 || error.response?.status === 403) {
      addToast({
        title: "Thông báo",
        description: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại",
        color: "danger",
      });
      removeAccessToken();
      window.location.href = "/login";
    } else {
      addToast({
        title: "Lỗi",
        description: error?.response?.data?.message || error.message,
        color: "danger",
      });
    }

    // const data = error?.response?.data;
    // if (data?.message && data?.noti) {
    //   toast.error(data?.message);
    // }
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
