import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AppState {
  isLoading: boolean;
  userInfo: {
    id: string | null;
    username: string | null;
    role: string;
  };
}

const initialState: AppState = {
  isLoading: false,
  userInfo: {
    id: null,
    username: null,
    role: "guest",
  },
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
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
};
