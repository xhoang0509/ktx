import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface VoucherState {
  vouchers: any[];
}

const initialState: VoucherState = {
  vouchers: [],
};

export const VoucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    getVouchers: (state, { payload }) => {},
    setVouchers: (state, { payload }) => {
      state.vouchers = payload;
    },
    addVoucher: (state, { payload }) => {},
    editVoucher: (state, { payload }) => {},
    deleteVoucher: (state, { payload }) => {},
    getDetailVoucher: (state, { payload }) => {},
  },
});
const VoucherReducer = VoucherSlice.reducer;
export default VoucherReducer;
export const VoucherActions = VoucherSlice.actions;

export const VoucherSelectors = {
  vouchers: (state: RootState) => state.voucher.vouchers,
};
