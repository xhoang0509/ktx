import { useAppDispatch } from "@services/store";
import { AppActions } from "@app/slice";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useLogout = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(AppActions.logout({}));
  };
  const onClose = () => {
    navigate(-1);
  };

  return {
    ...props,
    onClose,
    onLogout,
  };
};

export type Props = ReturnType<typeof useLogout>;

export default useLogout;
