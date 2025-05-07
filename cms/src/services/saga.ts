import { AppSaga } from "@app/saga";
import { BlogSaga } from "@features/Blog/services/saga";
import { CategorySaga } from "@features/Category/services/saga";
import { StatisticSaga } from "@features/Dashboard/services/saga";
import { OrderSaga } from "@features/Order/services/saga";
import { ProductSaga } from "@features/Product/services/saga";
import { UserSaga } from "@features/User/services/saga";
import { VoucherSaga } from "@features/Voucher/services/saga";
import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    call(AppSaga),
    call(UserSaga),
    call(OrderSaga),
    call(CategorySaga),
    call(ProductSaga),
    call(VoucherSaga),
    call(BlogSaga),
    call(StatisticSaga),
  ]);
}
