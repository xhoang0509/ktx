import AppReducer from "@app/slice";
import CategoryReducer from "@features/Category/services/slice";
import StatisticReducer from "@features/Dashboard/services/slice";
import RoomReducer from "@features/Room/services/slice";
import UserReducer from "@features/User/services/slice";

export const reducers = {
  app: AppReducer,
  user: UserReducer,
  category: CategoryReducer,
  statistic: StatisticReducer,
  room: RoomReducer,
};
