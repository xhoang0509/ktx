import GlobalLoading from "@components/common/GlobalLoading";
import { matchPath, Navigate, Outlet, useLocation } from "react-router";
import RolePaths from "../../config/permission";
import { AppSelectors } from "../slice";
import { useAppSelector } from "../store";

export function RouteWrapper() {
    const location = useLocation();
    const { role } = useAppSelector(AppSelectors.userInfo);

    const handleDestination = () => {
        if (role === "guest") {
            return "/login";
        }
        if (!RolePaths["guest"].includes(location.pathname)) {
            return "/permission-denied";
        }
        return "/";
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
