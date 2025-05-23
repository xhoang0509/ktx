import { AppSaga } from "@app/saga";
import { BillSaga } from "@features/Bill/services/saga";
import { BookingRequestSaga } from "@features/BookingRequests/services/saga";
import { StatisticSaga } from "@features/Dashboard/services/saga";
import { DeviceSaga } from "@features/Device/services/saga";
import { RoomSaga } from "@features/Room/services/saga";
import { UserSaga } from "@features/User/services/saga";
import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        call(AppSaga),
        call(UserSaga),
        call(RoomSaga),
        call(StatisticSaga),
        call(DeviceSaga),
        call(BookingRequestSaga),
        call(BillSaga),
    ]);
}
