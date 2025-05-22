import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface DeviceState {
  devices: any[];
}

const initialState: DeviceState = {
  devices: [],
};

export const DeviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    login: (state, { payload }) => {},
    logout: (state, { payload }) => {},
    getDevices: (state, { payload }) => {},
    setDevices: (state, { payload }) => {
      state.devices = payload;
    },
    addDevice: (state, { payload }) => {},
    editDevice: (state, { payload }) => {},
    getDeviceDetail: (state, { payload }) => {},
    deleteDevice: (state, { payload }) => {},
  },
});
const DeviceReducer = DeviceSlice.reducer;
export default DeviceReducer;
export const DeviceActions = DeviceSlice.actions;

export const DeviceSelectors = {
  devices: (state: RootState) => state.device.devices,
};
