import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";
import { Bill, BillForm } from "../types";

interface BillState {
    bills: Bill[];
    loading: boolean;
    error: string | null;
}

const initialState: BillState = {
    bills: [],
    loading: false,
    error: null,
};

export const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {
        login: (state, { payload }) => {},
        logout: (state, { payload }) => {},
        getBills: (state, { payload }) => {},
        setBills: (state, { payload }) => {
            state.bills = payload;
        },
        addBill: (
            state,
            action: PayloadAction<{
                body: BillForm;
                onSuccess?: () => void;
            }>
        ) => {
            state.loading = true;
            state.error = null;
        },
        addBillSuccess: (state, action: PayloadAction<BillForm>) => {
            state.bills.push(action.payload);
            state.loading = false;
        },
        addBillFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        editBill: (state, { payload }) => {},
        getBillDetail: (state, { payload }) => {},
        deleteBill: (state, { payload }) => {},
    },
});

const BillReducer = billSlice.reducer;
export default BillReducer;
export const BillActions = billSlice.actions;

export const BillSelectors = {
    bills: (state: RootState) => state.bill.bills,
};
