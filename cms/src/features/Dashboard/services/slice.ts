import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface StatisticState {
  userStatistic: any[];
  importStatistic: any[];
  productStatistic: any[];
  orderStatistic: any[];
  revenueStatistic: any[];
  bestSeller: any[];
}

const initialState: StatisticState = {
  userStatistic: [],
  importStatistic: [],
  productStatistic: [],
  orderStatistic: [],
  revenueStatistic: [],
  bestSeller: [],
};

export const StatisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    getUserStatistic: (state, { payload }) => {},
    setUserStatistic: (state, { payload }) => {
      state.userStatistic = payload;
    },
    getImportStatistic: (state, { payload }) => {},
    setImportStatistic: (state, { payload }) => {
      state.importStatistic = payload;
    },
    getProductStatistic: (state, { payload }) => {},
    setProductStatistic: (state, { payload }) => {
      state.productStatistic = payload;
    },
    getOrderStatistic: (state, { payload }) => {},
    setOrderStatistic: (state, { payload }) => {
      state.orderStatistic = payload;
    },
    getRevenueStatistic: (state, { payload }) => {},
    setRevenueStatistic: (state, { payload }) => {
      state.revenueStatistic = payload;
    },

    getBestSeller: (state, { payload }) => {},
    setBestSeller: (state, { payload }) => {
      state.bestSeller = payload;
    },
  },
});
const StatisticReducer = StatisticSlice.reducer;
export default StatisticReducer;
export const StatisticActions = StatisticSlice.actions;

export const StatisticSelectors = {
  userStatistic: (state: RootState) => state.statistic.userStatistic,
  importStatistic: (state: RootState) => state.statistic.importStatistic,
  productStatistic: (state: RootState) => state.statistic.productStatistic,
  orderStatistic: (state: RootState) => state.statistic.orderStatistic,
  revenueStatistic: (state: RootState) => state.statistic.revenueStatistic,
  bestSeller: (state: RootState) => state.statistic.bestSeller,
};
