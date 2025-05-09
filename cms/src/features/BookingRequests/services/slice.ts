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
    approveBookingRequest: (state, { payload }) => {
      const { id } = payload;
      state.bookingRequests = state.bookingRequests.map(request => 
        request.id === id ? { ...request, status: BookingRequestStatus.APPROVED } : request
      );
    },
    rejectBookingRequest: (state, { payload }) => {
      const { id } = payload;
      state.bookingRequests = state.bookingRequests.map(request => 
        request.id === id ? { ...request, status: BookingRequestStatus.REJECTED } : request
      );
    },
    setBookingRequests: (state, { payload }) => {
      state.bookingRequests = payload;
    },
    setData: (state, { payload }) => {
      state.bookingRequests = payload.bookingRequests;
      state.page = payload.page;
      state.total = payload.total;
      state.limit = payload.limit;
    }
  },
});

const BookingRequestReducer = BookingRequestSlice.reducer;
export default BookingRequestReducer;
export const BookingRequestActions = BookingRequestSlice.actions;

// Note: The BookingRequest reducer needs to be added to the store.
// For this example, we'll mock the selectors
export const BookingRequestSelectors = {
  bookingRequests: (state: any) => state.bookingRequest?.bookingRequests || [],
  page: (state: any) => state.bookingRequest?.page || 1,
  total: (state: any) => state.bookingRequest?.total || 0,
  limit: (state: any) => state.bookingRequest?.limit || 10,
}; 