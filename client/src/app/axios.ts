import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import CONST from "../constants/app.const";

const timeout = CONST.REQUEST.TIME_OUT;
const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

const registerInterceptorsRequest = (clientInstance: AxiosInstance) => {
  clientInstance.interceptors.request.use(
    async (config: any) => {
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
};
registerInterceptorsRequest(AxiosClient);

const registerInterceptorResponse = (clientInstance: AxiosInstance) => {
  clientInstance.interceptors.response.use(
    async (response: { data: any }) => {
      const data = response.data || response;
      if (data.success) {
        return response.data || response;
      } else {
        if (data?.message && data?.noti) {
          toast.error(data?.message.toString() || "Truy cập thất bại");
        }
        return response.data || response;
      }
    },
    async (error: any) => {
      const data = error?.response?.data;
      if (data?.message) {
        console.log(data?.message)
        toast.error(data?.message);
      }
      return Promise.reject(error);
    }
  );
};
registerInterceptorResponse(AxiosClient);

const setConfigAxiosClient = (
  accessToken: any,
  clientAxiosInstance: AxiosInstance
) => {
  clientAxiosInstance.defaults.headers.common = {
    "Content-Type": "application/json",
    Authorization: "",
  };
  clientAxiosInstance.defaults.timeout = timeout;
  if (accessToken) {
    clientAxiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};

export function setConfigAxios(accessToken: any) {
  setConfigAxiosClient(accessToken, AxiosClient);
}

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
