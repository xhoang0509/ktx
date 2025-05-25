import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface StatisticState {
    userStatistic: any[];
    roomStatistic: any[];
    device: any[];
}

const initialState: StatisticState = {
    userStatistic: [],
    roomStatistic: [],
    device: [],
};

export const StatisticSlice = createSlice({
    name: "statistic",
    initialState,
    reducers: {
        getUserStatistic: (state, { payload }) => {},
        setUserStatistic: (state, { payload }) => {
            state.userStatistic = payload;
        },
        getRoomStatistic: (state, { payload }) => {},
        setRoomStatistic: (state, { payload }) => {
            state.roomStatistic = payload;
        },
        getDevice: (state, { payload }) => {},
        setDevice: (state, { payload }) => {
            state.device = payload;
        },
    },
});
const StatisticReducer = StatisticSlice.reducer;
export default StatisticReducer;
export const StatisticActions = StatisticSlice.actions;

export const StatisticSelectors = {
    userStatistic: (state: RootState) => state.statistic.userStatistic,
    roomStatistic: (state: RootState) => state.statistic.roomStatistic,
    device: (state: RootState) => state.statistic.device,
};
