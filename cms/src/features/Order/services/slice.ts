import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface OrderState {
  orders: any[];
}

const initialState: OrderState = {
  orders: [],
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    login: (state, { payload }) => {},
    logout: (state, { payload }) => {},
    getOrders: (state, { payload }) => {},
    setOrders: (state, { payload }) => {
      state.orders = payload;
    },
    updateStatusOrder: (state, { payload }) => {},
    getDetailOrder: (state, { payload }) => {},
  },
});
const OrderReducer = OrderSlice.reducer;
export default OrderReducer;
export const OrderActions = OrderSlice.actions;

export const OrderSelectors = {
  orders: (state: RootState) => state.order.orders,
};
