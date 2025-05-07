import { AppActions } from "@app/slice";
import { useAppDispatch } from "@services/store";
import { useEffect } from "react";

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
