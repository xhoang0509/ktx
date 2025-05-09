import AppReducer from "@app/slice";
import BlogReducer from "@features/Blog/services/slice";
import CategoryReducer from "@features/Category/services/slice";
import StatisticReducer from "@features/Dashboard/services/slice";
import OrderReducer from "@features/Order/services/slice";
import ProductReducer from "@features/Product/services/slice";
import RoomReducer from "@features/Room/services/slice";
import UserReducer from "@features/User/services/slice";
import VoucherReducer from "@features/Voucher/services/slice";

export const reducers = {
  app: AppReducer,
  user: UserReducer,
  order: OrderReducer,
  category: CategoryReducer,
  product: ProductReducer,
  voucher: VoucherReducer,
  blog: BlogReducer,
  statistic: StatisticReducer,
  room: RoomReducer,
};
