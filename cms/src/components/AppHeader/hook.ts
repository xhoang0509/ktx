import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router";

export type ReceivedProps = { rightMenu?: ReactElement; pageTitle?: string };

const useAppHeader = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();
  return {
    navigate,
    currentPath,
    ...props,
  };
};

export type Props = ReturnType<typeof useAppHeader>;

export default useAppHeader;
