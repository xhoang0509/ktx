import { createSlice } from "@reduxjs/toolkit";
import { BookingRequest, BookingRequestStatus } from "../types";

interface BookingRequestState {
  bookingRequests: BookingRequest[];
  page: number;
  total: number;
  limit: number;
}

const initialState: BookingRequestState = {
  bookingRequests: [],
  page: 1,
  total: 0,
  limit: 10,
};

export const BookingRequestSlice = createSlice({
  name: "bookingRequest",
  initialState,
  reducers: {
    getBookingRequests: (state, { payload }) => {},
    getBookingRequestDetail: (state, { payload }) => {},
    approveBookingRequest: (state, { payload }) => {},
    rejectBookingRequest: (state, { payload }) => {},
    setBookingRequests: (state, { payload }) => {
      state.bookingRequests = payload;
    },
    setData: (state, { payload }) => {
      state.bookingRequests = payload.bookingRequests;
      state.page = payload.page;
      state.total = payload.total;
      state.limit = payload.limit;
    },
    editRequest: (state, { payload }) => {},
  },
});

const BookingRequestReducer = BookingRequestSlice.reducer;
export default BookingRequestReducer;
export const BookingRequestActions = BookingRequestSlice.actions;

export const BookingRequestSelectors = {
  bookingRequests: (state: any) => state.bookingRequest?.bookingRequests || [],
  page: (state: any) => state.bookingRequest?.page || 1,
  total: (state: any) => state.bookingRequest?.total || 0,
  limit: (state: any) => state.bookingRequest?.limit || 10,
}; 