import { createSlice } from "@reduxjs/toolkit";
import { Room } from "../types";

interface RoomState {
  rooms: Room[];
  page: number;
  total: number;
  limit: number;
  currentRoom: Room | null;
}

const initialState: RoomState = {
  rooms: [],
  page: 1,
  total: 0,
  limit: 10,
  currentRoom: null,
};

export const RoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    getRooms: (state, { payload }) => {},
    getDetailRoom: (state, { payload }) => {},
    editRoom: (state, { payload }) => {},
    deleteRoom: (state, { payload }) => {},
    addRoom: (state, { payload }) => {},
    setRooms: (state, { payload }) => {
      state.rooms = payload;
    },
    setData: (state, { payload }) => {
      state.rooms = payload.rooms;
      state.page = payload.page;
      state.total = payload.total;
      state.limit = payload.limit;
    }
  },
});

const RoomReducer = RoomSlice.reducer;
export default RoomReducer;
export const RoomActions = RoomSlice.actions;

// Note: The Room reducer needs to be added to the store.
// For this example, we'll use mock selectors
export const RoomSelectors = {
  rooms: (state: any) => state?.room?.rooms || [],
  page: (state: any) => state.room?.page || 1,
  total: (state: any) => state.room?.total || 0,
  limit: (state: any) => state.room?.limit || 10,
}; 