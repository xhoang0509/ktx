import GlobalLoading from "@components/GlobalLoading";
import { useAppSelector } from "@services/store";
import { matchPath, Navigate, Outlet, useLocation } from "react-router";
import RolePaths from "../../config/permission";
import { AppSelectors } from "../slice";

export function RouteWrapper() {
    const location = useLocation();
    const { role } = useAppSelector(AppSelectors.userInfo);
    const handleDestination = () => {
        return role === "guest"
            ? "/login"
            : !RolePaths["onlyGuest"].includes(location.pathname)
            ? "/permission-denied"
            : "/";
    };
    if (role === null) {
        return <GlobalLoading />;
    }

    const allowedRoutes = RolePaths[role as string] || [];

    const isAllowed = allowedRoutes.some(
        (path) => path === location.pathname || matchPath(path, location.pathname)
    );
    if (!isAllowed) {
        return <Navigate to={handleDestination()} replace />;
    }

    return <Outlet />;
}
