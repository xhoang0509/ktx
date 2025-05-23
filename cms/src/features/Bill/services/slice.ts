import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface BillState {
  bills: any[];
}

const initialState: BillState = {
  bills: [],
};

export const BillSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    login: (state, { payload }) => {},
    logout: (state, { payload }) => {},
    getBills: (state, { payload }) => {},
    setBills: (state, { payload }) => {
      state.bills = payload;
    },
    addBill: (state, { payload }) => {},
    editBill: (state, { payload }) => {},
    getBillDetail: (state, { payload }) => {},
    deleteBill: (state, { payload }) => {},
  },
});
const BillReducer = BillSlice.reducer;
export default BillReducer;
export const BillActions = BillSlice.actions;

export const BillSelectors = {
  bills: (state: RootState) => state.bill.bills,
};
