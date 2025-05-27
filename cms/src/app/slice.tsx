import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface AppState {
  isLoading: boolean;
  userInfo: {
    id: string | null;
    username: string | null;
    role: string | null;
  };
  analytic: {
    totalRoom: number;
    totalUser: number;
    totalUserInRoom: number;
    totalDevice: number;
    totalPriceElectric: number;
    totalPriceWater: number;
    totalPaid: number;
    totalUnpaid: number;
    rooms: any[];
    bills: any[];
  };
}

const initialState: AppState = {
  isLoading: false,
  userInfo: {
    id: null,
    username: null,
    role: null,
  },
  analytic: {
    totalRoom: 0,
    totalUser: 0,
    totalUserInRoom: 0,
    totalDevice: 0,
    totalPriceElectric: 0,
    totalPriceWater: 0,
    totalPaid: 0,
    totalUnpaid: 0,
    rooms: [],
    bills: [],
  }
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, { payload }) => {},
    logout: (state, { payload }) => {},
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    getAnalytic: (state, { payload }) => {},
    setAnalytic: (state, { payload }) => {
      state.analytic = payload;
    },
    getUserInfo: (state, { payload }) => {},
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});
const AppReducer = AppSlice.reducer;
export default AppReducer;
export const AppActions = AppSlice.actions;

export const AppSelectors = {
  isLoading: (state: RootState) => state.app.isLoading,
  userInfo: (state: RootState) => state.app.userInfo,
  analytic: (state: RootState) => state.app.analytic,
};
