import { AppSaga } from "@app/saga";
import { CategorySaga } from "@features/Category/services/saga";
import { StatisticSaga } from "@features/Dashboard/services/saga";
import { RoomSaga } from "@features/Room/services/saga";
import { UserSaga } from "@features/User/services/saga";
import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        call(AppSaga),
        call(UserSaga),
        call(CategorySaga),
        call(RoomSaga),
        call(StatisticSaga),
    ]);
}
