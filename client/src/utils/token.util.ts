import CONST from "../constants/app.const";

export const getAccessToken = () =>
  localStorage.getItem(CONST.STORAGE.ACCESS_TOKEN);

export const storeAccessToken = (accessToken: string) =>
  localStorage.setItem(CONST.STORAGE.ACCESS_TOKEN, accessToken);

export const removeAccessToken = () =>
  localStorage.removeItem(CONST.STORAGE.ACCESS_TOKEN);
