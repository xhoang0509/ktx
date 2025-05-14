// import { useSelector } from "react-redux";
// import { RootState } from "../store";

import { useEffect } from "react";
import { AppActions } from "../app/slice";
import { useAppDispatch } from "../app/store";

export function useAuth() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            AppActions.getUserInfo({
                onSuccess: (data: any) => dispatch(AppActions.setUserInfo(data)),
            })
        );
    }, [dispatch]);
}
