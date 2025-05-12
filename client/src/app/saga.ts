import { all, call } from "redux-saga/effects";
import { AppSaga } from "./app.saga";

export default function* rootSaga() {
    yield all([call(AppSaga)]);
}
