// import { useSelector } from "react-redux";
// import { RootState } from "../store";

import { useEffect } from "react";
import { AppActions, AppSelectors } from "../app/slice";
import { useAppDispatch, useAppSelector } from "../app/store";

export function useAuth() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(AppSelectors.userInfo);
  // const fakeApiCall = async (): Promise<any> => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({
  //         success: true,
  //         data: {
  //           id: "111",
  //           username: "admin111",
  //           role: "guest",
  //         },
  //       });
  //     }, 200);
  //   });
  // };

  useEffect(() => {
    dispatch(AppActions.getUserInfo());
    
    // const fetchUser = async () => {
    //   const response = await fakeApiCall();
    //   if (response.success) {
    //     dispatch(AppActions.setUserInfo(response.data));
    //   }
    // };
    // fetchUser();
  }, [dispatch]);
}
