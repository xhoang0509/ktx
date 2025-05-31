import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface DeviceState {
  devices: any[];
  devicesActive: any[];
}

const initialState: DeviceState = {
  devices: [],
  devicesActive: [],
};

export const DeviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    login: (state, { payload }) => {},
    logout: (state, { payload }) => {},
    getDevices: (state, { payload }) => {},
    getDevicesActive: (state, { payload }) => {},
    setDevices: (state, { payload }) => {
      state.devices = payload;
    },
    setDevicesActive: (state, { payload }) => {
      state.devicesActive = payload;
    },
    addDevice: (state, { payload }) => {},
    editDevice: (state, { payload }) => {},
    getDeviceDetail: (state, { payload }) => {},
    deleteDevice: (state, { payload }) => {},
    showDevice: (state, { payload }) => {},
  },
});
const DeviceReducer = DeviceSlice.reducer;
export default DeviceReducer;
export const DeviceActions = DeviceSlice.actions;

export const DeviceSelectors = {
  devices: (state: RootState) => state.device.devices,
  devicesActive: (state: RootState) => state.device.devicesActive,
};
