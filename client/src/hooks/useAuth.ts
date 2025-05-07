// import { useSelector } from "react-redux";
// import { RootState } from "../store";

import { useEffect } from "react";
import { AppActions } from "../app/slice";
import { useAppDispatch } from "../app/store";

export function useAuth() {
  const dispatch = useAppDispatch();
  const fakeApiCall = async (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: "111",
            username: "admin111",
            role: "guest",
          },
        });
      }, 200);
    });
  };

  useEffect(() => {
    console.log("==>>>");
    const fetchUser = async () => {
      const response = await fakeApiCall();
      if (response.success) {
        dispatch(AppActions.setUserInfo(response.data));
      }
      console.log("Kết quả API:", response);
    };
    fetchUser();
  }, [dispatch]);
}
