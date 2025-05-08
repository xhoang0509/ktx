import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

export interface IUser {
  id: string;
  fullname: string;
  username: string;
  phone: string;
  gender: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
interface UserState {
  users: IUser[];
  page: number;
  total: number;
  limit: number;
}

const initialState: UserState = {
  users: [],
  page: 1,
  total: 0,
  limit: 10,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {},
    logout: (state, { payload }) => {},
    getUsers: (state, { payload }) => {},
    getDetailUser: (state, { payload }) => {},
    addUser: (state, { payload }) => {},
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setData: (state, { payload }) => {
      state.users = payload.users;
      state.page = payload.page;
      state.total = payload.total;
      state.limit = payload.limit;
    }
  },
});
const UserReducer = UserSlice.reducer;
export default UserReducer;
export const UserActions = UserSlice.actions;

export const UserSelectors = {
  users: (state: RootState) => state.user.users,
  page: (state: RootState) => state.user.page,
  total: (state: RootState) => state.user.total,
  limit: (state: RootState) => state.user.limit,
};
