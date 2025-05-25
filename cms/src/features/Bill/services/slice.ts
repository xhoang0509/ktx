import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";
import { Bill, BillForm } from "../types";

interface BillState {
    bills: Bill[];
    currentBill: Bill | null;
    loading: boolean;
    error: string | null;
}

const initialState: BillState = {
    bills: [],
    currentBill: null,
    loading: false,
    error: null,
};

export const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {
        login: (state, { payload }) => {},
        logout: (state, { payload }) => {},
        getBills: (state, { payload }) => {
            state.loading = true;
            state.error = null;
        },
        setBills: (state, { payload }) => {
            state.bills = payload;
            state.loading = false;
        },
        getBillDetail: (state, { payload }) => {
            state.loading = true;
            state.error = null;
        },
        setBillDetail: (state, { payload }) => {
            state.currentBill = payload;
            state.loading = false;
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
        editBill: (state, { payload }) => {
            state.loading = true;
            state.error = null;
        },
        editBillSuccess: (state, { payload }) => {
            state.loading = false;
            if (state.currentBill) {
                state.currentBill = { ...state.currentBill, ...payload };
            }
            const index = state.bills.findIndex(bill => bill.contractId === payload.contractId);
            if (index !== -1) {
                state.bills[index] = { ...state.bills[index], ...payload };
            }
        },
        editBillFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteBill: (state, { payload }) => {
            state.loading = true;
            state.error = null;
        },
        clearCurrentBill: (state) => {
            state.currentBill = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

const BillReducer = billSlice.reducer;
export default BillReducer;
export const BillActions = billSlice.actions;

export const BillSelectors = {
    bills: (state: RootState) => state.bill.bills,
    currentBill: (state: RootState) => state.bill.currentBill,
    loading: (state: RootState) => state.bill.loading,
    error: (state: RootState) => state.bill.error,
};
