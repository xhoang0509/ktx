import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface UserState {
  users: any[];
}

const initialState: UserState = {
  users: [],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {},
    logout: (state, { payload }) => {},
    getUsers: (state, { payload }) => {},
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
  },
});
const UserReducer = UserSlice.reducer;
export default UserReducer;
export const UserActions = UserSlice.actions;

export const UserSelectors = {
  users: (state: RootState) => state.user.users,
};
