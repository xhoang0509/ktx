import AppReducer from "@app/slice";
import BillReducer from "@features/Bill/services/slice";
import BookingRequestReducer from "@features/BookingRequests/services/slice";
import StatisticReducer from "@features/Dashboard/services/slice";
import DeviceReducer from "@features/Device/services/slice";
import RoomReducer from "@features/Room/services/slice";
import UserReducer from "@features/User/services/slice";

export const reducers = {
  app: AppReducer,
  user: UserReducer,
  statistic: StatisticReducer,
  room: RoomReducer,
  device: DeviceReducer,
  bill: BillReducer,
  bookingRequest: BookingRequestReducer
};
