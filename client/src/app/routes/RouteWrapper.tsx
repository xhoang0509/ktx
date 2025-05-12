import { Navigate, Outlet, useLocation } from "react-router";
import RolePaths from "../../config/permission";
import { useAppSelector } from "../store";
import { AppSelectors } from "../slice";

export function RouteWrapper() {
  const location = useLocation();
  const { role } = useAppSelector(AppSelectors.userInfo);
  console.log(role)
  const handleDestination = () => {
    return role === "guest"
      ? "/login"
      : !RolePaths["onlyGuest"].includes(location.pathname)
      ? "/permission-denied"
      : "/";
  };

  const allowedRoutes = RolePaths[role as string] || [];

  if (!allowedRoutes.includes(location.pathname)) {
    return <Navigate to={handleDestination()} replace />;
  }

  return <Outlet />;
}
